import { Image, Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../hooks/userUser';
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string()
  .trim()
  .required("correo es requerido")
  .email("Ingresa un correo valido"),

  password: Yup.string()
  .trim()
  .min(3, "La contraseña debe tener al menos 6 caracteres")
  .required("La contraseña es requerida")
})

export default function LoginScreen() {
  const navigation = useNavigation();

  const { login } = useUser();

  const [formulario, setFormulario] = useState({
    email: "juan@gmail.comm",
    password: "1234",
  });

  const handleChange = (value, name) => {
    setFormulario({...formulario, [name]: value})
  };

  const handleSubmit = async () => {
    await validationSchema.validate(formulario, {abortEarly: false})
    await login(formulario);
  };


  return (
   <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style = {styles.container}>
      <Image style = {styles.logo}
      source = {require("../../assets/viajes-proyecto.png")}/>
      
      <View style = {styles.inputView}>
        <TextInput style = {styles.inputText}
        placeholder='Email'
        placeholderTextColor="#c9d1d9"
        onChangeText={(value) => handleChange(value, "email")}
        value = {formulario.email}/>
      </View>

      <View style = {styles.inputView}>
        <TextInput secureTextEntry
        style = {styles.inputText}
        placeholder='Password'
        placeholderTextColor="#c9d1d9"
        onChangeText={(value) => handleChange(value, "password")}
        value = {formulario.password}/>
      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style = {styles.register}>
        ¿Aún no tienes una cuenta? registrate
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style = {styles.loginBtn} onPress={handleSubmit}>
        <Text style = {styles.loginText}>Iniciar sesión</Text>
      </TouchableOpacity>

    </View>

   </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 40,
  },
  inputView: {
    width: "80%",
    // width: 300,
    backgroundColor: "#161b22",
    borderRadius: 5,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20,
  },
  inputText: {
    height: 50,
    color: "#c9d1d9",
  },
  register: {
    color: "#c9d1d9",
    fontSize: 11,
  },
  loginBtn: {
    width: "80%",
    // width: 300,
    backgroundColor: "#238636",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: "white",
  },
});