import { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
} from "react-native";
import ArticleItem from "./components/article-item";
import ArticleInput from "./components/article-input";

export default function App() {
  const [modalIsVisible, setModalVisible] = useState(false);
  const [articles, setArticles] = useState([]);

  function startAddArticleHandler() {
    setModalVisible(true);
  }

  function endAddArticleHandler() {
    setModalVisible(false);
  }

  function addArticleHandler(enteredName, enteredPrice) {
    setArticles((currentArticles) => [
      ...currentArticles,
      { name: enteredName, price: enteredPrice, id: Math.random().toString() },
    ]);
    console.log(articles);
    endAddArticleHandler();
  }

  function deleteArticleHandler(id) {
    setArticles((currentArticles) =>
      currentArticles.filter((price) => price.id !== id)
    );
  }

  return (
    <View style={styles.container}>
      <Image source={""} />
      <View style={styles.addArticleButton}>
        <Button title="Ajouter un article" onPress={startAddArticleHandler} />
      </View>
      <ArticleInput
        onAddArticle={addArticleHandler}
        visible={modalIsVisible}
        onCancel={endAddArticleHandler}
      />
      <View style={styles.articleContainer}>
        <Text style={styles.articleListeTitle}>Liste de articles</Text>
        <View style={styles.articleListe}>
          <FlatList
            data={articles}
            renderItem={(itemData) => {
              return (
                <ArticleItem
                  name={itemData.item.name}
                  id={itemData.item.id}
                  price={itemData.item.price}
                  onDeleteArticle={deleteArticleHandler}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  articleContainer: {
    flex: 1,
    marginTop: 10,
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  container: {
    paddingTop: 60,
    paddingHorizontal: 16,
    flex: 1,
  },
  articleListe: { paddingTop: 20 },
  articleListeTitle: {
    fontSize: 20,
    borderBottomWidth: 2,
    borderColor: "lightgray",
    fontWeight: "bold",
    textAlign: "center",
    paddingBottom: 10,
  },
  addArticleButton: {
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "center",
  },
});
