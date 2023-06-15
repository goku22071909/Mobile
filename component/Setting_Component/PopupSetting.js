import { useContext, useEffect, useRef, useState } from 'react';
import { Modal, SafeAreaView, TouchableOpacity, View, Text, Animated, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import settingapi from '../../api/settingapi';
import * as FileSystem from 'expo-file-system';
import { AppContext } from '../../provider/AppProvider';

const PopupSetting = () => {

    const [visible, setVisible] = useState(false);
    const scale = useRef(new Animated.Value(0)).current;
    const { temperature, language, setTemperature, setLanguage } = useContext(AppContext);

    function resizeBox(to) {
        to === 1 && setVisible(true);
        Animated.timing(scale, {
            toValue: to,
            useNativeDriver: true,
            duration: 1000,
            easing: Easing.linear,
        }).start(() => to === 0 && setVisible(false));
    }

    const writeData = async (temp, language) => {
        try {
          const fileUri = `${FileSystem.documentDirectory}/setting.json`;
          const content = { temperature: temp, language: language };
          //const fileContent = await FileSystem.readAsStringAsync(fileUri)
          await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(content));
          console.log('File written successfully!');
          //return fileContent;
        } catch (error) {
          console.error(error);
        }
      };
    //console.log(language);

    const changeStatus = (temp, lang) => {
       writeData(temp, lang);
       setTemperature(temp);
       setLanguage(lang);
    }
    
    return (
        <>
            <TouchableOpacity onPress={() => { resizeBox(1) }}>
                <Icon name="settings-outline" size={30} />
            </TouchableOpacity>
            <Modal transparent={true} visible={visible}>
                <SafeAreaView style={{ flex: 1, }} onTouchStart={() => { resizeBox(0) }}>
                    <Animated.View style={{
                        backgroundColor: '#F5F5F5',
                        borderRadius: 8,
                        borderColor: '#FFCC99',
                        borderWidth: 1,
                        position: 'absolute',
                        paddingBottom: 10,
                        right: 22,
                        top: 120,
                    }}>
                        <TouchableOpacity style={{ marginHorizontal: 15, marginTop: 20 }} onPress={()=> {
                            changeStatus('C', language)
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                            }}>
                                { temperature == 'C' &&
                                    <>
                                        <Icon name='ios-checkmark-done-sharp' size={20} />
                                        { language == 'V' &&
                                            <Text style={{ marginLeft: 5, marginRight: 50, marginBottom: 5 }}>Độ C</Text>
                                        }
                                        { language !== 'V' &&
                                            <Text style={{ marginLeft: 5, marginRight: 50, marginBottom: 5 }}>Temperature C</Text>
                                        }
                                        <Text>°C</Text>
                                    </>
                                }
                                {temperature !== 'C' && 
                                <>
                                    {   language == 'V' &&
                                        <Text style={{ marginLeft: 20, marginRight: 50, marginBottom: 5 }}>Độ C</Text>
                                    }
                                    {   language !== 'V' &&
                                        <Text style={{ marginLeft: 20, marginRight: 50, marginBottom: 5 }}>Temperature C</Text>
                                    }
                                    <Text>°C</Text>
                                </>
                                }
                            </View>
                            <View style={{ height: 1, backgroundColor: 'black', opacity: 0.1 }}></View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginHorizontal: 15, marginTop: 20 }} onPress={() => changeStatus('F', language)}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                            }}>
                               { temperature == 'F' &&
                                    <>
                                        <Icon name='ios-checkmark-done-sharp' size={20} />
                                        { language == 'V' &&
                                            <Text style={{ marginLeft: 5, marginRight: 50, marginBottom: 5 }}>Độ F</Text>
                                        }
                                        { language !== 'V' &&
                                            <Text style={{ marginLeft: 5, marginRight: 50, marginBottom: 5 }}>Temperature F</Text>
                                        }
                                        <Text>°F</Text>
                                    </>
                                }
                                {temperature !== 'F' && 
                                <>
                                    {   language == 'V' &&
                                        <Text style={{ marginLeft: 20, marginRight: 50, marginBottom: 5 }}>Độ F</Text>
                                    }
                                    {   language !== 'V' &&
                                        <Text style={{ marginLeft: 20, marginRight: 50, marginBottom: 5 }}>Temperature F</Text>
                                    }
                                    <Text>°F</Text>
                                </>
                                }
                            </View>
                            <View style={{ height: 1, backgroundColor: 'black', opacity: 0.1 }}></View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginHorizontal: 15, marginTop: 20 }} onPress={() => changeStatus(temperature, 'V')}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                            }}>
                                { language == 'V' &&
                                    <>
                                        <Icon name='ios-checkmark-done-sharp' size={20} />
                                        <Text style={{ marginLeft: 5, marginRight: 50, marginBottom: 5 }}>Tiếng Việt</Text>
                                        <Text>V</Text>
                                    </>
                                }
                                {language !== 'V' && 
                                <>
                                    <Text style={{ marginLeft: 20, marginRight: 50, marginBottom: 5 }}>Vietnamese</Text>
                                    <Text>V</Text>
                                </>
                                }
                            </View>
                            <View style={{ height: 1, backgroundColor: 'black', opacity: 0.1 }}></View>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginHorizontal: 15, marginTop: 20 }} onPress={() => changeStatus(temperature, 'E')}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignContent: 'center',
                            }}>
                               { language == 'E' &&
                                    <>
                                        <Icon name='ios-checkmark-done-sharp' size={20} />
                                        <Text style={{ marginLeft: 5, marginRight: 50, marginBottom: 5 }}>English</Text>
                                        <Text>E</Text>
                                    </>
                                }
                                {language !== 'E' && 
                                <>
                                    <Text style={{ marginLeft: 20, marginRight: 50, marginBottom: 5 }}>Tiếng Anh</Text>
                                    <Text>E</Text>
                                </>
                                }
                            </View>
                        </TouchableOpacity>

                    </Animated.View>
                </SafeAreaView>
            </Modal>
        </>
    )

}

export default PopupSetting;