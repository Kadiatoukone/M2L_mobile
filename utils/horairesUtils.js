// Utilitaires pour exploiter les horaires d'ouverture d'une salle
// (entité Horaire côté API : { jour, heureOuverture, heureFermeture, statut }).

const JOURS_SEMAINE = [
  "Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi",
];

// Date JS (0=dimanche) → nom du jour tel que stocké en BDD ("Lundi", ...).
export function jourFrancais(date) {
  return JOURS_SEMAINE[date.getDay()];
}

export function horaireDuJour(horaires, date) {
  const jour = jourFrancais(date);
  return horaires.find((h) => h.jour === jour) ?? null;
}

export function estOuvert(horaires, date) {
  const h = horaireDuJour(horaires, date);
  return !!h && h.statut === "ouvert";
}

// Toutes les dates entre deb et fin inclus (ordre croissant).
export function joursEntre(deb, fin) {
  const jours = [];
  const cur = new Date(deb.getFullYear(), deb.getMonth(), deb.getDate());
  const last = new Date(fin.getFullYear(), fin.getMonth(), fin.getDate());
  while (cur <= last) {
    jours.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return jours;
}

// Fenêtre d'ouverture commune à une liste de jours (intersection des
// horaires de chacun). Renvoie null si l'un des jours est fermé.
export function fenetreCommune(horaires, jours) {
  let debut = null;
  let fin = null;
  for (const date of jours) {
    const h = horaireDuJour(horaires, date);
    if (!h || h.statut !== "ouvert") return null;
    if (debut === null || h.heureOuverture > debut) debut = h.heureOuverture;
    if (fin === null || h.heureFermeture < fin) fin = h.heureFermeture;
  }
  if (!debut || !fin || debut >= fin) return null;
  return { heureOuverture: debut, heureFermeture: fin };
}

// Premier jour fermé trouvé dans une liste (pour message d'erreur), ou null.
export function premierJourFerme(horaires, jours) {
  return jours.find((date) => !estOuvert(horaires, date)) ?? null;
}

// "16:30" → minutes depuis minuit (990).
export function heureEnMinutes(heure) {
  const [h, m] = heure.split(":").map(Number);
  return h * 60 + m;
}

// Date → "16:30"
export function dateVersHeure(date) {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

// Date → "16h30" (affichage utilisateur)
export function dateVersHeureAffichee(date) {
  return `${String(date.getHours()).padStart(2, "0")}h${String(date.getMinutes()).padStart(2, "0")}`;
}

// Date → "2026-06-23"
export function formatDateISO(date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

// Découpe une fenêtre d'ouverture { heureOuverture, heureFermeture } en
// créneaux fixes d'1h : [{ debut: "09:00", fin: "10:00" }, ...].
// Le dernier créneau est ignoré s'il dépasse l'heure de fermeture.
export function genererCreneaux(fenetre) {
  if (!fenetre) return [];
  const creneaux = [];
  let minutes = heureEnMinutes(fenetre.heureOuverture);
  const fin = heureEnMinutes(fenetre.heureFermeture);
  while (minutes + 60 <= fin) {
    const debut = minutesEnHeure(minutes);
    const finCreneau = minutesEnHeure(minutes + 60);
    creneaux.push({ debut, fin: finCreneau });
    minutes += 60;
  }
  return creneaux;
}

function minutesEnHeure(total) {
  const h = Math.floor(total / 60);
  const m = total % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

// Vrai si le créneau { debut, fin } chevauche une réservation déjà
// existante (renvoyée par l'API /reservations/disponibilite) pour au
// moins un des jours à vérifier.
export function creneauOccupe(creneau, jours, reservationsOccupees) {
  return jours.some((date) => {
    const iso = formatDateISO(date);
    return reservationsOccupees.some((r) =>
      iso >= r.dateDebut && iso <= r.dateFin &&
      creneau.debut < r.heureFin && creneau.fin > r.heureDebut
    );
  });
}
