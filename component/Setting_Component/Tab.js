import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native"
import current from "../../api/current";
import forecast from "../../api/forecast";
import { AppContext } from "../../provider/AppProvider";

const Tab = (props) => {
    const navigation = useNavigation();
    const [local, setLocal] = useState('');
    const [condition, setCondition] = useState('');
    const [temp, setTemp] = useState('');
    const [mintemp_c, setMintemp_c] = useState('');
    const [maxtemp_c, setMaxtemp_c] = useState('');
    const {temperature, language} = useContext(AppContext);
    const {lat, lon, name} = props;

    useEffect(()=>{
        current.getLocation(lat, lon).then(response => setLocal(response))
    }, [lat, lon])
    useEffect(()=>{
        forecast.getCurrentWeather(local, temperature, language).then((response) => {
            setCondition(response.condition);
            setTemp(response.temp);
            setMintemp_c(response.mintemp_c);
            setMaxtemp_c(response.maxtemp_c);
        })
    }, [local, language, temperature])
    return (
        <TouchableOpacity 
            style={{
                    margin: 20,
                    backgroundColor: '#FFCC99',
                    height: 120, 
                    width: 370,
                    borderRadius: 8,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
            }} 
            onPress={() => {
                    navigation.navigate('Details', {...props});
            }}
        >
            <View>
                <Text style={{
                    margin: 20,
                    fontSize:24,
                    fontWeight: 'bold',
                }}>{name}</Text>
                <Text style={{marginTop: 20, marginLeft: 20}}>{condition}</Text>
            </View>

            <View style={{
                justifyContent: 'center',
                alignItems:'center',
                marginRight: 20,
            }}>
                <Text style={{
                    fontSize: 32,
                    fontWeight: 'bold',
                }} >{temp}°{temperature}</Text>
                {   language == 'V' && 
                    <Text>C: {maxtemp_c}°{temperature}    T: {mintemp_c}°{temperature}</Text>
                }
                {   language !== 'V' && 
                    <Text>H: {maxtemp_c}°{temperature}    L: {mintemp_c}°{temperature}</Text>
                }
            </View>
       </TouchableOpacity>
    )
}

export default Tab;