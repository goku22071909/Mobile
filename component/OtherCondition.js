import { Text, View } from "react-native";
import { useState, useEffect, useRef } from "react";
import forecast from "../api/forecast";
import UV from "./other_condition/UV";
import Sun from "./other_condition/Sun";
import Wind from "./other_condition/Wind";
import { dir, dirE } from "../utils/Wind";
import Humidity from "./other_condition/Humidity";
import Rain from "./other_condition/Rain";
import Visibility from "./other_condition/Visibility";
import 'react-native-gesture-handler';
import { BottomSheetModal, BottomSheetModalProvider, TouchableOpacity } from '@gorhom/bottom-sheet';
import Uv_sheet from "./other_condition/bottomsheet/Uv_sheet";
import Wind_sheet from "./other_condition/bottomsheet/Wind_sheet";
import Humidity_sheet from "./other_condition/bottomsheet/Humidity_sheet";
import Rain_sheet from "./other_condition/bottomsheet/Rain_sheet";
import Visibility_sheet from "./other_condition/bottomsheet/Visibility_sheet";

const OtherCondition = ({ local, temperature, language }) => {
    const [data, setData] = useState({});
    const [type, setType] = useState(0);


    const bottomSheetModalRef = useRef(null);
    const snapPoint = ['100%'];

    const handleModal = (id) => {
        bottomSheetModalRef.current?.present();
        setType(id);
    }

    useEffect(() => {
        forecast.getOtherForecast(local, temperature).then((response) => {
            setData(response);
            //console.log(response.vis_km);
        })
    }, [local, temperature])

    return (
        <BottomSheetModalProvider>
            <View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                }}>
                    <TouchableOpacity onPress={() => {handleModal(1)}}>
                        <UV uv={data.uv} start_time={data.start_time} finish_time={data.finish_time} language={language} />
                    </TouchableOpacity>

                    <Sun sunrise_time={data.sunrise_time} sunset_time={data.sunset_time} language={language} />
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                }}>
                    <TouchableOpacity onPress={() => {handleModal(2)}}>
                        {language == 'V' &&
                            <Wind wind_kph={data.wind_kph} wind_dir={dir[`${data.wind_dir}`]} language={language} />
                        }
                        {language !== 'V' &&
                            <Wind wind_kph={data.wind_kph} wind_dir={dirE[`${data.wind_dir}`]} language={language} />
                        }
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleModal(3)}}>
                        <Humidity humidity={data.humidity} dewpoint={data.dewpoint} language={language} temperature={temperature} />
                    </TouchableOpacity>
                </View>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    margin: 10,
                }}>
                    <TouchableOpacity onPress={() => {handleModal(4)}}>
                        <Rain totalprecip_mm={data.totalprecip_mm} rainchance={data.rainchance} language={language} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {handleModal(5)}}>
                    <Visibility vis_km={data.vis_km} language={language} />
                    </TouchableOpacity>
                </View>
                <View>
                    <BottomSheetModal
                        ref={bottomSheetModalRef}
                        index={0}
                        snapPoints={snapPoint}
                    >
                        {type == 1 && 
                            <Uv_sheet dataUV={data.hour} currentUV={data.uv} language={language}
                                start_time={data.start_time} finish_time={data.finish_time}/>
                        }
                        {type == 2 &&
                            <Wind_sheet data={data.hour} wind_kph={data.wind_kph} wind_dir={data.wind_dir} gust_kph={data.gust_kph}/>
                        }
                        {type == 3 && 
                            <Humidity_sheet dataHumidity={data.hour} currentHumidity={data.humidity} dewpoint={data.dewpoint}/>
                        }
                        {type == 4 && 
                            <Rain_sheet data={data.hour} totalprecip_mm={data.totalprecip_mm} rainchance={data.rainchance}/>
                        }
                        {type == 5 && 
                            <Visibility_sheet dataVisibility={data.hour} vis_km={data.vis_km} vis_miles={data.vis_miles}/>
                        }
                    </BottomSheetModal>
                </View>
            </View>
        </BottomSheetModalProvider>
    )
}

export default OtherCondition;