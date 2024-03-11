import { useState, useEffect } from "react";
import { Button, FlatList, Image, StyleSheet, Text, View } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ArticleInput from "./components/article-input";
import ArticleItem from "./components/article-item";
import { useArticlesStore } from "./store/useArticles";
const API_URL = "http://10.129.129.116:3000/api/articles/all";

function Article() {
  const [modalIsVisible, setModalVisible] = useState(false);
  const [article, setArticle] = useState({});
  const [allArticles, setAllArticles] = useState([]);
  const [apiArticles, setApiArticles] = useState([]);
  const storeArticles = useArticlesStore((state) => state.articles);
  const setStoreArticles = useArticlesStore((state) => state.setArticles);
  useEffect(() => {
    getItemsFromStorage();
    fetchArticles();
  }, []);

  useEffect(() => {
    setAllArticles([...apiArticles, ...storeArticles]);
  }, [apiArticles, storeArticles]);

  const getItemsFromStorage = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("articles-storage");
      const data = JSON.parse(jsonData);
      setStoreArticles(data);
    } catch (error) {
      console.error("error fetching data : ", error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axios.get(API_URL);
      setApiArticles(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("error fetching data : ", error);
    }
  };

  function startAddArticleHandler() {
    setModalVisible(true);
  }

  function closeModal() {
    setModalVisible(false);
    setArticle({});
  }

  function selectArticleHandler(article) {
    setArticle(article);
    setModalVisible(true);
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.cesiLogo}
        source={require("./assets/images/logo-cesi.jpg")}
      />
      <View style={styles.addArticleButton}>
        <Button title="Ajouter un article" onPress={startAddArticleHandler} />
      </View>
      <ArticleInput
        visible={modalIsVisible}
        onModalClose={closeModal}
        selectedArticle={article}
      />
      <View style={styles.articleContainer}>
        <Text style={styles.articleListeTitle}>Liste de articles</Text>
        <View style={styles.articleListe}>
          <FlatList
            data={allArticles}
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

export default Article;
