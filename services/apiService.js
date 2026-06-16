import { getToken } from './authService';
import { API_URL } from '../constants/api';

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

// ── Profil ─────────────────────────────────────────────────────────────────────

export function getMe() {
  return authFetch('/api/adherents/me');
}

// payload : { nom?, prenom?, ligue?, poste? }
export function updateMe(payload) {
  return authFetch('/api/adherents/me', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function changerMotDePasse(currentPassword, newPassword) {
  return authFetch('/api/adherents/me/password', {
    method: 'PATCH',
    body: JSON.stringify({ current_password: currentPassword, new_password: newPassword }),
  });
}

// ── Salles ─────────────────────────────────────────────────────────────────────

export function getSalles(categorie = null, libelle = null) {
  const params = new URLSearchParams();
  if (categorie) params.append('categorie', categorie);
  if (libelle)   params.append('libelle', libelle);
  const query = params.toString() ? `?${params.toString()}` : '';
  return authFetch(`/api/salles${query}`);
}

export function getSalle(id) {
  return authFetch(`/api/salles/${id}`);
}

// ── Types de salles ────────────────────────────────────────────────────────────

// Renvoie { sport: [{id, libelle, categorie}], evenement: [...] }
export function getTypesSalles() {
  return authFetch('/api/types-salles');
}

// ── Réservations ───────────────────────────────────────────────────────────────

export function getMesReservations() {
  return authFetch('/api/reservations');
}

export function creerReservation(payload) {
  return authFetch('/api/reservations', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function supprimerReservation(id) {
  return authFetch(`/api/reservations/${id}`, { method: 'DELETE' });
}

// Renvoie les créneaux déjà occupés (EN_ATTENTE/VALIDEE) pour une salle
// entre dateDebut et dateFin (incluses), au format AAAA-MM-JJ.
export function getDisponibilite(salleId, dateDebut, dateFin = dateDebut) {
  const params = new URLSearchParams({ dateDebut, dateFin });
  return authFetch(`/api/reservations/disponibilite/${salleId}?${params.toString()}`);
}
