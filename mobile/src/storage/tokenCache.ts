import * as SecureStore from "expo-secure-store";

const getToken = async (Key: string) => {
  try {
    return SecureStore.getItemAsync(Key);
  } catch (error) {
    throw error;
  }
};

const saveToken = async (Key: string, value: string) => {
  try {
    return SecureStore.setItemAsync(Key, value);
  } catch (error) {
    throw error;
  }
};

export const tokenCache = {
  getToken,
  saveToken,
};
