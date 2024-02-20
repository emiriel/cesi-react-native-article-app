import { View, FlatList } from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import ArticleItem from "./components/article-item";

const API_URL = "https://dummyjson.com/products/";

function Products(props) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(API_URL + "?limit=5");
      setData(data.products);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <View>
      <FlatList
        data={data}
        renderItem={(itemData) => (
          <ArticleItem
            name={itemData.item.title}
            price={itemData.item.price}
            id={itemData.item.id}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

export default Products;
