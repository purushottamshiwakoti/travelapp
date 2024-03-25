import { ScrollView, View } from "react-native";
import React from "react";
import { Avatar, Button, Card, Text } from "react-native-paper";
import { Colors } from "../colors";
import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

const TravelPlaces = ({ data, userId }) => {
  const navigation = useNavigation(); // Initialize navigation

  return (
    <View
      style={{
        marginTop: 10,
      }}
    >
      <View>
        <Text
          variant="titleLarge"
          style={{ color: Colors.primary, textTransform: "capitalize" }}
        >
          adventures in Nepal
        </Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {!data && (
          <View>
            <Text>No places found</Text>
          </View>
        )}
        {data &&
          data.map((item, index) => (
            <View style={{ marginVertical: 20 }} key={index}>
              <Card>
                <Card.Cover source={{ uri: item.image }} />
                <Card.Content>
                  <Text variant="titleLarge" style={{ marginVertical: 10 }}>
                    {item.name}
                  </Text>
                  <Text variant="bodyMedium">Price: ${item.price}</Text>
                </Card.Content>

                <Card.Actions>
                  <Button
                    onPress={() =>
                      navigation.navigate("PlaceDetail", {
                        id: item.id,
                        userId: userId,
                      })
                    }
                  >
                    View
                  </Button>
                </Card.Actions>
              </Card>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default TravelPlaces;
