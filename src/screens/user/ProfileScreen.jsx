import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../../colors";
import { Button } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const ProfileScreen = ({ onLogout }) => {
  const navigation = useNavigation();
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }], // Navigate to the Login screen after logout
      });
    } catch (error) {
      console.log("Error removing token:", error);
      // Handle error (e.g., display an error message)
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Hello User</Text>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => navigation.navigate("Rating")}
        >
          My Ratings
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          onPress={() => navigation.navigate("Feedback")}
        >
          My Feedbacks
        </Button>
        <Button
          mode="outlined"
          style={styles.button}
          icon={"logout"}
          onPress={handleLogout} // Call handleLogout function on press
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: "center",
    width: "80%", // Adjust the width as needed
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    width: "100%", // Make the buttons occupy full width
  },
});

export default ProfileScreen;
