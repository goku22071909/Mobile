import { useEffect, useState } from "react";
import { Text, View } from "react-native";
import Icon from 'react-native-vector-icons/Entypo';
import forecast from "../api/forecast";
import { airAlert, airAlertE, level, levelE } from "../utils/AirQualityLevel";
import { LinearGradient } from 'expo-linear-gradient';

const AirQuality = ({ local, language }) => {

    const [airquality, setAirquality] = useState(0);
    useEffect(() => {
        forecast.getAirQuility(local).then((response) => {
            setAirquality(response);
            //console.log(response);
        })
    }, [local]);

    console.log(airquality);

    return (
        <View style={{
            height: 200,
            margin: 10,
            backgroundColor: '#FFCC99',
            borderRadius: 10,
        }}>
            <View style={{ margin: 10, }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon name="air" size={24} />
                    {   language == 'V' && 
                        <Text style={{
                            fontSize: 16,
                            marginLeft: 10,
                        }}>Chất lượng không khí</Text>
                    }
                    {   language !== 'V' && 
                        <Text style={{
                            fontSize: 16,
                            marginLeft: 10,
                        }}>Air Quality</Text>
                    }
                </View>

                <Text style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                    marginHorizontal: 10,
                    marginVertical: 5
                }}>{airquality}</Text>
                {   language == 'V' && 
                    <Text style={{ marginBottom: 10, }}>Chất lượng: {level[`${airquality}`]}</Text>
                }
                {   language !== 'V' && 
                    <Text style={{ marginBottom: 10, }}>Quality: {levelE[`${airquality}`]}</Text>
                }
                <LinearGradient colors={['green', 'yellow', 'orange', 'red', 'pink']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ marginTop: 10, marginBottom: 10, }}>
                    <View style={{ height: 3, }}></View>
                </LinearGradient>
                {   language == 'V' && 
                    <Text>{airAlert[`${airquality}`]}</Text>
                }
                {   language !== 'V' && 
                    <Text>{airAlertE[`${airquality}`]}</Text>
                }
            </View>

        </View>
    )

}

export default AirQuality;