import { useState } from "react";
import { Button, StyleSheet, TextInput, View, Modal } from "react-native";

function ArticleInput(props) {
  const [enteredNameText, setEnteredNameText] = useState("");
  const [enteredPriceText, setEnteredPriceText] = useState("");

  function nameInputHandler(enteredName) {
    setEnteredNameText(enteredName);
  }

  function priceInputHandler(enteredPrice) {
    setEnteredPriceText(enteredPrice);
  }

  function addArticleHandler() {
    props.onAddArticle(enteredNameText, enteredPriceText);
    setEnteredNameText("");
    setEnteredPriceText("");
  }

  return (
    <Modal visible={props.visible}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Nom"
          onChangeText={nameInputHandler}
          value={enteredNameText}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Prix"
          onChangeText={priceInputHandler}
          value={enteredPriceText}
          keyboardType="number-pad"
        />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button color="red" title="Annuler" onPress={props.onCancel} />
          </View>
          <View>
            <Button title="Ajouter" onPress={addArticleHandler} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ArticleInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    marginRight: 8,
    marginTop: 8,
    padding: 8,
  },
  buttonContainer: {
    marginTop: 16,
    paddingTop: 30,
    flexDirection: "row",
  },
  button: {
    marginHorizontal: 16,
    width: 100,
  },
});
