import { ScrollView, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text } from "react-native-paper";
import { Colors } from "../../colors";
import { Searchbar } from "react-native-paper";
import TravelPlaces from "../../components/TravelPlaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { apiUrl } from "../../lib/url";

const HomeScreen = ({ token }) => {
  console.log("hometoken", token);
  const navigation = useNavigation();
  const [user, setUser] = useState();
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/places`);
        const { place } = res.data;
        setData(place);
      } catch (error) {
        console.log(error);
      }
    };
    const getMe = async () => {
      try {
        const res = await axios.get(`${apiUrl}/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { userData } = res.data;

        setUser(userData);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
    getMe();
  }, [token]);

  return (
    <SafeAreaView>
      <View
        style={{
          marginHorizontal: 10,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 10,
          }}
        >
          <Text variant="headlineMedium">Hello</Text>
          <Text
            variant="headlineMedium"
            style={{ color: Colors.primary, marginLeft: 10 }}
          >
            {user && user.fullName}
          </Text>
        </View>
        <View style={{ marginTop: 10 }}>
          <Searchbar
            placeholder="Search places here..."
            onChangeText={setSearchQuery}
            value={searchQuery}
          />
        </View>
        <View>
          <TravelPlaces data={filteredData} userId={user && user.id} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
