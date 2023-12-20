import { StyleSheet, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Text, BottomNavigation } from "react-native-paper";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import MapListScreen from "./screens/MapListScreen";
import SettingsScreen from "./screens/SettingsScreen";
import RegisterScreen from "./screens/RegisterScreen";
import React, { useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "./services/Config";
import BottomTabBar from "./navigations/BottomTabBar";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { CommonActions } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export default function App() {
  const auth = getAuth(app);
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState(null);

  const onAuthStateChangedHandler = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);

    return unsubscribe;
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {user ? (
          <Tab.Navigator
              screenOptions={{
                headerShown: false,
                }}
                tabBar={({ navigation, state, descriptors, insets }) => (
                  <BottomNavigation.Bar
                    navigationState={state}
                    safeAreaInsets={insets}
                    onTabPress={({ route, preventDefault }) => {
                      const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                      });
          
                      if (event.defaultPrevented) {
                        preventDefault();
                      } else {
                        navigation.dispatch({
                          ...CommonActions.navigate(route.name, route.params),
                          target: state.key,
                        });
                      }
                    }}
              renderIcon={({ route, focused, color }) => {
              const { options } = descriptors[route.key];
              if (options.tabBarIcon) {
                return options.tabBarIcon({ focused, color, size: 24 });
              }

              return null;
            }}
            getLabelText={({ route }) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.title;

              return label;
            }}
          />
        )}
      >
            <Tab.Screen
              name="Home"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Home',
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="home" size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Map"
              component={MapListScreen}
              options={{
                tabBarLabel: 'Map',
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="map" size={size} color={color} />;
                },
              }}
            />
            <Tab.Screen
              name="Settings"
              component={SettingsScreen}
              options={{
                tabBarLabel: 'Settings',
                tabBarIcon: ({ color, size }) => {
                  return <Icon name="cog" size={size} color={color} />;
                },
              }}
            />
            
          </Tab.Navigator>
        ) : (
          <Tab.Navigator screenOptions={{ headerShown: false, tabBarStyle: { display: 'none' } }} >
            <Tab.Screen name="Login" component={LoginScreen}  />
            <Tab.Screen name="Register" component={RegisterScreen}  />
          </Tab.Navigator>
        )}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
});
