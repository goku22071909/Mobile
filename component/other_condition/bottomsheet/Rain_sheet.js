import { BarChart } from "react-native-gifted-charts";
import { Text, View } from "react-native";
import { useContext } from "react";
import { AppContext } from "../../../provider/AppProvider";

const Rain_sheet = ({ data, totalprecip_mm, rainchance }) => {
    const { language } = useContext(AppContext);

    var barData = [
        { value: 250, label: '00:00' },
        { value: 320, label: '06:00' },
        { value: 256, label: '12:00' },
        { value: 300, label: '18:00' },
        { value: 300, label: '23:00' },
    ];

    const id = [0, 6, 12, 18, 23];
    for (var i = 0; i < 5; ++i) {
        barData[i].value = data[id[i]].precip_mm;
    }
    //console.log(data.data[0].precip_mm);

    return (
        <View>
            <View style={{
                margin: 20,
            }}>
                <Text style={{
                    fontSize: 40,
                    fontWeight: 'bold',
                }}>{totalprecip_mm}mm</Text>
                {language == 'V' && <Text>Tổng lượng mưa trong ngày</Text>}
                {language !== 'V' && <Text>Total rainfall for the day</Text>}
            </View>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <BarChart
                    width={300}
                    height={370}
                    barWidth={30}
                    noOfSections={10}
                    barBorderRadius={4}
                    frontColor="#FFCC99"
                    data={barData}
                    yAxisThickness={0}
                    xAxisThickness={0}
                />
            </View>
            {language == 'V' &&
                <View style={{
                    marginTop: 35,
                    marginHorizontal: 20,
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}>
                        Tổng quan trong ngày
                    </Text>
                    <View style={{
                        backgroundColor: '#FDE2CA',
                        borderRadius: '10',
                        marginTop: 5,
                    }}>
                        <Text style={{
                            margin: 10,
                        }}>Tổng lượng mưa trong ngày sẽ đạt {totalprecip_mm}mm. Theo như dự báo, khả năng có mưa trong ngày {rainchance}%.</Text>
                    </View>
                </View>
            }
            {language !== 'V' &&
                <View style={{
                    marginTop: 35,
                    marginHorizontal: 20,
                }}>
                    <Text style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                    }}>
                        Overview of the day
                    </Text>
                    <View style={{
                        backgroundColor: '#FDE2CA',
                        borderRadius: '10',
                        marginTop: 5,
                    }}>
                        <Text style={{
                            margin: 10,
                        }}>Total precipitation for the day will reach {totalprecip_mm}mm. According to forecast, chance of rain during the day {rainchance}%.</Text>
                    </View>
                </View>
            }
        </View>
    );
};

export default Rain_sheet;