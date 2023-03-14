import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import {GOOGLE_MAPS_KEY} from '@env'
const carImg = require('./assets/img/car.png')
import * as Location from 'expo-location'

export default function App() {

  const [origin, setorigin] = useState({
    latitude: -33.597929,
    longitude: -71.6111
  })

  const [destination, setdestination] = useState({
    latitude: -33.580536,
    longitude: -71.613403
  })

  useEffect(() => {
    getLocationPermition()
  }, [])
  

  const getLocationPermition = async () => {
    let {status} = await Location.requestForegroundPermissionsAsync()
    if(status !== 'granted'){
      alert('Permiso denegago')
      return;
    }

    let location = await Location.getCurrentPositionAsync({})
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude
    }
    setorigin(current)
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
        <MapView
        style={styles.map} 
        userInterfaceStyle='dark'
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker 
          coordinate={origin}
          draggable={true}
          onDragEnd={(direction) => setorigin(direction.nativeEvent.coordinate)}
          image={carImg}
        />
        <Marker 
          coordinate={destination}
          draggable={true}
          onDragEnd={(direction) => setdestination(direction.nativeEvent.coordinate)}
        
        />
        <MapViewDirections 
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
          strokeColor="black"
          strokeWidth={4}
          // onReady={result => {
          //   console.log('distance: ', result.distance)
          //   console.log('duration: ', result.duration)
          // }}
        />
        {/* <Polyline 
        coordinates={[origin, destination]}
        strokeColor="red"
        strokeWidth={6}
        /> */}
      </MapView>
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
  map: {
    width: '100%',
    height: '100%',
  }
});
