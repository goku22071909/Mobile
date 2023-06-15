import { useContext } from "react";
import { View, Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import { AppContext } from "../../../provider/AppProvider";

const Wind_sheet = ({ data, wind_kph, wind_dir, gust_kph }) => {

    const { language } = useContext(AppContext);
    var lineData = [];
    var lineData2 = [];

    for (var i = 0; i < 12; i++) {
        lineData[i] = { value: 0 };
        lineData2[i] = { value: 0 };
        lineData[i].value = data[i * 2].gust_kph;
        lineData2[i].value = data[i * 2].wind_kph;
    }

    return (
        <View>
            <View style={{
                marginHorizontal: 10,
                marginTop: 10,
                marginBottom: 30,
            }}>
                <View style={{
                    flexDirection: 'row',
                    marginBottom: 5,
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginRight: 10,
                    }}>{wind_kph} km/h</Text>
                    <Text style={{
                        fontSize: 24,
                        color: 'gray',
                    }}>{wind_dir}</Text>
                </View>
                {language == 'V' && <Text>Gió giật: {gust_kph}km/h</Text>}
                {language !== 'V' && <Text>Wind gust: {gust_kph}km/h</Text>}
            </View>
            <View>
                <LineChart
                    areaChart
                    curved
                    data={lineData}
                    data2={lineData2}
                    height={250}
                    showVerticalLines
                    spacing={30}
                    initialSpacing={0}
                    color1="skyblue"
                    color2="orange"
                    textColor1="green"
                    hideDataPoints
                    dataPointsColor1="blue"
                    dataPointsColor2="red"
                    startFillColor1="skyblue"
                    startFillColor2="orange"
                    startOpacity={0.8}
                    endOpacity={0.3}
                />
            </View>
            <View style={{
                marginHorizontal: 30,
            }}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'skyblue',
                        marginRight: 20,
                    }} />
                    {language == 'V' && <Text>Tốc độ gió giật cả ngày</Text>}
                    {language !== 'V' && <Text>Wind gusts all day</Text>}
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10, }}>
                    <View style={{
                        width: 20,
                        height: 20,
                        backgroundColor: 'orange',
                        marginRight: 20,
                    }} />
                    {language == 'V' && <Text>Tốc độ gió cả ngày</Text>}
                    {language !== 'V' && <Text>Wind speed all day</Text>}
                </View>
            </View>
            {language == 'V' &&
                <View style={{
                    margin: 20,
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}>
                        Giới thiệu về tốc độ gió
                    </Text>
                    <View style={{
                        marginVertical: 10,
                        backgroundColor: '#FDE2CA',
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            margin: 20,
                        }}>Tốc độ gió được tính toán bằng giá trị trung bình trong một khoảng thời gian ngắn.
                            Gió giật là sự gia tăng đột ngột ngắn của gió ở trên giá trị trung bình này. Một cơn gió
                            giật thường kéo dài dưới 20 giây.
                        </Text>
                    </View>
                </View>
            }
            {language !== 'V' &&
                <View style={{
                    margin: 20,
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}>
                        About wind speed
                    </Text>
                    <View style={{
                        marginVertical: 10,
                        backgroundColor: '#FDE2CA',
                        borderRadius: 10,
                    }}>
                        <Text style={{
                            margin: 20,
                        }}>Wind speed is calculated using the average value over a short period of time. A gust is a short sudden increase in wind above this mean. A gust usually lasts less than 20 seconds.
                        </Text>
                    </View>
                </View>
            }
        </View>

    );
}

export default Wind_sheet;