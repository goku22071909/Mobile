import axios from "axios";

async function getLocation(lat, lon) {
    try {
        //console.log(lat);
        response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=0a555ea066f240fb90d191841230704&q=${lat},${lon}`);
        //console.log(response.data.location.name);
        return response.data.location.name;
    } catch(error) {
        throw error;
    }
}

export default {
    getLocation,
}