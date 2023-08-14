import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import { SPACING } from '../config/spacing';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../config/colors';
import { LinearGradient } from 'expo-linear-gradient';
import Ionicons from "@expo/vector-icons/Ionicons";

export default function MenuUser() {
    const navigation = useNavigation();
    const { top } = useSafeAreaInsets();

  return (
    <TouchableOpacity
          style={{ ...styles.button, top }}
          onPress={() => navigation.navigate("MenuScreen")}
        >
          <LinearGradient
            style={{ ...styles.gradient, marginTop: 40, padding: 30 }}
            colors={[colors["dark-gray"], colors.dark]}
          >
            <Ionicons
              name="ellipsis-vertical-outline"
              color={colors.light}
              size={25}
            />
          </LinearGradient>
        </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    button: {
        overflow: "hidden",
        borderRadius: 5,
        position: "absolute",
        right: 0,
        flexDirection: "row",
      },

      gradient: {
        paddingHorizontal: SPACING,
        paddingVertical: SPACING / 3,
        borderRadius: 15,
      },
})