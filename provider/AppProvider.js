import { createContext, useState, useContext, useEffect } from "react";
import db from "../api/db";
import { getSetting } from "../api/settingapi";

export const AppContext = createContext({
    search: {
        lat: 0,
        lon: 0,
    },
    setSearch: () => {},
    forceReload: 0,
    requireReload: () => {},
    temperature: 'C',
    setTemperature: () => {},
    language: 'V',
    setLanguage: () => {},
});

const AppProvider = ({ children }) => {
    const [search, setSearch] = useState({ lat: 0, lon: 0 });
    const [forceReload, setForceReload] = useState(0);
    const [temperature, setTemperature] = useState('C');
    const [language, setLanguage] = useState('V');

    useEffect(() => {
        db.getDBConnection().then(dbConnect => {
            dbConnect.transaction(tx => {
                tx.executeSql('SELECT * FROM saves', [], (_, results) => setSaves(results.rows._array));
            });
        });

        getSetting().then(setting => {
            const tmp = JSON.parse(setting);
            setTemperature(tmp.temperature);
            setLanguage(tmp.language);

        }).catch(err => console.log(err));
    }, []);

    
    return (
        <AppContext.Provider value={{
            search,
            setSearch,
            forceReload,
            requireReload: () => setForceReload(1 - forceReload),
            temperature,
            setTemperature,
            language,
            setLanguage,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export default AppProvider;