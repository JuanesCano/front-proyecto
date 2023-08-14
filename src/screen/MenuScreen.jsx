import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../hooks/userUser";
import { AntDesign } from "@expo/vector-icons"; // Importar el conjunto de íconos que prefieras

export default function MenuScreen() {
  const navigation = useNavigation();
  const { exit } = useUser();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={styles.menuItem}
      >
        <AntDesign name="home" size={24} color="#c9d1d9" />
        <Text style={styles.menuText}>Mis viajes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ViajeScreen")}
        style={styles.menuItem}
      >
        <AntDesign name="plus" size={24} color="#c9d1d9" />
        <Text style={styles.menuText}>Agregar un nuevo viaje</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("SugerenciaScreen")}
        style={styles.menuItem}
      >
        <AntDesign name="bulb1" size={24} color="#c9d1d9" />
        <Text style={styles.menuText}>Sugerencias</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ViajeScreen")}
        style={styles.menuItem}
      >
        <AntDesign name="eye" size={24} color="#c9d1d9" />
        <Text style={styles.menuText}>Ver todos los viajes</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("ViajeScreen")}
        style={styles.menuItem}
      >
        <AntDesign name="hearto" size={24} color="#c9d1d9" />
        <Text style={styles.menuText}>Mis favoritos</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("CuentaScreen")}
        style={styles.menuItem}
      >
        <AntDesign name="user" size={24} color="#c9d1d9" />
        <Text style={styles.menuText}>Ver mi cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => exit()} style={styles.menuItem}>
        <AntDesign name="logout" size={24} color="#c9d1d9" />
        <Text style={styles.menuText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  menuText: {
    color: "#c9d1d9",
    fontSize: 18,
    marginLeft: 10,
  },
});
