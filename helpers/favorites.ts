import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = "@favorites:pokemon";

async function read(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

async function write(list: string[]) {
  try {
    await AsyncStorage.setItem(KEY, JSON.stringify(list));
  } catch {}
}

export async function getFavorites(): Promise<string[]> {
  return read();
}

export async function isFavorite(name: string): Promise<boolean> {
  const list = await read();
  return list.includes(name.toLowerCase());
}

export async function setFavorite(name: string, value: boolean): Promise<void> {
  const key = name.toLowerCase();
  const list = await read();
  const has = list.includes(key);
  if (value && !has) {
    list.push(key);
    await write(list);
  } else if (!value && has) {
    await write(list.filter((n) => n !== key));
  }
}

export async function toggleFavorite(name: string): Promise<boolean> {
  const key = name.toLowerCase();
  const list = await read();
  const has = list.includes(key);
  const next = !has;
  if (next) {
    list.push(key);
  } else {
    const idx = list.indexOf(key);
    if (idx >= 0) list.splice(idx, 1);
  }
  await write(list);
  return next;
}