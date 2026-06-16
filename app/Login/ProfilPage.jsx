import { useState } from "react";

export default function ProfilPage() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const [form, setForm] = useState({
    prenom: "Gina",
    nom: "Banen",
    email: "gina.banen@email.com",
    telephone: "+33 6 67 80 04 56",
    numeroAdherent: "123456789",
    Ligue : "Ligue de Lorraine",
    Postedanslaligue : "Présidente",
    notifEmail: true,
    modeSombre: false,
  });

  const handleChange = (key, value) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Données enregistrées :", form);
    
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="profil-container">
      <header className="profil-header">
        <button
          className="burger-btn"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          ☰
        </button>
        <h1>Mon Profil</h1>
        <button
          className="close-btn"
          onClick={handleCancel}
          aria-label="Fermer"
        >
          ✕
        </button>
      </header>

      {menuOpen && (
        <nav className="burger-menu">
          <button onClick={() => navigate("/profil")}>
            Mon profil
          </button>

          <button onClick={() => navigate("/parametres")}>
            Paramètres
          </button>

          <button onClick={() => navigate("/")}>
            Tableau de bord
          </button>
        </nav>
      )}

      <div className="profil-card">
        <div className="avatar-row">
          <div className="avatar">
            {`${form.prenom.charAt(0)}${form.nom.charAt(0)}`.toUpperCase()}
          </div>

          <div>
            <p className="nom">{form.prenom} {form.nom}</p>
            <p className="email">{form.email}</p>
          </div>
        </div>

        <label>
          Prénom
          <input
            type="text"
            value={form.prenom}
            onChange={(e) => handleChange("prenom", e.target.value)}
          />
        </label>

        <label>
          Nom 
          <input
            type="text"
            value={form.nom}
            onChange={(e) => handleChange("nom", e.target.value)}
          />
        </label>

        <label>
          Email
          <input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </label>

        <label>
          Téléphone
          <input
            type="tel"
            value={form.telephone}
            onChange={(e) => handleChange("telephone", e.target.value)}
          />
        </label>

        <label>
          Numéro d'adhérent
          <input
            type="Tel"
            value={form.numeroAdherent}
            onChange={(e) => handleChange("numeroAdherent", e.target.value)}
          />
        </label>

        <label>
          Poste dans la ligue
          <input
            type="Tel"
            value={form.Postedanslaligue}
            onChange={(e) => handleChange("Postedanslaligue", e.target.value)}
          />
        </label>

        

        <div className="profil-buttons">
          <button className="btn-cancel" onClick={handleCancel}>
            Annuler
          </button>
          <button className="btn-save" onClick={handleSubmit}>
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}