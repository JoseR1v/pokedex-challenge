import { STORAGE_KEYS } from "@/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function setUserName(name: string) {
  await AsyncStorage.setItem(STORAGE_KEYS.userName, name.trim());
}

export async function getUserName(): Promise<string | null> {
  return AsyncStorage.getItem(STORAGE_KEYS.userName);
}

export async function clearAll() {
  await AsyncStorage.clear();
}
