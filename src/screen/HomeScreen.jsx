import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useUser } from "../hooks/userUser";
import { colors } from "../config/colors";
import { SPACING } from "../config/spacing";
import axios from "axios";
import Viaje from "../components/viaje";
import MenuUser from "../hooks/MenuUser";

export default function HomeScreen() {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const { top } = useSafeAreaInsets();
  const [viaje, setViajes] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { exit, token } = useUser();

  const getViajes = async () => {
    try {
      const { data } = await axios.get("/viajes/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setViajes(data.data);
    } catch (error) {
      console.log("Error en el getPosts", error.message);
    }
  };

  // const getViajes = async () => {
  //   try {
  //     const {data} = await axios.get("/viajes/user", {headers: {Authorization: `Bearer ${token}`}});
  //     setViajes(data.data)
  //   } catch (error) {
  //     console.log("Error en el getPosts", error.message);
  //   }
  // }; hacer el de obtener todos

  useEffect(() => {
    isFocused && getViajes();
  }, [isFocused]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getViajes();
    setIsRefreshing(false);
  }, []);

  return (
    <>
      <View style={{ ...styles.container, top: top + 15 }}>
        <Text style={styles.title}>Destino Camino</Text>
        <Text style={styles.subtitle}>Mis Viajes</Text>

        <MenuUser/>
      </View>

      <FlatList
        data={viaje}
        renderItem={({ item }) => <Viaje viaje={item} />}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            colors={[colors.light]}
            progressBackgroundColor={colors["dark-gray"]}
          />
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
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
});
