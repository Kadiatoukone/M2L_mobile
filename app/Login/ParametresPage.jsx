import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ParametresPage() {
  const navigate = useNavigate();

  const [settings, setSettings] = useState({
    notifEmail: true,
    notifSMS: true,
    notifReservation: true,
    modeSombre: false,
  });

  const [passwords, setPasswords] = useState({
    ancien: "",
    nouveau: "",
    confirmation: "",
  });

  const handleSettingChange = (key, value) => {
    setSettings((prev) => ({
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

  const handleSave = () => {
    console.log("Paramètres :", settings);
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

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  return (
    <div className="parametres-container">
      <header className="profil-header">
        <button onClick={() => navigate(-1)}>
          ← Retour
        </button>

        <h1>Paramètres</h1>

        <div />
      </header>

      <div className="profil-card">
        <h2>Notification</h2>

        <div className="toggle-row">
          <span>Notifications email</span>
          <input
            type="checkbox"
            checked={settings.notifEmail}
            onChange={(e) =>
              handleSettingChange(
                "notifEmail",
                e.target.checked
              )
            }
          />
        </div>

        <div className="toggle-row">
          <span>Notification SMS </span>
          <input
            type="checkbox"
            checked={settings.notifSMS}
            onChange={(e) =>
              handleSettingChange(
                "notifSMS",
                e.target.checked
              )
            }
          />
        </div>

        <div className="toggle-row">
          <span>Notifications réservation</span>
          <input
            type="checkbox"
            checked={settings.notifReservation}
            onChange={(e) =>
              handleSettingChange(
                "notifReservation",
                e.target.checked
              )
            }
          />
        </div>


        <button
          className="save-btn"
          onClick={handleSave}
        >
          Enregistrer les préférences
        </button>
      </div>

      <div className="profil-card">
        <h2>Sécurité</h2>

        <label>
          Ancien mot de passe
          <input
            type="password"
            value={passwords.ancien}
            onChange={(e) =>
              handlePasswordChange(
                "ancien",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Nouveau mot de passe
          <input
            type="password"
            value={passwords.nouveau}
            onChange={(e) =>
              handlePasswordChange(
                "nouveau",
                e.target.value
              )
            }
          />
        </label>

        <label>
          Confirmation
          <input
            type="password"
            value={passwords.confirmation}
            onChange={(e) =>
              handlePasswordChange(
                "confirmation",
                e.target.value
              )
            }
          />
        </label>

        <button
          className="save-btn"
          onClick={handlePasswordSave}
        >
          Modifier le mot de passe
        </button>
      </div>

      <div className="profil-card">
        <h2>Compte</h2>

        <button
          className="danger"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
      </div>
    </div>
  );
}