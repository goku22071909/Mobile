import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { View, Text, Modal, ScrollView } from 'react-native';
import SearchInput from '../component/Setting_Component/SearchInput';
import Tab from '../component/Setting_Component/Tab';
import db from "../api/db";
import settingapi from "../api/settingapi";
import { AppContext } from "../provider/AppProvider";
import PopupSetting from "../component/Setting_Component/PopupSetting";

const Setting = () => {
    const[saves, setSaves] = useState([]);
    const { forceReload, language, temperature } = useContext(AppContext);

    useEffect(() => {
        db.getDBConnection().then(dbConnect => {
            dbConnect.transaction(tx => {
                tx.executeSql('SELECT * FROM saves', [], (_, results) => setSaves(results.rows._array));
            });
        });

    }, [forceReload]);
    //console.log(language);


    return(
        <View style={{ height: '100%', }}>
            <View style={{
                    marginTop: 80,
                    marginBottom: 30,
                    marginHorizontal:30,
                    flexDirection: 'row',
                    justifyContent:'space-between',
                    alignItems: 'center',
                }}>
                {   language == 'V' && 
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                    }}>
                        Thời tiết
                    </Text>
                }
                {   language !== 'V' && 
                    <Text style={{
                        fontSize: 30,
                        fontWeight: 'bold',
                    }}>
                        Weather
                    </Text>
                }
                <PopupSetting />
            </View>
            <SearchInput language={language}/>
            <View style={{ height: 525, }}>
                <ScrollView>
                    {
                        saves.map((item, index) => {
                            return (
                                <Tab key={index} 
                                    id={item.state_id}
                                    name={item.name}
                                    lat={item.lat}
                                    lon={item.lon}
                                    temperature={temperature}
                                    language={language}
                                />
                            )
                        })
                    }
                </ScrollView>
            </View>
        </View>
    )

}

export default Setting;