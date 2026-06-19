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
