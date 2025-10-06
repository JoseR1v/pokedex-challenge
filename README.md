Aquí tienes un README breve y directo para tu repo. Pégalo tal cual en `README.md`:

````markdown
# Pokedex Challenge

Pequeña app de Pokédex hecha con **Expo + React Native**, **Expo Router** para rutas por archivos, **NativeWind (Tailwind)** para estilos y **React Query** para datos. Corre en Android, iOS y Web.

---

## Levantar el proyecto

1) Instalar dependencias
```bash
npm install
````

2. Iniciar el bundler

```bash
npm start
# o
npx expo start
```

3. Abrir en cada plataforma (opcional)

```bash
npm run android   # abre en Android (emulador o dispositivo)
npm run ios       # abre en iOS (simulador, en macOS)
npm run web       # abre en el navegador
```

## Correr tests

```bash
npm test          # ejecutar una vez
npm run test:watch # modo watch
npm run test:ci    # modo CI
```

Si necesitas limpiar caché de Jest:

```bash
npx jest --clearCache
```