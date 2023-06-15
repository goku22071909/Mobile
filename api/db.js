import * as SQLite from 'expo-sqlite';

const DB_NAME = 'weather.db';

import * as FileSystem from "expo-file-system";
import {Asset} from "expo-asset";

async function openDatabaseShipWithApp() {
    const internalDbName = "app.db"; // Call whatever you want
    const sqlDir = FileSystem.documentDirectory + "SQLite/";
    if (!(await FileSystem.getInfoAsync(sqlDir + internalDbName)).exists) {
        await FileSystem.makeDirectoryAsync(sqlDir, {intermediates: true});
        const asset = Asset.fromModule(require("../assets/weather.db"));
        await FileSystem.downloadAsync(asset.uri, sqlDir + internalDbName);
    }
    return SQLite.openDatabase(internalDbName);
}

async function getDBConnection() {
    return await openDatabaseShipWithApp();
}

async function fetchAllCountries(db) {
    try {
        db.transaction(tx => {
            tx.executeSql(
                `SELECT * FROM countries`,
                [],
                (_, { rows: { _array } }) => _array,
                (_, error) => console.log(`Error: ${error}`)
            );
        });
    } catch (error) {
        throw error;
    }
}

export default { getDBConnection, fetchAllCountries };