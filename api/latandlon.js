import * as Location from 'expo-location';

async function getCurrentLatAndLon() {
  try {
      let location = await Location.getCurrentPositionAsync({});
      let myObject = {};
      myObject.lat = location.coords.latitude;
      myObject.lon = location.coords.longitude;
      return myObject;
  } catch(error) {
      throw error;
  }
}

export default {getCurrentLatAndLon,};
