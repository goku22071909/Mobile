import { Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';

const UV = ({ uv, start_time, finish_time, language }) => {

    let level = '';
    if (uv < 3) level = language == 'V' ? 'Thấp' : 'Low';
    else if (uv < 6) level = language == 'V' ? 'Trung bình' : 'Medium';
    else if (uv < 8) level = language == 'V' ? 'Cao' : 'High';
    else if (uv < 11) level = language == 'V' ? "Rất cao" : 'Very High';
    else level = language == 'V' ? 'Cực kì cao' : 'Extremely high';

    return (
        <View style={{
            backgroundColor: '#FFCC99',
            width: 180,
            height: 180,
            borderRadius: 10,
        }}>
            <View style={{ margin: 15, }}>

                <View style={{ flexDirection: 'row', marginBottom: 5, }}>
                    <Icon name='sun' size={24} />
                    {language == 'V' &&
                        <Text style={{ marginTop: 2, marginLeft: 5, fontSize: 16 }}>Chỉ số uv</Text>
                    }
                    {language !== 'V' &&
                        <Text style={{ marginTop: 2, marginLeft: 5, fontSize: 16 }}>UV index</Text>
                    }
                </View>

                <Text style={{
                    fontSize: 30,
                    fontWeight: 'bold',
                }}>{uv}</Text>

                <Text>{level}</Text>

                <LinearGradient colors={['green', 'yellow', 'orange', 'red', 'pink']}
                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                    style={{ marginTop: 15, marginBottom: 20, }}>
                    <View style={{ height: 3, }}></View>
                </LinearGradient>

                {language == 'V' &&
                    <Text>Tránh tia UV</Text>
                }
                {language !== 'V' &&
                    <Text>Avoid UV rays</Text>
                }
                <Text>{start_time} - {finish_time}</Text>
            </View>
        </View>

    );
}

export default UV;