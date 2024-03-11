import { useState, useEffect } from "react";
import { Button, StyleSheet, TextInput, View, Modal } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useArticlesStore } from "../store/useArticles";

function ArticleInput(props) {
  const { name, price, id } = props.selectedArticle;
  const [enteredNameText, setEnteredNameText] = useState("");
  const [enteredPriceText, setEnteredPriceText] = useState("");
  const addStoreArticle = useArticlesStore((state) => state.addArticle);
  const articles = useArticlesStore((state) => state.articles);
  const updateArticle = useArticlesStore((state) => state.updateArticle);
  const removeArticle = useArticlesStore((state) => state.removeArticle);

  const addArticle = async (article) => {
    try {
      AsyncStorage.setItem(
        "articles-storage",
        JSON.stringify([...articles, article])
      );
      addStoreArticle(article);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setEnteredNameText(name);
    setEnteredPriceText(price);
  }, [id]);

  function nameInputHandler(enteredName) {
    setEnteredNameText(enteredName);
  }

  function priceInputHandler(enteredPrice) {
    setEnteredPriceText(enteredPrice);
  }

  function addArticleHandler() {
    addArticle({
      name: enteredNameText,
      price: enteredPriceText,
      id: Math.random().toString(),
    });

    setEnteredNameText("");
    setEnteredPriceText("");

    props.onModalClose();
  }

  function updateArticleHandler() {
    updateArticle({ id, name: enteredNameText, price: enteredPriceText });
    setEnteredNameText("");
    setEnteredPriceText("");

    props.onModalClose();
  }

  function deleteArticleHandler(id) {
    removeArticle(id);
    props.onModalClose();
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
          {props.selectedArticle.id ? (
            <>
              <View style={styles.button}>
                <Button
                  color="red"
                  title="Supprimer"
                  onPress={deleteArticleHandler.bind(this, id)}
                />
              </View>
              <View>
                <Button title="Modifier" onPress={updateArticleHandler} />
              </View>
            </>
          ) : (
            <>
              <View style={styles.button}>
                <Button
                  color="red"
                  title="Annuler"
                  onPress={props.onModalClose}
                />
              </View>
              <View>
                <Button title="Ajouter" onPress={addArticleHandler} />
              </View>
            </>
          )}
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
