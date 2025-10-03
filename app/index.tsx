import { getUserName } from '@/helpers';
import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';

const PokedexApp = () => {

  const [loading, setLoading] = useState(true);
  const [hasName, setHasName] = useState(false);

  useEffect(() => {
    (async () => {
      const name = await getUserName();
      setHasName(!!name);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  return <Redirect href={hasName ? "/(tabs)" : "/login"} />
}

export default PokedexApp