import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import Toast from "react-native-toast-message";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./src/screens/user/HomeScreen";
import PlaceDetail from "./src/components/PlaceDetail";
import RatingScreen from "./src/screens/user/RatingScreen";
import FeedbackScreen from "./src/screens/user/FeedbackScreen";
import ProfileScreen from "./src/screens/user/ProfileScreen";
import LoginScreen from "./src/screens/auth/LoginScreen";
import RegisterScreen from "./src/screens/auth/RegisterScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    checkAuthentication();
  }, [isAuth]);

  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      console.log({ token });
      if (token) {
        setIsAuth(true);
        setToken(token);
      } else {
        setIsAuth(false);
        setToken(null);
      }
    } catch (error) {
      console.error("Error retrieving token:", error);
    }
  };

  const handleLogout = async () => {
    try {
      alert("hello");
      await AsyncStorage.removeItem("token");
      setIsAuth(false);
      setToken(null);
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };
  console.log(isAuth);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <>
            <Stack.Screen name="Home">
              {(props) => <TabNav {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
            <Stack.Screen name="Rating">
              {(props) => <RatingScreen {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="Feedback">
              {(props) => <FeedbackScreen {...props} token={token} />}
            </Stack.Screen>
            <Stack.Screen name="Profile">
              {(props) => <ProfileScreen {...props} onLogout={handleLogout} />}
            </Stack.Screen>
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
      <Toast />
    </NavigationContainer>
  );
}

const TabNav = ({ token }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home">
        {(props) => <HomeScreen {...props} token={token} />}
      </Tab.Screen>
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
