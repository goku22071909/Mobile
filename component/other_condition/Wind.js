import { Text, View, Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

const Wind = ({wind_kph, wind_dir, language}) => {
    return (
        <View style={{
            backgroundColor: '#FFCC99',
            width: 180,
            height: 180,
            borderRadius: 10,
        }}>
            <View style={{margin: 15,}}>

                <View style={{flexDirection: 'row', marginBottom: 5,}}>
                    <Icon name='wind' size={24}/>
                    {   language == 'V' && 
                        <Text style={{marginTop: 2, marginLeft: 5, marginBottom: 5, fontSize: 16}}>Gió</Text>
                    }
                    {   language !== 'V' && 
                        <Text style={{marginTop: 2, marginLeft: 5, marginBottom: 5, fontSize: 16}}>Wind</Text>
                    }
                </View>

                <Text style={{
                    fontSize: 24,
                    fontWeight: 'bold',
                }}>{wind_kph} km/h</Text>
                <Image source={require('../../assets/compass.png')} style={{
                    height: 50,
                    width: 100,
                    marginLeft: 20,
                    opacity: 0.2,
                    marginBottom: 15,
                }} />
                {   language == 'V' &&
                    <Text>Hướng gió: {wind_dir}</Text>
                }
                {   language !== 'V' &&
                    <Text>Wind direction: {wind_dir}</Text>
                }
                
            </View>
        </View>
    )

}

export default Wind;