import { React, useState, useEffect } from 'react';
import { supabase } from '../Services/supabaseClient';
import '../Styles/CodesAmi.css'

const CodesAmi = () => {
    const [lesCodes, setLesCodes] = useState([]);

    const fetchData = async () => {
        const { data, error } = await supabase
          .from('CodesAmis')
          .select('*')
          .order('id', { ascending: true });
        if (error) console.error('Erreur Supabase :', error);
        else {
          setLesCodes(data);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCopy = (text) => {
        navigator.clipboard.writeText(text)
        .then(() => alert('Code copié !'))
        .catch((err) => alert('Erreur : ' + err));
    }

    return (
        <div className="codes-ami-container">
            {lesCodes.map(code => (
                <div key={code.id} className="code-ami-card">
                    <div className="code-ami-header">
                        {code.jeuAmi}
                    </div>
                    <div className="code-ami-content">
                        <div className="code-ami-info">
                            <span className="code-ami-label">Pseudo</span>
                            <span className="code-ami-value">{code.nomAmi}</span>
                        </div>
                        <div className="code-ami-info">
                            <span className="code-ami-label">{code.particuleAmi} :</span>
                            <button onClick={() => handleCopy(code.codeAmi)} className="code-ami-value code-ami-important">{code.codeAmi}</button>
                            {code.iconeAmi && <img src={code.iconeAmi} className="icone" alt="Icône" title={code.jeuAmi} />}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default CodesAmi;