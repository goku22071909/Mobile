import { FlatList, Image, ScrollView, Text, View } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import axios from "axios";
import { useEffect, useState } from "react";
import forecast from "../api/forecast";
import { icons } from "../utils/WeatherIcon";

const HourWeather = ({local, temperature}) => {
    const MAX_HOUR = 24;
    const [data, setData] = useState([]);
    //console.log(local);
    let hour = [];

    for (var i = 0; i < MAX_HOUR; ++i) {
        if (i < 10) hour[i] = '0' + i + ":00";
        else hour[i] = i + ':00';
    }

    useEffect(() => {
        forecast.get24hForecast(local, temperature).then(response => setData(response));
    }, [local, temperature]);

    let items = [];
    for (var i = 0; i < MAX_HOUR; ++i) {
        let myObject = {};
        myObject.hour = hour[i];
        myObject.temp = data[i]?.temp;
        if (i > 5 && i < 19) myObject.icon = icons.day[`${data[i]?.icon ?? 113}`];
        else myObject.icon = icons.night[`${data[i]?.icon}` ?? 113];
        items.push(myObject);
    }

    return (
        <FlatList horizontal={true}
            data={items}
            renderItem={({ item }) => {
                return (
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: 16,
                            margin: 10,
                        }}>{item.hour}</Text>

                        <Image source={item.icon} style={{
                            width: 48,
                            height: 48,
                        }}/>

                        <Text style={{
                            fontSize: 16,
                            margin: 10,
                        }}>{item.temp??0}°{temperature}</Text>
                    </View>)
            }}
        />
    )

}

export default HourWeather;