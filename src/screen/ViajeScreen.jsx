import {
  ActivityIndicator,
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useUser } from "../hooks/userUser";
import { useNavigation } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as Yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import FormContainer from "../components/Form/FormContainer";
import FormInput from "../components/Form/FormInput";
import { SPACING } from "../config/spacing";
import { colors } from "../config/colors";
import MenuUser from "../hooks/MenuUser";

const validationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .min(3, "Titulo invalido")
    .required("Titulo es requerido"),

  description: Yup.string().trim().min(3, "Descripcion invalida"),
});

export default function ViajeScreen({ route }) {
  const { token } = useUser();
  const viaje = route.params;
  const [image, setImage] = useState(viaje?.imgUrl || null);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState(false);

  const viajeInfo = {
    title: viaje?.title || "",
    description: viaje?.description || "",
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
    });

    console.log(result.assets[0].uri.split("/").pop());

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const saveViaje = async (values, formikActions) => {
    try {
      const { title, description } = values;
      const formData = new FormData();

      if (image) {
        formData.append("img", {
          name: image.split("/").pop(),
          uri: image,
          type: "image/jpg",
        });
      }

      formData.append("title", title);
      formData.append("description", description);
      setIsLoading(true);

      await axios.post("/viajes", formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);
      formikActions.resetForm();
      formikActions.setSubmitting(false);
    } catch (error) {
      console.log("Error en saveViaje", error.message);
    }
  };

  const updateViaje = async (values, formikActions) => {
    try {
      const { title, description } = values;
      const formData = new FormData();

      if (viaje.imgUrl !== image) {
        formData.append("img", {
          name: image.split("/").pop(),
          uri: image,
          type: "image/jpg",
        });
      }

      formData.append("title", title);
      formData.append("description", description);
      setIsLoading(true);

      await axios.put(`/viajes/${viaje._id}`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoading(false);
      formikActions.resetForm();
      formikActions.setSubmitting(false);
    } catch (error) {
      console.log("Error en updateViaje", error.message);
    }
  };

  const actions = async (values, formikActions) => {
    viaje
      ? await updateViaje(values, formikActions)
      : await saveViaje(values, formikActions);

    navigation.goBack();
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color="red" size={80} />
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <FormContainer>
          <Formik
            initialValues={viajeInfo}
            validationSchema={validationSchema}
            onSubmit={actions}
          >
            {({
              values,
              errors,
              touched,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
            }) => {
              const { title, description } = values;
              return (
                <>
                  <FormInput
                    value={title}
                    error={touched.title && errors.title}
                    onChangeText={handleChange("title")}
                    onBlur={handleBlur("titulo")}
                    label="Titulo"
                    placeholder="Titulo"
                  />

                  <FormInput
                    value={description}
                    error={touched.description && errors.description}
                    onChangeText={handleChange("description")}
                    onBlur={handleBlur("description")}
                    label="Descripcion"
                    placeholder="Descripcion"
                  />

                  <View>
                    <TouchableOpacity
                      style={styles.uploadBtnContainer}
                      onPress={() => pickImage()}
                    >
                      {image ? (
                        <Image
                          source={{ uri: image }}
                          style={{ width: "100%", height: "100%" }}
                        />
                      ) : (
                        <Text style={styles.uploadBtn}>
                          {" "}
                          Selecionar una imagen{" "}
                        </Text>
                      )}
                    </TouchableOpacity>
                  </View>

                  <Button
                    submitting={isSubmitting}
                    onPress={handleSubmit}
                    title={viaje ? "Actualizar" : "Guardar"}
                  />
                </>
              );
            }}
          </Formik>
        </FormContainer>
      </View>
      <MenuUser />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING * 2,
  },

  uploadBtnContainer: {
    height: 125,
    width: 125,
    borderRadius: 60,
    borderColor: colors.light,
    justifyContent: "center",
    alignItems: "center",
    borderStyle: "dashed",
    borderWidth: 1,
    overflow: "hidden",
    marginVertical: 10,
    // marginLeft: 100,
  },

  uploadBtn: {
    textAlign: "center",
    fontSize: 16,
    opacity: 0.3,
    fontWeight: "bold",
    color: colors.light,
  },

  backButton: {
    position: "absolute",
    top: 30,
    left: 5,
  },
});
