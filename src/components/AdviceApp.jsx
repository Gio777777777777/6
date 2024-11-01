import React, { useState, useEffect } from 'react';
import './AdviceApp.css'; 

const AdviceApp = () => {
    const [advice, setAdvice] = useState('');
    const [adviceId, setAdviceId] = useState(0);
    const [loading, setLoading] = useState(true);

    const fetchAdvice = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            const data = await response.json();
            setAdvice(data.slip.advice);
            setAdviceId(data.slip.id);
        } catch (error) {
            console.error('Error fetching advice:', error);
            setAdvice('Could not fetch advice. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAdvice(); // პირველადი დატვირთვა
    }, []);

    return (
        <div className="advice-container">
            <div className="advice-box">
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <p className="advice-number">Advice #{adviceId}</p>
                        <p className="advice-text">{advice}</p>
                    </>
                )}
                <button className="advice-button" onClick={fetchAdvice}>
                    <span className="dice-icon">🎲 </span>
                </button>
            </div>
        </div>
    );
};

export default AdviceApp;
