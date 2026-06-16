# M2L Mobile

Application mobile développée dans le cadre du projet **M2L (Maison des Ligues de Lorraine)**, réalisée avec **React Native** et **Expo**.

---

## 📋 Description du projet

La Maison des Ligues de Lorraine (M2L) est une structure régionale financée par le Conseil Régional. Sa mission de service public consiste à mettre à disposition des ligues sportives (football, tennis, judo, etc.) des infrastructures variées : locaux administratifs, salles de réunion, amphithéâtres et complexes sportifs.

Jusqu'ici, la gestion de ces espaces reposait sur des processus manuels vieillissants : les demandes de réservation affluaient par téléphone ou par courriel, saturant le secrétariat et augmentant le risque d'erreurs (doubles réservations, oublis, etc.).

La M2L a donc engagé sa transformation numérique pour moderniser son image et fluidifier ses échanges avec les ligues. Cette application mobile, destinée aux **adhérents**, permet de consulter les salles disponibles et de réserver un créneau en quelques touches, en complément de l'application web utilisée par les **gestionnaires** pour administrer les salles et traiter les demandes.

---

## 🏗 Stack technique

- **Mobile** : React Native, Expo, Expo Router (navigation par fichiers)
- **Backend** : Symfony, API REST, Doctrine ORM, authentification JWT (LexikJWTAuthenticationBundle)
- **Stockage local** : Expo SecureStore (token JWT), AsyncStorage (préférences, ex. thème)

---

## 🚀 Initialisation du projet

### Prérequis

- [Node.js](https://nodejs.org/) et npm
- L'application **Expo Go** sur un téléphone (Android/iOS), ou un émulateur Android Studio
- L'API M2L (Symfony) lancée en local — voir le dépôt `M2L_API`

### Créer un nouveau projet Expo (référence)

Pour démarrer un nouveau projet natif avec Expo à partir de zéro :

```bash
npx create-expo-app@latest mon-projet
cd mon-projet
```

### Installer les dépendances du projet existant

```bash
# Cloner le dépôt puis se placer dans le dossier
cd M2L_mobile

# Installer toutes les dépendances listées dans package.json
npm install
```

Les principales dépendances du projet :

| Catégorie           | Paquets                                                                                                      |
| ------------------- | ------------------------------------------------------------------------------------------------------------ |
| Navigation          | `expo-router`, `@react-navigation/native`, `@react-navigation/native-stack`, `@react-navigation/bottom-tabs` |
| UI / icônes         | `@expo/vector-icons`, `react-native-svg` (+ `react-native-svg-transformer`), `expo-image`                    |
| Stockage            | `expo-secure-store`, `@react-native-async-storage/async-storage`                                             |
| Gestes / animations | `react-native-gesture-handler`, `react-native-reanimated`, `react-native-worklets`                           |
| Système             | `expo-constants`, `expo-system-ui`, `expo-status-bar`, `expo-splash-screen`                                  |

Pour ajouter une nouvelle dépendance compatible avec la version d'Expo du projet, toujours préférer :

```bash
npx expo install <nom-du-paquet>
```

### Lancer le serveur de développement

```bash
npx expo start
```

Puis scanner le QR code affiché avec l'app **Expo Go** (Android/iOS), ou appuyer sur `a` / `i` pour lancer un émulateur/simulateur.

> 💡 L'URL de l'API (`constants/api.js`) est détectée automatiquement à partir de l'IP utilisée par Metro pour servir l'application — aucune configuration manuelle n'est nécessaire en développement, tant que le téléphone et l'ordinateur sont sur le même réseau.

---

## ✅ Fonctionnalités mises en place

### Authentification

- Inscription et connexion des adhérents (JWT)
- Déconnexion

### Accueil & recherche

- Liste des sports et types d'événements proposés, alimentée dynamiquement depuis la base de données (aucune donnée codée en dur)
- Attribution automatique d'une couleur distincte à chaque catégorie
- Recherche de salles par nom, adresse ou ville, avec filtres par type
- Affichage de l'identité de l'adhérent connecté (nom, ligue, poste) dans l'en-tête

### Détail d'une salle

- Fiche complète : photo, adresse, capacité, description, type (icône dédiée sport/événement)
- Horaires d'ouverture réels de la salle
- Aperçu des disponibilités jour par jour (créneaux déjà réservés visibles avant même de réserver)
- Avis des adhérents (mockés pour le moment)

### Réservation

- Sélection d'une date unique ou d'une plage de dates continue
- Sélection de créneaux d'1h, multi-sélection pour réserver plusieurs heures d'affilée
- Réservation ponctuelle ou mensuelle (récurrence hebdomadaire automatique)
- Impossibilité de réserver pour le jour même ou le lendemain (délai minimum)
- Blocage des créneaux déjà réservés (vérifiée aussi côté serveur pour éviter tout conflit)
- Description obligatoire de la demande

### Mes réservations

- Liste des réservations avec filtres par statut (en attente / confirmée / refusée)
- Annulation d'une réservation
- Suppression automatique des réservations refusées après 2 jours

### Espace gestionnaire (côté API)

- Visibilité des demandes de réservation limitée au gestionnaire de la salle concernée et à l'administrateur
- Validation ou refus d'une demande
  -> Voir `M2L_webapp`

### Profil & paramètres

- Consultation et modification des informations personnelles (nom, prénom, ligue, poste)
- Changement de mot de passe
- Mode sombre

---

## 🔮 Fonctionnalités à venir

- **Authentification multi-facteurs (MFA)** pour renforcer la sécurité des comptes
- **Notifications par e-mail ou SMS** lors d'un changement de statut de réservation (confirmation, refus) ou après une inscription
- **Messagerie interne** entre un adhérent et le gestionnaire d'une salle, pour échanger des informations complémentaires au sujet d'une réservation
- Système d'avis/commentaires connecté à une vraie base de données (actuellement simulé, en attente du même chantier côté application web)
- Notifications push pour les rappels de réservation à venir

---

Pour plus d'informations sur le contexte et les spécifications fonctionnelles, se référer au cahier des charges du projet.
