import axios from "axios";

async function get24hForecast(local, temperature) {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var currentDay = year + '-' + month + '-' + date;
    let result = [];
    try {
        response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=0a555ea066f240fb90d191841230704&q=${local}&day=${currentDay}`);
        response.data.forecast.forecastday[0].hour.forEach(function(item) {
            let myObject = {};
            myObject.temp = temperature == 'C' ? item.temp_c : item.temp_f;
            var a = item.condition.icon + ''
            myObject.icon = a.substring(a.length - 7, a.length-4);
            result.push(myObject);
        })
        return result;
    } catch(error) {
        throw error;
    }
}

async function getCurrentWeather(local, temperature, language) {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var currentDay = year + '-' + month + '-' + date;
    if (language === 'V') lang = 'vi';
    else lang = 'en';
    try {
        response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=0a555ea066f240fb90d191841230704&q=${local}&day=${currentDay}&lang=${lang}`);
        let myObject = {};
        myObject.condition = response.data.current.condition.text;
        myObject.temp =  temperature == 'C' ? response.data.current.temp_c : response.data.current.temp_f;
        myObject.mintemp_c = temperature == 'C' ? response.data.forecast.forecastday[0].day.mintemp_c : response.data.forecast.forecastday[0].day.mintemp_f;
        myObject.maxtemp_c = temperature == 'C' ? response.data.forecast.forecastday[0].day.maxtemp_c : response.data.forecast.forecastday[0].day.maxtemp_f;
        return myObject;
    } catch(error) {
        throw error;
    }
}

async function get10DayForecast(local, temperature) {
    let result = [];
    try {
        response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=f175102438844f8ba66184059231506&q=${local}&days=10&lang=vi`);
        response.data.forecast.forecastday.forEach(function(item){
            let myObject = {};
            myObject.mintemp_c = temperature == 'C' ? item.day.mintemp_c : item.day.mintemp_f;
            myObject.maxtemp_c = temperature == 'C' ? item.day.maxtemp_c : item.day.maxtemp_f;
            var date = item.date + '';
            myObject.date = date.substring(date.length - 5, date.length);
            var a = item.day.condition.icon + '';
            myObject.icon = a.substring(a.length - 4, a.length - 7);
            result.push(myObject);
        })
        //console.log(response.data.forecast.forecastday[0].date);
        return result;
    } catch(error) {
        throw error;
    }
}

async function getOtherForecast(local, temperature) {
    let now = new Date().getHours();
    try {
        response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=0a555ea066f240fb90d191841230704&q=${local}`);
        let myObject = {};
        //console.log(response.data.current.uv)
        myObject.uv = response.data.current.uv;
        myObject.hour = response.data.forecast.forecastday[0].hour;
        myObject.totalprecip_mm = response.data.forecast.forecastday[0].day.totalprecip_mm;
        myObject.rainchance = response.data.forecast.forecastday[0].day.daily_chance_of_rain;
        var a = response.data.forecast.forecastday[0].astro.sunrise + '';
        myObject.sunrise_time = a.substring(0, a.length - 3);
        myObject.sunset_time = response.data.forecast.forecastday[0].astro.sunset + '';
        myObject.wind_kph = response.data.current.wind_kph;
        myObject.wind_dir = response.data.current.wind_dir;
        myObject.gust_kph = response.data.current.gust_kph;
        myObject.humidity = response.data.current.humidity;
        myObject.dewpoint = temperature == 'C' ? response.data.forecast.forecastday[0].hour[now].dewpoint_c 
                                                : response.data.forecast.forecastday[0].hour[now].dewpoint_f;
        myObject.vis_km = response.data.current.vis_km;
        myObject.vis_miles = response.data.current.vis_miles;
        var start_time = -1, finish_time = -1;
        response.data.forecast.forecastday[0].hour.forEach(function(item, index) {
            if (item.uv > 3 && start_time == -1) start_time = index;
            if (item.uv > 3) finish_time = index;
        })
        myObject.start_time = start_time + ':00';
        if (start_time < 10) myObject.start_time = '0' + myObject.start_time;
        myObject.finish_time = finish_time + ':00';
        if (finish_time < 10) myObject.finish_time = '0' + myObject.finish_time;
        //console.log(response.data.forecast.forecastday[0].hour[0].uv);
        return myObject;
    } catch(error) {
        throw error;
    }
}

async function getAirQuility(local) {
    try {
        response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=fe6450ec96f1490c968214415232105&q=${local}&aqi=yes`);
        return response.data.current.air_quality['us-epa-index'];
    } catch(error) {
        throw error;
    }
}

export default {
    get24hForecast,
    getCurrentWeather,
    get10DayForecast,
    getOtherForecast,
    getAirQuility,
}