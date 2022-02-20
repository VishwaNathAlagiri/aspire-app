import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  isMobile: 0,
};

const mutations = {
  setScreen(state, flag) {
    state.isMobile = flag;
  },
};

const actions = {
  setScreen: ({ commit }) => commit("setScreen"),
};

const getters = {
  getScreen: (state) => state.isMobile,
};

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
});
