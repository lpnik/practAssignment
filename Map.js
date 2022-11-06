import { Text, View, ScrollView } from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import * as Location from 'expo-location';
import * as TaskManager from "expo-task-manager";
import { useEffect, useState, useLayoutEffect } from 'react';
import StyleSheet from './Styles';
import Toggle from './Toggle';
import { AntDesign } from '@expo/vector-icons';


const INITIAL_LATITUDE = 65.0800;
const INITIAL_LONGITUDE = 25.4800;
const INITIAL_LATITUDE_DELTA = 0.0922;
const INITIAL_LONGITUDE_DELTA = 0.0421;
const LOCATION_TRACKING = "LOCATION_TRACKING"

export default function Map({navigation, route}) {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitudeEnd, setLatitudeEnd] = useState(0);
  const [longitudeEnd, setLongitudeEnd] = useState(0);
  const [locationStart, setLocation] = useState('Odotetaan alkupaikannusta');
  const [end, setEnd] = useState('Harjoitus ei ole vielä loppunut');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async() => {
      let {status} = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setIsLoading(false);
          alert("Foreground geolocation failed.");
          return;
        }

        let backgroundPermission = await Location.requestBackgroundPermissionsAsync();

        const alkulokaatio = await Location.getLastKnownPositionAsync({accuracy: Location.Accuracy.High});
        setLatitude(alkulokaatio.coords.latitude);
        setLongitude(alkulokaatio.coords.longitude);
        setIsLoading(false);

    let { coords } = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High});

      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude
        });

        for (let item of response) {
          let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;

          setLocation(address);
        }
      }
        console.log('LÄHTÖ: ');
        console.log(locationStart);
    })();
  },[])

  const startLocationTracking = async () => {
    await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
      accuracy: Location.Accuracy.Highest,
      timeInterval: 2000,
      distanceInterval: 0,
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Background tracking is on",
        notificationBody: "We're tracking you'",
        notificationColor: "#ffce52",
      },

    });
    const started = await Location.hasStartedLocationUpdatesAsync(
      LOCATION_TRACKING
    );
    console.log('Tracking started', started);
  };

  const stopLocationTracking = async () => {
    const started = await Location.hasStartedLocationUpdatesAsync(
        LOCATION_TRACKING
      )
      if (started) {
        await Location.stopLocationUpdatesAsync(LOCATION_TRACKING)
        console.log('Tracking stopped')

        let { coords } = await Location.getLastKnownPositionAsync({accuracy: Location.Accuracy.High});
        if(coords) {
          const { latitude, longitude } = coords;
          let response = await Location.reverseGeocodeAsync({
            latitude,
            longitude
          });
  
          for (let item of response) {
            let address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
  
            setEnd(address);
          }
        }
      }
      const loppulokaatio = await Location.getLastKnownPositionAsync({accuracy: Location.Accuracy.High});
      setLatitudeEnd(loppulokaatio.coords.latitude);
      setLongitudeEnd(loppulokaatio.coords.longitude);
      setIsLoading(false);
      console.log("LOPPU: ");
      console.log(end);
  }

  useLayoutEffect(() => {
    navigation.setOptions({
        headerStyle: {
            backgroundColor: '#f0f0f0'
        },
        headerRight: () => (
            <AntDesign
                style={StyleSheet.navButton}
                name="save"
                size={24}
                color="red"
                onPress={() => 
                  navigation.navigate ('Home', {locationStart: locationStart})}
            />
        ),
    })
}),[locationStart];

  if (isLoading) {
    return <View style={StyleSheet.container}><Text>Retrieving location..</Text></View>
  } else {

  return (
    <View style={StyleSheet.container}>


        <MapView
          style={StyleSheet.map}
          initialRegion={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: INITIAL_LATITUDE_DELTA,
            longitudeDelta: INITIAL_LONGITUDE_DELTA,
          }}
          mapType='standard'>
            <Marker
              title="Alku"
              coordinate={{latitude: latitude, longitude: longitude}}
            />
          <Marker
            title="Loppu"
            coordinate={{latitude: latitudeEnd, longitude: longitudeEnd}}
          />
        </MapView>
        <ScrollView>
        <Toggle start={startLocationTracking} stop={stopLocationTracking} >
        </Toggle>
        <Text style={StyleSheet.rowText}>Alku: {locationStart}</Text>
        <Text style={StyleSheet.rowText}>Loppu: {end}</Text>
        </ScrollView>

    </View>
   
    );
  }
}

TaskManager.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error(error)
    return
  }
  if (data) {
    const { locations } = data
    const alku = locations[0]
    if (alku) {
      console.log("New locations", alku.coords)
    }
  }
})