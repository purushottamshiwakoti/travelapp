import React, { useEffect, useState } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import {
  Text,
  Button,
  Card,
  TextInput,
  Portal,
  Modal,
  Avatar,
  Appbar,
  PaperProvider,
} from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { apiUrl } from "../lib/url";
import { Colors } from "../colors";
import Toast from "react-native-toast-message";

const PlaceDetail = ({ navigation, route }) => {
  const { id, userId } = route.params;
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [visibleFeedback, setVisibleFeedback] = useState(false);
  const [text, setText] = useState("");
  const [feedback, setFeedback] = useState("");

  const showModal = () => setVisible(true);
  const showFeedbackModal = () => setVisibleFeedback(true);
  const hideModal = () => setVisible(false);
  const hideFeedbackModal = () => setVisibleFeedback(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`${apiUrl}/places/${id}`);
        const { place } = res.data;
        setData(place);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const handleRating = async () => {
    try {
      const res = await axios.post(`${apiUrl}/rating`, {
        placesId: id,
        userId: userId,
        rating: text,
      });
      const { message } = res.data;
      Toast.show({
        type: "success",
        text1: message,
      });
      hideModal();
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  const handleFeedback = async () => {
    try {
      const res = await axios.post(`${apiUrl}/feedback`, {
        placesId: id,
        userId: userId,
        feedback: feedback,
      });
      const { message } = res.data;
      Toast.show({
        type: "success",
        text1: message,
      });
      hideFeedbackModal();
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigation.navigate("Home")} />
          <Appbar.Content title="Go Back" />
        </Appbar.Header>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {data && (
            <Card>
              <Card.Cover source={{ uri: data.image }} />
              <Card.Content>
                <View style={styles.titleContainer}>
                  <Text variant="titleLarge" style={styles.title}>
                    {data.name}
                  </Text>
                  <Button
                    style={{ marginTop: 2 }}
                    onPress={showModal}
                    mode="contained"
                    color={Colors.primary}
                  >
                    Rate
                  </Button>
                </View>
                <Text variant="bodyMedium">Price: ${data.price}</Text>
                <Text style={styles.description}>{data.description}</Text>
              </Card.Content>
              <Card.Actions>
                <Button
                  onPress={showFeedbackModal}
                  mode="outlined"
                  color={Colors.primary}
                >
                  Give Feedback
                </Button>
              </Card.Actions>
            </Card>
          )}
          {data && data.Rating.length > 0 && (
            <>
              <Text style={styles.ratingText}>Ratings:</Text>
              {data.Rating.map((item, index) => (
                <View style={styles.ratingContainer} key={index}>
                  <View style={styles.ratingStars}>
                    {Array.from(
                      { length: parseInt(item.rating, 10) },
                      (_, index) => (
                        <AntDesign
                          key={index}
                          name="star"
                          style={styles.starIcon}
                          size={24}
                          color={Colors.primary}
                        />
                      )
                    )}
                  </View>
                  <Text style={styles.ratingBy}>
                    Rated By: {item.user.fullName}
                  </Text>
                </View>
              ))}
            </>
          )}
          {data && data.Feedback.length > 0 && (
            <>
              <Text variant="bodyLarge" style={styles.feedbackTitle}>
                Feedbacks
              </Text>
              {data.Feedback.map((item, index) => (
                <View style={styles.feedbackContainer} key={index}>
                  <Text style={styles.feedbackText}>
                    FeedBack: {item.feedback}
                  </Text>
                  <Text style={styles.feedbackBy}>
                    Feedback By: {item.user.fullName}
                  </Text>
                </View>
              ))}
            </>
          )}
        </ScrollView>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modalContainer}
          >
            <TextInput
              label="Rating"
              value={text}
              onChangeText={setText}
              keyboardType="numeric"
              mode="outlined"
            />
            <Button onPress={handleRating}>Submit</Button>
          </Modal>
        </Portal>
        <Portal>
          <Modal
            visible={visibleFeedback}
            onDismiss={hideFeedbackModal}
            contentContainerStyle={styles.modalContainer}
          >
            <TextInput
              label="Feedback"
              value={feedback}
              onChangeText={setFeedback}
              mode="outlined"
              multiline
              numberOfLines={10}
            />
            <Button onPress={handleFeedback}>Submit</Button>
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.primary,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
  ratingContainer: {
    marginTop: 20,
  },
  ratingText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.primary,
    marginBottom: 5,
  },
  ratingStars: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  starIcon: {
    marginLeft: 5,
  },
  ratingBy: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  feedbackTitle: {
    color: Colors.primary,
    marginTop: 20,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "bold",
  },
  feedbackContainer: {
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 16,
  },
  feedbackBy: {
    fontSize: 14,
    color: Colors.darkGray,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 20,
  },
});

export default PlaceDetail;
