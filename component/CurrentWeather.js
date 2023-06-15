import { useEffect, useState } from "react";
import { LogBox, Text, View} from "react-native";
import forecast from "../api/forecast";

const CurrentWeather = ({name = null, local, temperature, language}) => {
    const [condition, setCondition] = useState('');
    const [temp, setTemp] = useState('');
    const [mintemp_c, setMintemp_c] = useState('');
    const [maxtemp_c, setMaxtemp_c] = useState('');
    //console.log(local);
    useEffect(() => {
        forecast.getCurrentWeather(local, temperature, language).then((response) => {
            setCondition(response.condition);
            setTemp(response.temp);
            setMintemp_c(response.mintemp_c);
            setMaxtemp_c(response.maxtemp_c);
        })
    }, [local, language, temperature])

    //console.log(temperature);

    return (

        <View style={{
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
        }}>
            <Text style={{
                fontSize: 24,
            }}>
                { 
                    name ? name : local
                }
            </Text>
            <Text style={{
                fontSize: 64,
                fontWeight: 'bold',
                textAlign: 'center',
            }} >{temp}°{temperature}</Text>
            <Text style={{
                fontSize: 16,
            }}>{condition}</Text>
            {   language == 'V' && 
                <Text>C: {maxtemp_c}°{temperature}    T: {mintemp_c}°{temperature}</Text>
            }
            {   language !== 'V' && 
                <Text>H: {maxtemp_c}°{temperature}    L: {mintemp_c}°{temperature}</Text>
            }
           
        </View>
    )    
}

export default CurrentWeather;