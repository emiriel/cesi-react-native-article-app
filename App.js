import { StatusBar } from "expo-status-bar";
import Home from "./Home";
import Article from "./Article";
import Products from "./Products";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen
            name="article"
            component={Article}
            options={{ title: "Liste d'articles" }}
          />
          <Stack.Screen name="products" component={Products} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
