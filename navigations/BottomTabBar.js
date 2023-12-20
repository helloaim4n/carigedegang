
import * as React from 'react';
import { BottomNavigation, View } from 'react-native-paper';
import HomeScreen from '../screens/HomeScreen';
import MapListScreen from '../screens/MapListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const BottomTabBar = () => {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'home', title: 'Home', focusedIcon: 'heart', unfocusedIcon: 'heart-outline'},
        { key: 'map', title: 'Map', focusedIcon: 'map', unfocusedIcon: 'map-outline'},
        { key: 'setting', title: 'Setting', focusedIcon: 'bell', unfocusedIcon: 'bell-outline' },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        home: HomeScreen,
        map: MapListScreen,
        setting: SettingsScreen,
    });

    return (
        <View style={{backgroundColor: "white", height: '100%'}}>
            <BottomNavigation
                shifting={false}
                variant='secondary'
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                barStyle={{backgroundColor:'white'}}
                />
        </View>
    );
}

export default BottomTabBar;

// activeColor="red"
// barStyle={{ backgroundColor: '#1fa9e8'  }}