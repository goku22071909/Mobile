import React, { useContext } from "react";
import { Alert, Image, ImageBackground, SafeAreaView, ScrollView, Text, View } from "react-native";
//import { Icon } from "react-native-vector-icons/icon";
import Icon from 'react-native-vector-icons/AntDesign';
import HourWeather from "../component/HourWeather";
import CurrentWeather from "../component/CurrentWeather";
import DayWeather from "../component/DayWeather";
import OtherCondition from "../component/OtherCondition";
import AirQuality from "../component/AirQuality";
import { useEffect, useState } from "react";
import latandlon from "../api/latandlon";
import current from "../api/current";
import db from "../api/db";
import settingapi from "../api/settingapi";
import { AppContext } from "../provider/AppProvider";

const ReloadLocationTime = 5 * 60 * 1000;

const LocationAlert = (title, message) => {
    return (
        Alert.alert(title, message, [
            {
                text: "OK",
                onPress: () => console.log("OK Pressed"),
            },
        ])
    );
}

function MainScreen(props) {

    const [location, setLocation] = useState('Hanoi');
    const [latLon, setLatLon] = useState({ lat: 21.03, lon: 105.85, });
    const [continueReload, setContinueReload] = useState(true);
    const { temperature, language } = useContext(AppContext);

    // useEffect(() => {
    //     latandlon.getCurrentLatAndLon().then((response) => {
    //         setLatLon(response)
    //         console.log(response);
    //         current.getLocation(response.lat, response.lon).then((response) => setLocation(response));
    //     })
    // }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            latandlon.getCurrentLatAndLon()
                .then((response) => {
                    setLatLon(response)
                    setContinueReload(true);
                }).catch((error) => {
                    //LocationAlert("Lỗi", "Không thể lấy vị trí hiện tại");
                    //setContinueReload(false);
                });
        }, ReloadLocationTime);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        db.getDBConnection().then(dbConnect => {
            dbConnect.transaction(tx => {
                // create saves table if not exists
                tx.executeSql(
                    'CREATE TABLE IF NOT EXISTS saves (id INTEGER PRIMARY KEY AUTOINCREMENT, state_id INTEGER UNIQUE NOT NULL, name TEXT NOT NULL, lat REAL NOT NULL, lon REAL NOT NULL);'
                );
                tx.executeSql(
                    // modify the state_id column to be unique'
                    'CREATE UNIQUE INDEX IF NOT EXISTS state_id_unique ON saves (state_id);'
                );
            });
        });
    }, []);

    useEffect(() => {
        current.getLocation(latLon.lat, latLon.lon)
            .then((response) => setLocation(response))
            .catch((error) => {
                console.log(error);
                console.log("Error in get location api");
            });
    }, [latLon]);

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../assets/morning.png')} style={{ flex: 1 }} resizeMode="cover">
                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{
                            marginHorizontal: 100,
                            marginTop: 100,
                            marginBottom: 80,
                        }}>
                            <CurrentWeather local={location} temperature={temperature} language={language} />
                        </View>

                        <View style={{
                            margin: 10,
                            backgroundColor: '#FFCC99',
                            height: 200,
                            borderRadius: 10,
                        }}>
                            {language == 'V' &&
                                <Text style={{
                                    fontSize: 16,
                                    margin: 15,
                                }}> Dự báo thời tiết trong 24h ngày hôm nay</Text>
                            }
                            {language !== 'V' &&
                                <Text style={{
                                    fontSize: 16,
                                    margin: 15,
                                }}> Weather forecast for 24 hours today</Text>
                            }
                            <View style={{
                                height: 1,
                                backgroundColor: 'black',
                                marginHorizontal: 10,
                            }}>
                            </View>
                            <HourWeather local={location} temperature={temperature}></HourWeather>
                        </View>

                        <View style={{
                            margin: 10,
                            backgroundColor: '#FFCC99',
                            height: 700,
                            borderRadius: 10,
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 10,
                            }}>
                                <Icon name="calendar" size={20} style={{ margin: 15, }} />
                                {language == 'V' &&
                                    <Text style={{
                                        fontSize: 16,
                                        marginTop: 15,
                                    }}>Dự báo 10 ngày tới</Text>
                                }
                                {language !== 'V' &&
                                    <Text style={{
                                        fontSize: 16,
                                        marginTop: 15,
                                    }}>Forecast for the next 10 days</Text>
                                }

                            </View>
                            <DayWeather local={location} temperature={temperature} language={language} />
                        </View>

                        <AirQuality local={location} language={language} />

                        <View style={{
                            margin: 10,
                            height: 700,
                            borderRadius: 10,
                        }}>
                            <OtherCondition local={location} temperature={temperature} language={language} />

                        </View>

                    </ScrollView>
                </View>
            </ImageBackground>

        </View>
    )
}

export default MainScreen;