import * as FileSystem from 'expo-file-system';

export const getSetting = async () => {
  const fileUri = `${FileSystem.documentDirectory}/setting.json`;
  if (!(await FileSystem.getInfoAsync(fileUri)).exists) {
    const asset = Asset.fromModule(require("../assets/setting.json"));
    await FileSystem.downloadAsync(asset.uri, 'setting.json');
  }
  return await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}/setting.json`);
}