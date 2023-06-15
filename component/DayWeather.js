import { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import Icon from 'react-native-vector-icons/AntDesign';
import forecast from "../api/forecast";
import { icons } from "../utils/WeatherIcon";
const DayWeather = ({local, temperature, language}) => {

    const TEN_NEXT_DAYS = 10;
    const [data, setData] = useState([]);
    //console.log(local);
    useEffect(() => {
        forecast.get10DayForecast(local, temperature).then((response) => {
            setData(response);
            //console.log(response);
        })
    }, [local, temperature, language])

    let items = [];
    for (var i = 0; i < TEN_NEXT_DAYS; ++i) {
        let myObject = {};
        if (data[i]) { 
            myObject.date = data[i]?.date;
            myObject.mintemp_c = data[i]?.mintemp_c;
            myObject.maxtemp_c = data[i]?.maxtemp_c;
            if (i > 5 && i < 19) myObject.icon = icons.day[`${data[i]?.icon ?? 113}`];
            else myObject.icon = icons.night[`${data[i]?.icon}` ?? 113];
            //console.log(data[i].icon);
        }
        items.push(myObject);
    }

    //console.log(items);

    return (
        <FlatList
            data={items}
            renderItem={({ item }) => {
                if (item.date) {
                    return (
                        <View style={{
                            margin: 10,
                        }}>
                            <View style={{
                                height: 1,
                                backgroundColor: 'black',
                                marginHorizontal: 10,
                            }}/>
                            <View style={{
                                flexDirection: 'row',
                                marginHorizontal: 10,
                                marginTop: 15,
                                justifyContent: 'space-between',
                                alignItems: 'center',

                            }}>
                                <Text style={{
                                    fontSize: 16,
                                }}>{item.date}</Text>

                                <Image source={item.icon} style={{
                                    width: 48,
                                    height: 48,
                                }} />

                                <Text style={{
                                    fontSize: 16,

                                }}>{item.mintemp_c}°{temperature}</Text>

                                <Icon name="arrowright" size={24} />

                                <Text style={{
                                    fontSize: 16,
                                }}>{item.maxtemp_c}°{temperature}</Text>
                            </View>

                        </View>
                    )}
                else {
                    return (
                        <View style={{
                            margin: 10,
                        }}>
                            <View style={{
                                height: 1,
                                backgroundColor: 'black',
                                marginHorizontal: 10,
                                marginBottom: 10,
                            }}/>
                            {   language == 'V' && 
                                <Text style={{fontSize: 15.5,}}>Hiện tại chúng tôi chưa có dữ liệu thời tiết về ngày này</Text>
                            }
                            {   language !== 'V' && 
                                <Text style={{fontSize: 15.5,}}>We currently do not have weather data for this date</Text>
                            }
                        </View>
                    )
                }
            }}

        />
    )

}

export default DayWeather;