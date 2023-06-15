import { Text, View, Image } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

const Sun = ({sunrise_time, sunset_time, language}) => {
    return (
        <View style={{
            backgroundColor: '#FFCC99',
            width: 180,
            height: 180,
            borderRadius: 10,
        }}>
            <View style={{margin: 15,}}>

                <View style={{flexDirection: 'row', marginBottom: 5,}}>
                    <Icon name='sunrise' size={24}/>
                    {   language == 'V' && 
                        <Text style={{marginTop: 2, marginLeft: 5, marginBottom: 5, fontSize: 16}}>Mặt trời mọc</Text>
                    }
                    {   language !== 'V' && 
                        <Text style={{marginTop: 2, marginLeft: 5, marginBottom: 5, fontSize: 16}}>Sunrise</Text>
                    }
                </View>

                <Text style={{fontSize: 24, fontWeight: 'bold'}}>{sunrise_time}</Text>

                <Image source={require('../../assets/halfsun.png')} style={{
                    height: 50,
                    width: 100,
                    marginLeft: 20,
                    opacity: 0.2,
                    marginBottom: 20,
                }} />

                {   language == 'V' && 
                    <Text>MT lặn: {sunset_time}</Text>
                }
                 {   language !== 'V' && 
                    <Text>Sunset: {sunset_time}</Text>
                }
                
            </View>
        </View>
    )

}

export default Sun;