// Toutes les requêtes vers le serveur.
// Chaque fonction correspond à une action possible dans l'application.

import { getToken } from './authService';
import { API_URL } from '../constants/api';

// Fonction interne : envoie une requête au serveur en ajoutant
// automatiquement le jeton de connexion dans l'en-tête.
async function authFetch(endpoint, options = {}) {
  const token = await getToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message ?? 'Erreur API');
  }

  return data;
}

// ─── Profil ───────────────────────────────────────────────────────

// Je récupère les informations de l'utilisateur connecté
export function getMe() {
  return authFetch('/api/adherents/me');
}

// Je modifie le nom, prénom, ligue ou poste de l'utilisateur
export function updateMe(payload) {
  return authFetch('/api/adherents/me', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

// Je change le mot de passe de l'utilisateur
export function changerMotDePasse(currentPassword, newPassword) {
  return authFetch('/api/adherents/me/password', {
    method: 'PATCH',
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
}

// ─── Salles ───────────────────────────────────────────────────────

// Je récupère la liste des salles (filtrable par catégorie ou type)
export function getSalles(categorie = null, libelle = null) {
  const params = new URLSearchParams();
  if (categorie) params.append('categorie', categorie);
  if (libelle)   params.append('libelle', libelle);
  const query = params.toString() ? `?${params.toString()}` : '';
  return authFetch(`/api/salles${query}`);
}

// Je récupère les détails d'une salle par son identifiant
export function getSalle(id) {
  return authFetch(`/api/salles/${id}`);
}

// ─── Types de salles ──────────────────────────────────────────────

// Je récupère tous les types de salles groupés par catégorie :
// { sport: [...], evenement: [...] }
export function getTypesSalles() {
  return authFetch('/api/types-salles');
}

// ─── Réservations ─────────────────────────────────────────────────

// Je récupère toutes mes réservations
export function getMesReservations() {
  return authFetch('/api/reservations');
}

// J'envoie une nouvelle demande de réservation au serveur
export function creerReservation(payload) {
  return authFetch('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

// J'annule une réservation
export function supprimerReservation(id) {
  return authFetch(`/api/reservations/${id}`, { method: 'DELETE' });
}

// Je vérifie quels créneaux sont déjà pris pour une salle sur une période donnée
export function getDisponibilite(salleId, dateDebut, dateFin = dateDebut) {
  const params = new URLSearchParams({ dateDebut, dateFin });
  return authFetch(`/api/reservations/disponibilite/${salleId}?${params.toString()}`);
}
