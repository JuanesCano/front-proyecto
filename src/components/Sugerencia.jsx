import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SPACING } from "../config/spacing";
import { colors } from "../config/colors";

export default function Sugerencia({ sugerencia }) {
  const navigation = useNavigation();
  return (
    <LinearGradient
      key={sugerencia._id}
      colors={[colors["dark-gray"], colors.black]}
      style={styles.gradient}
    >
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: sugerencia.imgUrl }}
      />
      <View style={styles.header}>
      <View style={styles.titleRight}>
        <Text style={styles.title}>{sugerencia.titulo}</Text>
        <Text style={styles.subtitle}>{sugerencia.descripcion}</Text>
      </View>
      {/* <View style={styles.buttonContainer}> */}
        <TouchableOpacity
          style={styles.buttonRadius}
          onPress={() => navigation.navigate("")}
        >
          <LinearGradient
            style={styles.gradientTwo}
            colors={[colors["blue"], colors.blue]}
          >
            <Ionicons name="heart" color={colors.blue} size={30} style={styles.icon}/>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: 300,
    borderRadius: SPACING,
    padding: SPACING * 5,
    marginBottom: SPACING * 5,
  },
  image: {
    width: "100%",
    height: 160,
    marginBottom: SPACING
  },
  title: {
    color: colors.light,
    fontSize: SPACING * 2,
    fontWeight: "700",
    marginBottom: SPACING,
  },
  subtitle: {
    color: colors.light,
    marginTop: SPACING / 2,
  },
  buttonContainer: { alignItems: "center" },
  buttonRadius: {
    overflow: "hidden",
    borderRadius: SPACING / 2,
    alignItems: "center",
    left: 35
  },
  gradientTwo: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },

  header:{
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    fontSize: 25,
    color: "white",
  },
  buttonCenter:{
    top: 150,
  },
  irViajes:{
    fontSize: 18, 
    color: "white",
    backgroundColor: "#4EB759",
    borderRadius: 10,
    padding: 18,
    paddingRight: 30,
    paddingLeft: 30
  },
  buttonViaje:{
    overflow: "hidden",
    borderRadius: SPACING / 2,
    alignItems: "center",
  },
  titleRight:{
    right: 25
  }
});