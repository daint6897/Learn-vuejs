<template>
  <div>
    <div v-for="item in articleList">{{ item.body }}</div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "@/store";
import { mapGetters } from "vuex";

import * as actArticle from "@/store/articleList.type";
export default {
  name: "ArticleList",
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 2
    };
  },
  // mounted: function () {
  //   this.$nextTick(function () {
  //     // Code that will run only after the
  //     // entire view has been rendered
  //     store.dispatch(actArticle.GET_ARTICLE, {}),
  //   });
  //   // store.dispatch(actArticle.GET_ARTICLE, {}),
  // },

  computed: {
    listConfig() {
      const type = "all";
      const filters = {
        offset: (this.currentPage - 1) * this.itemsPerPage,
        limit: this.itemsPerPage
      };
      if (this.author) {
        filters.author = this.author;
      }
      if (this.tag) {
        filters.tag = this.tag;
      }
      if (this.favorited) {
        filters.favorited = this.favorited;
      }
      return {
        type: type,
        filters
      };
    },
    ...mapGetters(["articleList"])
  },
  mounted() {
    console.log("asdasd", this.listConfig);
    store.dispatch(actArticle.GET_ARTICLE, this.listConfig);
  }
  // beforeRouteEnter(to, from, next) {
  //   console.log("asasd", listConfig);
  //   Promise.all([
  //     store.dispatch(actArticle.GET_ARTICLE, this.listConfig)
  //     // store.dispatch(actArticle.GET_ARTICLE, this.listConfig)
  //     // store.dispatch(FETCH_ARTICLE, to.params.slug),
  //     // store.dispatch(FETCH_COMMENTS, to.params.slug)
  //   ]).then(() => {
  //     next();
  //   });
  // }
};
</script>
