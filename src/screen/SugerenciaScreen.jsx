import {
  Dimensions,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Button } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import axios from "axios";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { SPACING } from "../config/spacing";
import { colors } from "../config/colors";
import Sugerencia from "../components/Sugerencia";
import { useUser } from "../hooks/userUser";
import MenuUser from "../hooks/MenuUser";

import Carousel from 'react-native-snap-carousel';

const { width: windowWidth } = Dimensions.get("window");

export default function SugerenciaScreen() {
  const navigation = useNavigation();


  const { exit, token } = useUser();
  const [sugerencia, setSugerencias] = useState([]);
  const isFocused = useIsFocused();
  const [isLogin, setIsLogin] = useState(false);
  const { top } = useSafeAreaInsets();

  const getSugerencia = async () => {
    try {
      setIsLogin(true);
      const { data } = await axios.get("/sugerencia", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log(data.data);
      setSugerencias(data.data);
    } catch (error) {
      console.log("error en el getSugerencia", error.message);
    }
  };

  useEffect(() => {
    isFocused && getSugerencia();
  }, [isFocused]);

  return (
    <>
      <View style={{ ...styles.container, top: top + 20 }}>
      </View>
      <View style={{ ...styles.container, top }}>
        <Text style={styles.title}>Destino Camino</Text>
        <Text style={styles.subtitle}>
          Sugerencias para ti!
        </Text>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Carousel
          data={sugerencia}
          renderItem={({ item }) => <Sugerencia sugerencia={item} />}
          sliderWidth={windowWidth}
          itemWidth={windowWidth}
          layout="default"
          loop
          autoplay
          autoplayInterval={4000}
        />

        <View style={styles.menuUserContainer}>
          <MenuUser />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 90,
  },
  button: {
    overflow: "hidden",
    borderRadius: 5,
    position: "absolute",
    right: 0,
  },

  buttonDetail: {
    color: "white",
  },

  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },

  icon: {
    fontSize: 25,
    color: "white",
  },
  title: {
    color: colors.white,
    fontSize: SPACING * 5,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.light,
    marginTop: SPACING / 2,
    fontSize: 25
  },

  menuUserContainer: {
    position: "absolute",
    bottom: 115,
    right: -5,
    top: -130,
  },
});
