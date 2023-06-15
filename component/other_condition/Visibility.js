import { Text, View, Image } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

const Visibility = ({vis_km, language}) => {
    return (
        <View style={{
            backgroundColor: '#FFCC99',
            width: 180,
            height: 180,
            borderRadius: 10,
        }}>
            <View style={{margin: 15,}}>

                <View style={{flexDirection: 'row', marginBottom: 5,}}>
                    <Icon name='visibility' size={24}/>
                    {   language == 'V' && 
                        <Text style={{marginTop: 2, marginLeft: 5, marginBottom: 5, fontSize: 16}}>Tầm nhìn</Text>
                    }
                    {   language !== 'V' && 
                        <Text style={{marginTop: 2, marginLeft: 5, marginBottom: 5, fontSize: 16}}>Visibility</Text>
                    }
                </View>

                <Text style={{fontSize: 40, fontWeight: 'bold', marginBottom: 30,}}>{vis_km}km</Text>
                {   language == 'V' &&
                    <Text>Ngay lúc này</Text>
                }
                {   language !== 'V' &&
                    <Text>Right now</Text>
                }
                
            </View>
        </View>
    )
}

export default Visibility;