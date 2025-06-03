import { React, useState, useEffect } from 'react';
import { supabase } from '../Services/supabaseClient';
import Select from 'react-select';
import '../Styles/Jeux.css';

const ListeJeux = () => {
  const [lesJeux, setLesJeux] = useState([]);
  const [filteredJeux, setFilteredJeux] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedAnnee, setSelectedAnnee] = useState(null);
  const [selectedConsole, setSelectedConsole] = useState(null);
  const [selectedEtat, setSelectedEtat] = useState(null);
  const [favorisOnly, setFavorisOnly] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('jeux_avec_favoris')
      .select('*')
      .order('anneeSortieJeux', { ascending: false });
    if (error) console.error('Erreur Supabase :', error);
    else {
      setLesJeux(data);
      setFilteredJeux(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    let result = [...lesJeux];
    if (selectedAnnee) {
      result = result.filter(j => j.anneeSortieJeux == selectedAnnee.value);
    }
    if (selectedConsole) {
      result = result.filter(j => j.nomConsole === selectedConsole.value);
    }
    if (selectedEtat) {
      result = result.filter(j => j.libelleEtat === selectedEtat.value);
    }
    if (favorisOnly) {
      result = result.filter(j => j.idFavoris !== null);
    }
    setFilteredJeux(result);
  }, [selectedAnnee, selectedConsole, selectedEtat, favorisOnly, lesJeux]);

  const jeuxParAnnee = (data) => {
    return data.reduce((acc, jeu) => {
      const annee = jeu.anneeSortieJeux || 'Inconnue';
      if (!acc[annee]) acc[annee] = [];
      acc[annee].push(jeu);
      return acc;
    }, {});
  };

  const getEtatColor = (etat) => {
    if (etat === 'Fini') return '#257508';
    if (etat.includes('Fini, joue encore')) return '#00D5D2';
    if (etat.includes('En cours')) return '#F68512';
  };

  const options = (key) =>
    [...new Set(lesJeux.map(j => j[key]).filter(Boolean))]
      .map(v => ({ value: v, label: v }))
      .sort((a, b) => (a.label > b.label ? 1 : -1));

  if (loading) {
    return <div className="loading texte">Chargement des jeux...</div>;
  }

  const grouped = jeuxParAnnee(filteredJeux);

  return (
    <div className="liste-jeux">
      <div className="texte upRight1 middleText">
        <label>Jeux coup de coeur</label>
        <img src="/images/star-spinning.gif" className="star" />
      </div>

      <div className="texte">
        <label>Filtres</label>
        <div style={{ maxWidth: 300, marginBottom: 20 }}>
          <Select
            className='selectReact'
            options={options('anneeSortieJeux')}
            value={selectedAnnee}
            onChange={setSelectedAnnee}
            placeholder="Date de sortie"
            isClearable
          />
          <Select
          className='selectReact'
            options={options('nomConsole')}
            value={selectedConsole}
            onChange={setSelectedConsole}
            placeholder="Console"
            isClearable
          />
          <Select
            className='selectReact'
            options={options('libelleEtat')}
            value={selectedEtat}
            onChange={setSelectedEtat}
            placeholder="Progression"
            isClearable
          />
          <label>
            <input type="checkbox" checked={favorisOnly} onChange={() => setFavorisOnly(!favorisOnly)} />
            Coup de coeur
          </label>
        </div>
      </div>

      {Object.entries(grouped)
        .sort((a, b) => {
          return b[0] - a[0];
        })
        .map(([annee, jeux]) => (
          <div key={annee} className="annee-section">
            <h2 className="annee-titre">{annee}</h2>
            <div className="game-grid">
              {jeux.map(unJeux => (
                <div key={unJeux.idJeux} className="game-card">
                  <a href={unJeux.siteJeux} target="_blank" rel="noopener noreferrer" className="game-link">
                    {unJeux.idFavoris && <img src="/images/star-spinning.gif" alt="SM64 star" className="star upRight" />}
                    <div className="image-container">
                      <img src={unJeux.imageJeux} alt={unJeux.nomJeux} className="jaquette" />
                    </div>
                  </a>
                  <div className="game-info">
                    <p className="game-title">{unJeux.nomJeux}</p>
                    <p>
                      <span className="game-console">{unJeux.nomConsole}</span>
                      <span
                        style={{ backgroundColor: getEtatColor(unJeux.libelleEtat) }}
                        className="game-state"
                      >
                        {unJeux.libelleEtat}
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
