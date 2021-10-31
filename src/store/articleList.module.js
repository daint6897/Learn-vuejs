// import Vue from "vue";
import { ArticlesService } from "@/common/api.service";
import * as actionArticle from "./articleList.type.js";

const initialState = {
  article: {
    author: {},
    title: "",
    description: "",
    body: "",
    tagList: []
  },
  comments: []
};

export const state = { ...initialState };

export const actions = {
  async [actionArticle.GET_ARTICLE](context, playload, prevArticle) {
    // avoid extronuous network call if article exists
    if (prevArticle !== undefined) {
      return context.commit(actionArticle.SET_ARTICLE, prevArticle);
    }
    const { data } = await ArticlesService.query(playload);

    console.log("aaaaaaa", data);

    context.commit(actionArticle.SET_ARTICLE, data.articles);
    return data;
  }
};

export const mutations = {
  [actionArticle.SET_ARTICLE](state, article) {
    console.log("aasasdasdasdasdasd", state, article);
    state.article = article;
  }
};

const getters = {
  articleList(state) {
    return state.article;
  }
};

export default {
  state,
  actions,
  mutations,
  getters
};
