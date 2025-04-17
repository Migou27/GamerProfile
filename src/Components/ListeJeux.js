import { React, useState, useEffect } from 'react';
import { supabase } from '../Services/supabaseClient';
import '../Styles/Jeux.css';

const ListeJeux = () => {
  const [lesJeux, setLesJeux] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('Jeux')
      .select('*, Consoles(*), EtatJeux(*)')
      .order('anneeSortieJeux', { ascending: false });

    if (error) console.error('Erreur Supabase :', error);
    else setLesJeux(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getEtatColor = (etat) => {
    if (etat === 'Fini') return '#257508'; // Vert foncé
    if (etat.includes('Fini, joue encore')) return '#00D5D2'; // Cyan
    if (etat.includes('En cours')) return '#F68512'; // Orange
  };

  if (loading) {
    return <div className="loading">Chargement des jeux...</div>;
  }

  const jeuxParAnnee = lesJeux.reduce((acc, jeu) => {
    const annee = jeu.anneeSortieJeux || 'Inconnue';
    if (!acc[annee]) acc[annee] = [];
    acc[annee].push(jeu);
    return acc;
  }, {});

  return (
    <div className="liste-jeux">
      {Object.entries(jeuxParAnnee)
        .sort((a, b) => b[0] - a[0])
        .map(([annee, jeux]) => (
          <div key={annee} className="annee-section">
            <h2 className="annee-titre">{annee}</h2>
            <div className="game-grid">
              {jeux.map(unJeux => (
                <div key={unJeux.idJeux} className="game-card">
                  <a
                    href={unJeux.siteJeux}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="game-link"
                  >
                    <div className="image-container">
                      <img
                        src={unJeux.imageJeux}
                        alt={unJeux.nomJeux}
                        className="jaquette"
                      />
                    </div>
                  </a>
                  <div className="game-info">
                    <p className="game-title">{unJeux.nomJeux}</p>
                    <p>
                      <span className="game-console">{unJeux.Consoles.nomConsole}</span>
                      <span
                        style={{ backgroundColor: getEtatColor(unJeux.EtatJeux.libelleEtat) }}
                        className="game-state"
                      >
                        {unJeux.EtatJeux.libelleEtat}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ListeJeux;
