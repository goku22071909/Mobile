import { Text, View, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';

const Humidity = ({humidity, dewpoint, temperature, language}) => {
    return (
        <View style={{
            backgroundColor: '#FFCC99',
            width: 180,
            height: 180,
            borderRadius: 10,
        }}>
            <View style={{margin: 15,}}>

                <View style={{flexDirection: 'row', marginBottom: 5,}}>
                    <Icon name='water-outline' size={24}/>
                    {   language == 'V' && 
                        <Text style={{marginTop: 2, marginLeft: 5, marginBottom: 5, fontSize: 16}}>Độ ẩm</Text>
                    }
                    {   language !== 'V' && 
                        <Text style={{marginTop: 2, marginLeft: 5, marginBottom: 5, fontSize: 16}}>Humidity</Text>
                    }
                </View>

                <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 50,}}>{humidity}%</Text>
                {   language == 'V' && 
                    <Text>Nhiệt độ hóa sương là {dewpoint}°{temperature} ngay lúc này</Text> 
                }
                {   language !== 'V' && 
                    <Text>Dewpoint temperature is {dewpoint}°{temperature} right now</Text> 
                } 
                
            </View>
        </View>
    )

}

export default Humidity;