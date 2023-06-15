import { Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { useContext } from 'react';
import { AppContext } from '../../../provider/AppProvider';
const screenWidth = Dimensions.get("window").width;

const Humidity_sheet = ({ dataHumidity, currentHumidity, dewpoint }) => {

    const { language, temperature } = useContext(AppContext);
    //console.log(language);
    const id = [0, 6, 12, 18, 23];
    var humidity = [];
    for (var i = 0; i < 5; ++i) {
        humidity[i] = dataHumidity[id[i]].humidity;
    }

    const data = {
        labels: ["00:00", "06:00", "12:00", "18:00", "23:00"],
        datasets: [
            {
                data: humidity,
                color: (opacity = 1) => `rgba(241, 90, 34, ${opacity})`, // optional

            }
        ],
        legend: language == 'V' ? ["Độ ẩm"] : ["Humidity"]// optional
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
                }}>{currentHumidity}%</Text>
                {   language == 'V' &&
                    <Text style={{
                        marginBottom: 20,
                        marginHorizontal: 20,
                        color: 'gray'
                    }}>Độ ẩm hiện tại</Text>
                }
                {   language !== 'V' &&
                    <Text style={{
                        marginBottom: 20,
                        marginHorizontal: 20,
                        color: 'gray'
                    }}>Current humidity</Text>
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
                        <Text>Hiện tại độ ẩm là {currentHumidity}% . Nhiệt độ hóa sương hiện tại là {dewpoint}°{temperature}</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 20,

                        }}>
                            Giới thiệu về độ ẩm
                        </Text>
                        <View style={{
                            backgroundColor: '#FDE2CA',
                            borderRadius: 10,
                            marginTop: 10,
                        }}>
                            <Text style={{
                                marginHorizontal: 12,
                                marginTop: 12,
                                marginBottom: 5,
                            }}>
                                Độ ẩm tương đối, thường được gọi đơn giản là độ ẩm, là lượng hơi ẩm có trong không khí so với lượng hơi ẩm mà không khí có thể lưu giữ. Không khí có thể lưu giữ nhiều hơi ẩm ở nhiệt độ cao hơn. Độ ẩm tương đối gần 100% nghĩa là có thể có sương hoặc sương mù.
                            </Text>
                            <Text style={{
                                 marginHorizontal: 12,
                                 marginBottom: 12,
                            }}>
                                Điểm sương là ngưỡng mà nhiệt độ cần giảm xuống để hình thành sương.
                            </Text>
                        </View>
                    </>
                }
                {language == 'E' &&
                    <>
                        <Text>Currently the humidity is {currentHumidity}% . The current dewpoint temperature is {dewpoint}°{temperature}</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 20,

                        }}>
                            About humidity
                        </Text>
                        <View style={{
                            backgroundColor: '#FDE2CA',
                            borderRadius: 10,
                            marginTop: 10,
                        }}>
                            <Text style={{
                                marginHorizontal: 12,
                                marginTop: 12,
                                marginBottom: 5,
                            }}>
                                Relative humidity, often simply referred to as humidity, is the amount of moisture present in the air relative to the amount of moisture the air can hold. Air can hold more moisture at higher temperatures. Relative humidity near 100% means fog or mist is possible.
                            </Text>
                            <Text style={{
                                 marginHorizontal: 12,
                                 marginBottom: 12,
                            }}>
                                The dew point is the threshold at which the temperature needs to drop to form dew.
                            </Text>
                        </View>
                    </>
                }
            </View>
        </View>
    )

}

export default Humidity_sheet;