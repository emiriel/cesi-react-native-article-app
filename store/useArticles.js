import { create } from "zustand";

export const useArticlesStore = create((set) => ({
  articles: [],
  setArticles: (newArticles) =>
    set((state) => ({ articles: [...newArticles] })),
  addArticle: (newArticle) =>
    set((state) => ({ articles: [...state.articles, newArticle] })),
  updateArticle: (newArticle) =>
    set((state) => ({
      articles: [
        ...state.articles.filter((article) => article.id !== newArticle.id),
        newArticle,
      ],
    })),
  removeArticle: (id) =>
    set((state) => ({
      articles: [...state.articles.filter((article) => article.id !== id)],
    })),
}));
