import { Text, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from "react-native";
import { useContext } from 'react';
import { AppContext } from '../../../provider/AppProvider';
const screenWidth = Dimensions.get("window").width;

const Visibility_sheet = ({ dataVisibility, vis_km, vis_miles}) => {

    const { language } = useContext(AppContext);
    //console.log(language);
    let level = '';
    if (vis_miles < 1) level = language == 'V' ? 'Sương mù' : 'fog';
    else if (vis_miles < 2) level = language == 'V' ? 'Có hơi mù' : 'Haze';
    else if (vis_miles < 5.5) level = language == 'V' ? 'Hơi sương mỏng' : 'Light haze';
    else if (vis_miles < 11) level = language == 'V' ? "Nhìn rõ" : 'Clear';
    else if (vis_miles < 27) level = language == 'V' ? "Nhìn hoàn toàn rõ" : 'Very clear';
    else level = language == 'V' ? 'Đặc biệt rõ ràng' : 'Exceptionally clear';

    const id = [0, 6, 12, 18, 23];
    var dataV = [];
    for (var i = 0; i < 5; ++i) {
        dataV[i] = dataVisibility[id[i]].vis_km;
    }

    const data = {
        labels: ["00:00", "06:00", "12:00", "18:00", "23:00"],
        datasets: [
            {
                data: dataV,
                color: (opacity = 1) => `rgba(241, 90, 34, ${opacity})`, // optional

            }
        ],
        legend: language == 'V' ? ["Tầm nhìn"] : ["Visibility"]// optional
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
                }}>{vis_km}km</Text>
                {   language == 'V' &&
                    <Text style={{
                        marginBottom: 20,
                        marginHorizontal: 20,
                        color: 'gray'
                    }}>Tầm nhìn hiện tại</Text>
                }
                {   language !== 'V' &&
                    <Text style={{
                        marginBottom: 20,
                        marginHorizontal: 20,
                        color: 'gray'
                    }}>Current visibility</Text>
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
                    height={250}
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
                        <Text>Hiện tại mức độ tầm nhìn ở mức {level}.</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 20,

                        }}>
                            Giới thiệu về tầm nhìn
                        </Text>
                        <View style={{
                            backgroundColor: '#FDE2CA',
                            borderRadius: 10,
                            marginTop: 10,
                        }}>
                            <Text style={{
                                margin: 12,
                            }}>
                                Tầm nhìn cho biết khoảng cách mà bạn có thể nhìn rõ các vật thể như tòa nhà và đồi núi. Đó là một số đo về độ trong suốt của không khí và không tính đến lượng ánh sáng mặt trời hoặc sự hiện diện của các vật cản. Tầm nhìn bằng hoặc trên 10km được coi là rõ.
                            </Text>
                        </View>
                    </>
                }
                {language == 'E' &&
                    <>
                        <Text>Currently the visibility level is at {level}.</Text>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: 'bold',
                            marginTop: 20,

                        }}>
                            About visibility
                        </Text>
                        <View style={{
                            backgroundColor: '#FDE2CA',
                            borderRadius: 10,
                            marginTop: 10,
                        }}>
                            <Text style={{
                                margin: 12,
                            }}>
                                Visibility indicates the distance at which you can clearly see objects such as buildings and hills. It's a measure of air transparency and doesn't take into account the amount of sunlight or the presence of obstructions. Visibility equal to or above 10km is considered clear.
                            </Text>
                        </View>
                    </>
                }
            </View>
        </View>
    )

}

export default Visibility_sheet;