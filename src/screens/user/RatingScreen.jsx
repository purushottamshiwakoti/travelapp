import { View, Text, ScrollView, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { Appbar, Card, Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { apiUrl } from "../../lib/url";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../colors";

const RatingScreen = ({ token }) => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/rating`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { rating } = res.data;
        setData(rating);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [token]);

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <Appbar.Content title="Go Back" />
      </Appbar.Header>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          {data &&
            data.length > 0 &&
            data.map((item, index) => (
              <View style={{ marginVertical: 20 }} key={index}>
                <Card>
                  <Card.Cover source={{ uri: item.place?.image }} />
                  <Card.Content>
                    <Text variant="titleLarge" style={{ marginVertical: 10 }}>
                      {item.place?.name}
                    </Text>
                    <Text variant="bodyMedium">
                      Price: ${item.place?.price}
                    </Text>
                  </Card.Content>

                  <Card.Actions>
                    <Button>
                      Rating:
                      {Array.from(
                        { length: parseInt(item.rating, 10) },
                        (_, index) => (
                          <AntDesign
                            key={index}
                            name="star"
                            size={20}
                            color={Colors.primary}
                          />
                        )
                      )}
                    </Button>
                  </Card.Actions>
                </Card>
              </View>
            ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexGrow: 1, // Ensure that the content expands to fill the entire height of the ScrollView
  },
});

export default RatingScreen;
