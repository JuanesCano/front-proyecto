import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import MenuUser from "../hooks/MenuUser";
import axios from "axios";

export default function CuentaScreen({ route }) {
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const user = route.params;

  const [name, setName] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const actualizarCuenta = async (values, formikActions) => {
    try {
      const { name, email, password } = values;
      const formData = new FormData();

      formData.append("email", email);
      formData.append("password", password);
      formData.append("name", name);
      setIsLoading(true);

      await axios.put(`/user/${user._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);
      formikActions.resetForm();
      formikActions.setSubmitting(false);
    } catch (error) {
      console.log("error en el actualizar cuenta", error.message);
    }
  };

  const eliminarCuenta = async () => {
    try {
      setIsLoading(true);

      await axios.delete(`/user/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log("error al eliminar la cuenta", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={actualizarCuenta}
        style={{ ...styles.menuItem, bottom: 40 }}
      >
        <AntDesign name="edit" size={80} color="#c9d1d9" />
        <Text style={styles.menuText}>Actualizar mi cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={eliminarCuenta}
        style={{ ...styles.menuItem, top: 50 }}
      >
        <AntDesign name="delete" size={80} color="#c9d1d9" />
        <Text style={styles.menuText}>Eliminar cuenta</Text>
      </TouchableOpacity>

      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <View style={styles.menuUserContainer}>
        <MenuUser />
      </View>
    </View>
  );
}

// const deleteViaje = async () => {
//     try {
//       setIsRemoving(true);
//       const { data } = await axios.delete(`/viajes/${viaje._id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setIsRemoving(false);
//       navigation.navigate("HomeScreen");
//     } catch (error) {
//       setIsRemoving(false);
//       console.log("error en el deleteViaje", error.message);
//     }
//   };

// const [isLoading, setIsLoading] = useState(true);
//   const [isRemoving, setIsRemoving] = useState(false);

// if (isLoading || isRemoving) {
//     return (
//       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//         <ActivityIndicator color="red" size={80} />
//       </View>
//     );
//   }

//   const actions = async (values, formikActions) => {
//     viaje
//       ? await updateViaje(values, formikActions)
//       : await saveViaje(values, formikActions);

//     navigation.goBack();
//   };

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

  menuUserContainer: {
    position: "absolute",
    right: 0,
    top: -15,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  formContainer: {
    padding: 20,
    backgroundColor: "#f0f0f0", 
    borderRadius: 10,
    marginTop: 20,
  },
});
