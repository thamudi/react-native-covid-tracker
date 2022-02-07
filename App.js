import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [data, setData] = useState({})
  useEffect(() => {
    fetch('https://api.covid19api.com/live/country/jordan/status/confirmed/date/2021-12-25T13:13:30Z').then(response => {
      setData(response.json());
    }).catch(error => {
      console.log(error);
    });
  }, [])
  return (
    <View style={styles.container}>
      <Text>{data}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
