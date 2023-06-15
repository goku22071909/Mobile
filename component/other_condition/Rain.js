import { Text, View, Image } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';

const Rain = ({totalprecip_mm, rainchance, language}) => {
    return (
        <View style={{
            backgroundColor: '#FFCC99',
            width: 180,
            height: 180,
            borderRadius: 10,
        }}>
            <View style={{margin: 15,}}>

                <View style={{flexDirection: 'row', marginBottom: 5,}}>
                    <Icon name='rainy-outline' size={24}/>
                    {   language == 'V' && 
                        <Text style={{marginTop: 2, marginLeft: 5, marginBottom: 5, fontSize: 16}}>Lượng mưa</Text>
                    }
                    {   language !== 'V' && 
                        <Text style={{marginTop: 2, marginLeft: 5, marginBottom: 5, fontSize: 16}}>Amount of rain</Text>
                    }
                </View>

                <Text style={{fontSize: 24, fontWeight: 'bold'}}>{totalprecip_mm}mm</Text>
                { language == 'V' && 
                    <>
                        <Text style={{
                            fontSize: 20,
                            marginBottom: 5,
                        }}>Dự báo trong ngày</Text>
                        <Text>Khả năng có mưa trong ngày: {rainchance}%</Text>
                    </>
                }
                { language !== 'V' && 
                    <>
                        <Text style={{
                            fontSize: 18,
                            marginBottom: 5,
                        }}>Forecast for the day</Text>
                        <Text>Chances of rain during the day: {rainchance}%</Text>
                    </>
                }
                
                
            </View>
        </View>
    )

}

export default Rain;