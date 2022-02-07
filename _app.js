import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, PermissionsAndroid, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';

const requestFineLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: "Permission to check your location",
      message:
        "This app needs to access your location " +
        "so you can check the data.",
      buttonNeutral: "Ask Me Later",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};



export default async function App() {
  const granted = await requestFineLocationPermission();
  useEffect(() => {
    if (granted) {
      Geolocation.getCurrentPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    }

  }, []);

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
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
