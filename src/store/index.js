// Entrypoint for vuex

import Vuex from 'vuex';
import Vue from 'vue';
import todosState from './modules/todos';

// Load vuex
Vue.use(Vuex);

// Create store
export default new Vuex.Store({
  modules: {
    todos: todosState,
  },
});
