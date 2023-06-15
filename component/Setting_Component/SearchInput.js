import Icon from 'react-native-vector-icons/FontAwesome';
import { Text, TextInput, View} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useEffect, useState } from 'react';
import db from '../../api/db';
import { Dropdown } from 'react-native-element-dropdown';

const SearchInput = ({language}) => {
    const navigation = useNavigation();
    const [search, setSearch] = useState('');
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('Australia');
    const [states, setState] = useState([]);
    const [selectedState, setSelectedState] = useState('Hà Nội');

   // console.log(language);

    useEffect(() => {
        db.getDBConnection()
            .then(dbConnect => {
                dbConnect.transaction(tx => {
                    tx.executeSql('SELECT * FROM countries', [], (_, results) => {
                        setCountries(results.rows._array);
                        setSelectedCountry(results.rows._array.find(item => item.name === 'Australia'));
                    })
                })
            })

    }, []);

    useEffect(() => {
        db.getDBConnection()
            .then(dbConnect => {
                dbConnect.transaction(tx => {
                    tx.executeSql('SELECT * FROM states WHERE country_id = ?', [selectedCountry.id], (_, results) => {
                        setState(results.rows._array);
                        setSelectedState(results.rows._array.find(item => item.name === 'Hanoi'))
                    })
                })
            })
    }, [selectedCountry]);

    return (
        <View style={{
            flexDirection: 'column',
            paddingHorizontal: 20,
            paddingTop: 20,
            paddingBottom: 10,
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
        }}>
            <Dropdown 
                style={{
                    width: 370,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 8
                }}
                maxHeight={300}

                data={countries}
                valueField={'name'}
                labelField={'native'}
                placeholder={language == 'V'? 'Chọn quốc gia' : 'Choose a country'}
                value={selectedCountry}
                onChange={(value) => {
                    setSelectedCountry(value)
                }}
                mode={"default"}
                width={370}
                search={true}
                searchPlaceholder={language == 'V'? 'Tìm quốc gia' : 'Find a country'}
                searchField={'name'}
                searchDebounceDelay={300}
                renderLeftIcon={() => <Icon style={{ marginRight: 20, }} name="globe" size={20} color={'#FFCC99'} />}
            />

            <Dropdown 
                style={{
                    width: 370,
                    borderColor: 'gray',
                    borderWidth: 1,
                    borderRadius: 8,
                    padding: 8
                }}
                maxHeight={300}

                data={states}
                valueField={'name'}
                labelField={'name'}
                placeholder={language == 'V'? 'Chọn tỉnh thành' : 'Choose a city'}
                value={selectedState}
                onChange={(value) => {
                   // console.log(value);
                    setSelectedState(value);
                    navigation.navigate('Details', { id: value.id, name: value.name, lat: value.latitude, lon: value.longitude });
                }}
                mode={"default"}
                width={370}
                search={true}
                searchPlaceholder={language == 'V'? 'Tìm tỉnh thành' : 'Find a city'}
                searchField={'name'}
                searchDebounceDelay={300}
                renderLeftIcon={() => <Icon style={{ marginRight: 20, }} name="search" size={20} color={'#FFCC99'} />}
            />
           
        </View>
    )
}

export default SearchInput;