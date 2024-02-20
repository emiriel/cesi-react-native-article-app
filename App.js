import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import ArticleInput from "./components/article-input";
import ArticleItem from "./components/article-item";

export default function App() {
  const [modalIsVisible, setModalVisible] = useState(false);
  const [articles, setArticles] = useState([]);
  const [article, setArticle] = useState({});

  function startAddArticleHandler() {
    setModalVisible(true);
  }

  function endAddArticleHandler() {
    setModalVisible(false);
    setArticle({});
  }

  function addArticleHandler(enteredName, enteredPrice) {
    setArticles((currentArticles) => [
      ...currentArticles,
      { name: enteredName, price: enteredPrice, id: Math.random().toString() },
    ]);
    endAddArticleHandler();
  }

  function deleteArticleHandler(id) {
    setArticles((currentArticles) =>
      currentArticles.filter((article) => article.id !== id)
    );
    setArticle({});
    setModalVisible(false);
  }

  function selectArticleHandler(article) {
    setArticle(article);
    setModalVisible(true);
  }

  function updateArticleHander(id, enteredName, enteredPrice) {}

  return (
    <>
      <StatusBar />
      <View style={styles.container}>
        <Image
          style={styles.cesiLogo}
          source={require("./assets/images/logo-cesi.jpg")}
        />
        <View style={styles.addArticleButton}>
          <Button title="Ajouter un article" onPress={startAddArticleHandler} />
        </View>
        <ArticleInput
          onAddArticle={addArticleHandler}
          visible={modalIsVisible}
          onCancel={endAddArticleHandler}
          onDelete={deleteArticleHandler}
          selectedArticle={article}
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
                    onSelectArticle={selectArticleHandler}
                  />
                );
              }}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </View>
    </>
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
  cesiLogo: {
    width: 300,
    height: 100,
    marginHorizontal: 40,
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
