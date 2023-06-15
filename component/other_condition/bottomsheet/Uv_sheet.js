import { Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { useContext } from 'react';
import { AppContext } from '../../../provider/AppProvider';
const screenWidth = Dimensions.get("window").width;

const Uv_sheet = ({ dataUV, currentUV, start_time, finish_time }) => {

    const { language } = useContext(AppContext);
    //console.log(language);
    let level = '';
    if (currentUV < 3) level = language == 'V' ? 'Thấp' : 'Low';
    else if (currentUV < 6) level = language == 'V' ? 'Trung bình' : 'Medium';
    else if (currentUV < 8) level = language == 'V' ? 'Cao' : 'High';
    else if (currentUV < 11) level = language == 'V' ? "Rất cao" : 'Very High';
    else level = language == 'V' ? 'Cực kì cao' : 'Extremely high';

    const id = [0, 6, 12, 18, 23];
    var uv = [];
    for (var i = 0; i < 5; ++i) {
        uv[i] = dataUV[id[i]].uv;
    }

    const data = {
        labels: ["00:00", "06:00", "12:00", "18:00", "23:00"],
        datasets: [
            {
                data: uv,
                color: (opacity = 1) => `rgba(241, 90, 34, ${opacity})`, // optional

            }
        ],
        legend: language == 'V' ? ["Chỉ số UV"] : ["UV index"]// optional
    };

    const chartConfig = {
        backgroundGradientFrom: "#ffffff",
        backgroundGradientTo: "#ffffff",
        color: (opacity = 1) => `rgba(241, 90, 34, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        //strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        useShadowColorFromDataset: false // optional
    };

    return (
        <View>
            <View>
                <Text style={{
                    //marginTop: 10,
                    marginTop: 10,
                    marginBottom: 5,
                    marginHorizontal: 40,
                    fontSize: 40,
                    fontWeight: 'bold'
                }}>{currentUV}</Text>
                {   language == 'V' &&
                    <Text style={{
                        marginBottom: 20,
                        marginHorizontal: 20,
                        color: 'gray'
                    }}>Chỉ số UV hiện tại</Text>
                }
                {   language !== 'V' &&
                    <Text style={{
                        marginBottom: 20,
                        marginHorizontal: 20,
                        color: 'gray'
                    }}>Current UV Index</Text>
                }
            </View>
            <View style={{
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: '100%'
            }}>
                <LineChart
                    data={data}
                    width={screenWidth * 0.9}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                />
            </View>
            <View style={{
                marginHorizontal: 20,
                marginVertical: 30,
            }}>
                {language == 'V' &&
                    <>
                        <Text>Hiện tại mức độ UV ở mức {level}. Nên tránh ra ngoài vào khoảng thời gian từ {start_time} đến {finish_time}.</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 20,

                        }}>
                            Giới thiệu về chỉ số UV
                        </Text>
                        <View style={{
                            backgroundColor: '#FDE2CA',
                            borderRadius: 10,
                            marginTop: 10,
                        }}>
                            <Text style={{
                                margin: 12,
                            }}>
                                Chỉ số UV(UVI) của Tổ chức Y tế Thế Giới đo mức bức xạ cực tím. UVI càng cao thì khả năng gây hại càng lớn và tốc dộ xảy ra tổn thương càng nhanh. UVI có thể giúp bạn quyết định khi nào cần tự bảo vệ khỏi ánh nắng mặt trời và khi nào cần tránh ra ngoài trời. WHO khuyến cáo sử dụng mũ, kem chống năng, nón và quần áo bảo vệ ở mức 3 (Trung bình) trở lên.
                            </Text>
                        </View>
                    </>
                }
                {language == 'E' &&
                    <>
                        <Text>Currently the UV level is at {level}. Avoid going out between {start_time} and {finish_time}.</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 20,

                        }}>
                            About UV index
                        </Text>
                        <View style={{
                            backgroundColor: '#FDE2CA',
                            borderRadius: 10,
                            marginTop: 10,
                        }}>
                            <Text style={{
                                margin: 12,
                            }}>
                                The World Health Organization's UV Index (UVI) measures ultraviolet radiation levels. The higher the UVI, the greater the potential for damage and the faster the rate of damage. UVI can help you decide when to protect yourself from the sun and when to stay out of the sun. WHO recommends the use of hats, sunscreen, hats and protective clothing at level 3 (Moderate) or higher.
                            </Text>
                        </View>
                    </>
                }
            </View>
        </View>
    )

}

export default Uv_sheet;