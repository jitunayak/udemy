import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeAsyncStorageData = async (key: string, value: string) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (err) {
    console.error(`Async storage store failed ${err}`);
  }
};

export async function getAsyncStorageData(key: string) {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // value previously stored
      return value;
    }
  } catch (err) {
    // error reading value
    console.error(`Error loading from local ${err}`);
  }
}
