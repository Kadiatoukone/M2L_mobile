import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ParametresPage() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    prenom: "Gina",
    nom: "Banen",
    pseudo: "gina.banen",
    email: "gina.banen@email.com",
    telephone: "+33 6 67 80 04 56",
    naissance: "1990-01-01",
    verification: "En attente",
  });

  const [notifications, setNotifications] = useState({
    push: true,
    email: true,
    sms: true,
  });

  const [passwords, setPasswords] = useState({
    ancien: "",
    nouveau: "",
    confirmation: "",
  });

  const handleProfileChange = (key, value) => {
    setProfile((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handlePasswordChange = (key, value) => {
    setPasswords((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleNotificationsChange = (key, value) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleProfileSave = () => {
    console.log("Profil modifié :", profile);
    console.log("Notifications :", notifications);
    // appel API
  };

  const handlePasswordSave = () => {
    if (passwords.nouveau !== passwords.confirmation) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    console.log("Changement de mot de passe");
    // appel API
  };

  const handleVerification = () => {
    console.log("Vérification du compte demandée");
    // appel API
  };

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="parametres-container">
      <header className="profil-header">
        <button onClick={() => navigate(-1)}>← Retour</button>

        <h1>Paramètres</h1>

        <div />
      </header>

      <div className="profil-card">
        <h2> Profil</h2>

        <label>
          Modifier la photo de profil
          <button type="button" className="btn-upload">
            Choisir une photo
          </button>
        </label>

        <label>
          Nom
          <input
            type="text"
            value={profile.nom}
            onChange={(e) => handleProfileChange("nom", e.target.value)}
          />
        </label>

        <label>
          Prénom
          <input
            type="text"
            value={profile.prenom}
            onChange={(e) => handleProfileChange("prenom", e.target.value)}
          />
        </label>

        <label>
          Pseudo
          <input
            type="text"
            value={profile.pseudo}
            onChange={(e) => handleProfileChange("pseudo", e.target.value)}
          />
        </label>

        <label>
          Adresse e-mail
          <input
            type="email"
            value={profile.email}
            onChange={(e) => handleProfileChange("email", e.target.value)}
          />
        </label>

        <label>
          Numéro de téléphone
          <input
            type="tel"
            value={profile.telephone}
            onChange={(e) => handleProfileChange("telephone", e.target.value)}
          />
        </label>

        

        <button className="save-btn" onClick={handleProfileSave}>
          Enregistrer le profil
        </button>
      </div>

      <div className="profil-card">
        <h2> Changer le mot de passe</h2>

        <label>
          Ancien mot de passe
          <input
            type="password"
            value={passwords.ancien}
            onChange={(e) => handlePasswordChange("ancien", e.target.value)}
          />
        </label>

        <label>
          Nouveau mot de passe
          <input
            type="password"
            value={passwords.nouveau}
            onChange={(e) => handlePasswordChange("nouveau", e.target.value)}
          />
        </label>

        <label>
          Confirmation
          <input
            type="password"
            value={passwords.confirmation}
            onChange={(e) => handlePasswordChange("confirmation", e.target.value)}
          />
        </label>

        <button className="save-btn" onClick={handlePasswordSave}>
          Modifier le mot de passe
        </button>
      </div>

      <div className="profil-card">
        <h2> Notifications</h2>

        <div className="toggle-row">
          <span>Notifications push</span>
          <input
            type="checkbox"
            checked={notifications.push}
            onChange={(e) => handleNotificationsChange("push", e.target.checked)}
          />
        </div>

        <div className="toggle-row">
          <span>Notifications par e-mail</span>
          <input
            type="checkbox"
            checked={notifications.email}
            onChange={(e) => handleNotificationsChange("email", e.target.checked)}
          />
        </div>

        <div className="toggle-row">
          <span>Notifications SMS</span>
          <input
            type="checkbox"
            checked={notifications.sms}
            onChange={(e) => handleNotificationsChange("sms", e.target.checked)}
          />
        </div>
      </div>

      <div className="profil-card">
        <h2>Compte</h2>
        <button className="danger" onClick={handleLogout}>
          Déconnexion
        </button>
      </div>
    </div>
  );
}
