import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screen/HomeScreen";
import RegisterScreen from "../screen/RegisterScreen";
import LoginScreen from "../screen/LoginScreen";
import { SPACING } from "../config/spacing";
import { colors } from "../config/colors";
import { useUser } from "../hooks/userUser";
import DetailScreen from "../screen/DetailScreen";
import ViajeScreen from "../screen/ViajeScreen";

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const { isLogin } = useUser();

//   console.log(isLogin);

  const PrivateRoutes = (screen) => {
    return isLogin ? screen : LoginScreen
  };

  const PublicRoutes = (screen) => {
    return isLogin ? HomeScreen : screen;
  };

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          paddingHorizontal: SPACING * 2,
          flex: 1,
          backgroundColor: colors.black,
        },
      }}
    >
      {/* <Stack.Screen name="Registerr" component={RegisterScreen} /> */}

      
      <Stack.Screen name="HomeScreen" component={PrivateRoutes(HomeScreen)} />

      <Stack.Screen name="Register" component={PublicRoutes(RegisterScreen)} />

      <Stack.Screen name="Login" component={PublicRoutes(LoginScreen)} />

      <Stack.Screen name= "DetailScreen" component = {PrivateRoutes(DetailScreen)}/>

      <Stack.Screen name= "ViajeScreen" component={PrivateRoutes(ViajeScreen)}/>
    </Stack.Navigator>
  );
};
