import React, { useContext } from "react";
import { ImageBackground, ScrollView, Text, View, Button, SafeAreaView, TouchableOpacity } from "react-native";
//import { Icon } from "react-native-vector-icons/icon";
import Icon from 'react-native-vector-icons/AntDesign';
import HourWeather from "../HourWeather";
import CurrentWeather from "../CurrentWeather";
import DayWeather from "../DayWeather";
import OtherCondition from "../OtherCondition";
import AirQuality from "../AirQuality";
import { useEffect, useState } from "react";
import current from "../../api/current";
import db from "../../api/db";
import { AppContext } from "../../provider/AppProvider";

function Details({ route, navigation }) {
    const { id, name, lat, lon } = route.params;
    const [location, setLocation] = useState('');
    const [isFavorite, setIsFavorite] = useState(undefined);
    const { requireReload, temperature, language } = useContext(AppContext);

    useEffect(() => {
        current.getLocation(lat, lon).then((response) => setLocation(response));
        db.getDBConnection().then(dbConnect => {
            dbConnect.transaction(tx => {
                tx.executeSql(
                    'SELECT * FROM saves WHERE state_id = ?',
                    [id],
                    (_, results) => {
                        console.log(results.rows);
                        if (results.rows.length > 0) {
                            setIsFavorite(true);
                        } else {
                            setIsFavorite(false);
                        }
                    },
                    (_, error) => console.log(error)
                );
            });
        });
    }, [id]);


    const handleFavorite = async (state) => {
        if (state) {
            db.getDBConnection().then(dbConnect => {
                dbConnect.transaction(tx => {
                    // insert if not exists
                    tx.executeSql(
                        'INSERT INTO saves (state_id, name, lat, lon) SELECT ?, ?, ?, ? WHERE NOT EXISTS(SELECT 1 FROM saves WHERE state_id = ?)',
                        [id, name, lat, lon, id],
                        (_, results) => console.log("Insert success"),
                        (_, error) => console.log(error)
                    );
                });
            });
        } else {
            db.getDBConnection().then(dbConnect => {
                dbConnect.transaction(tx => {
                    tx.executeSql(
                        'DELETE FROM saves WHERE state_id = ?',
                        [id],
                        (_, results) => {
                            console.log("Delete success");
                        }
                    );
                })
            });
        }
    }

    //console.log(isFavorite);


    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require('../../assets/morning.png')} style={{ flex: 1 }} resizeMode="cover">
                <SafeAreaView>
                    <View 
                        style={{ 
                            justifyContent: "space-between", 
                            flexDirection: 'row',
                            paddingHorizontal: 10, 
                        }}
                    >
                        <Button title="< Back" onPress={() => navigation.goBack()} 
                            color={'#000'}
                        />

                        <TouchableOpacity onPress={() => {
                            setIsFavorite(!isFavorite);
                            handleFavorite(!isFavorite);
                            requireReload();
                        }}>
                            { isFavorite ? <Icon name="heart" size={30} style={{margin:15,}}/> :
                                <Icon name="hearto" size={30} style={{margin:15,}}/>
                            }
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>

                <View style={{ flex: 1 }}>
                    <ScrollView>
                        <View style={{
                            marginVertical: 40,
                        }}>
                            <CurrentWeather name={name} local={location} temperature={temperature} language={language} />
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
                            {   language !== 'V' &&
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
                                {   language == 'V' &&
                                    <Text style={{
                                        fontSize: 16,
                                        marginTop: 15,
                                    }}>Dự báo 10 ngày tới</Text>
                                }
                                {   language !== 'V' &&
                                    <Text style={{
                                        fontSize: 16,
                                        marginTop: 15,
                                    }}>Forecast for the next 10 days</Text>
                                }

                            </View>
                            <DayWeather local={location} temperature={temperature} language={language} />
                        </View>

                        <AirQuality local={location} language={language}/>

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

export default Details;