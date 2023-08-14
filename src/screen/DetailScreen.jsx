import {
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "../hooks/userUser";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../config/colors";
import { SPACING } from "../config/spacing";
import Ionicons from "@expo/vector-icons/Ionicons";

const screenHeight = Dimensions.get("screen").height;

export default function DetailScreen({ route }) {
  const { token } = useUser();
  const id = route.params;
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [isRemoving, setIsRemoving] = useState(false);

  const [viaje, setViaje] = useState({});

  const getViaje = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get(`/viajes/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setViaje(data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("Error en getViaje", error.response?.status, error.response?.data);
    }
  };

  useEffect(() => {
    isFocused && getViaje();
  }, [isFocused]);

  const deleteViaje = async () => {
    try {
      setIsRemoving(true);
      const { data } = await axios.delete(`/viajes/${viaje._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsRemoving(false);
      navigation.navigate("HomeScreen");
    } catch (error) {
      setIsRemoving(false);
      console.log("error en el deleteViaje", error.message);
    }
  };

  if (isLoading || isRemoving) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="red" size={80} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{ uri: viaje.imgUrl }} styles={styles.image} />
        </View>
      </View> 
      {/* arrgelar el error no muestra la imagen */}

      <View style={{ marginTop: 20 }}>
        <Text style={styles.title}>{viaje.title}</Text>
        <Text style={styles.subtitle}>{viaje.description}</Text>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.buttonRadius}
          onPress={() => navigation.navigate("ViajeScreen", viaje)}
        >
          <LinearGradient
            style={styles.gradient}
            colors={[colors["dark-gray"], colors.dark]}
          >
            <Ionicons
              name="create-outline"
              color={colors.light}
              size={SPACING * 2}
            />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonRadius}
          onPress={() => deleteViaje()}
        >
          <LinearGradient
            style={styles.gradient}
            colors={[colors["dark-gray"], colors.dark]}
          >
            <Ionicons
              name="trash-outline"
              color={colors.light}
              size={SPACING * 2}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
          style={styles.buttonRadius}
          onPress={() => navigation.goBack()}
        >
            <Ionicons
              name="arrow-back-outline"
              color={"white"}
              size={SPACING * 6}
            />
        </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    width: "100%",
    height: screenHeight * 0.7,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  imageBorder: {
    flex: 1,
    overflow: "hidden",
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },

  image: {
    flex: 1,
  },

  title: {
    color: colors.light,
    fontSize: SPACING * 2,
    fontWeight: "bold",
  },

  subtitle: {
    color: colors.light,
  },

  backButton: {
    position: "absolute",
    top: 30,
    left: 5,
  },

  buttonsContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignposts: "center",
  },

  buttonRadius: {
    overflow: "hidden",
    borderRadius: SPACING / 2,
  },

  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },
});
