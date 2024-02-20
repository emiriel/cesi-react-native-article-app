import { Text, View, Button } from "react-native";

function Home(props) {
  function pressHandler(screen) {
    props.navigation.navigate(screen);
  }
  return (
    <View>
      <Text>Home</Text>
      <Button title="Articles" onPress={pressHandler.bind(this, "article")} />
      <Button title="Products" onPress={pressHandler.bind(this, "products")} />
    </View>
  );
}

export default Home;
