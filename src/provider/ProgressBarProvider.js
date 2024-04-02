import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

const ProgressBarContext = React.createContext();

export const useProgressBar = () => {
    return useContext(ProgressBarContext);
};

const ProgressBarProvider = ({ children }) => {
    const [progress, setProgress] = useState(false);
    const [loading, setLoading] = useState(false);
    const [prevLoc, setPrevLoc] = useState("");
    const location = useLocation();

    useEffect(() => {
        setPrevLoc(location.pathname);
        setProgress(true);
        if (location.pathname === prevLoc) {
            setPrevLoc("");
        }
        // eslint-disable-next-line
    }, [location]);

    useEffect(() => {
        setProgress(false);
    }, [prevLoc]);

    useEffect(() => {
        const startLoading = () => setLoading(true);
        const endLoading = () => setLoading(false);

        // Ajoute des écouteurs pour démarrer et arrêter le chargement
        window.addEventListener('load', startLoading);
        window.addEventListener('beforeunload', startLoading);
        window.addEventListener('DOMContentLoaded', endLoading);

        // Nettoye les écouteurs lors du démontage du composant
        return () => {
            window.removeEventListener('load', startLoading);
            window.removeEventListener('beforeunload', startLoading);
            window.removeEventListener('DOMContentLoaded', endLoading);
        };
    }, []);

    const progressBar = loading
        ? <TopBarProgress />
        : progress
            ? <TopBarProgress />
            : null;

    const value = {
        displayProgressBar: setLoading
    }

    return (
        <ProgressBarContext.Provider value={value}>
            {progressBar}
            {children}
        </ProgressBarContext.Provider>
    );
};

export default ProgressBarProvider;

TopBarProgress.config({
    barColors: {
        "0": "aliceblue",
        "1.0": "aliceblue"
    },
    shadowBlur: 5
});