/* eslint-disable no-console */
import axios from 'axios';

const state = {
  todos: [],
  isLoading: true,
  isError: true,
};

// getting the data or state
const getters = {
  allTodos: (state) => {
    return state.todos;
  },
};

const actions = {
  async fetchTodos({ commit }) {
    const response = await axios.get(
      'https://jsonplaceholder.typicode.com/todos'
    );
    console.log('response', response);
    commit('setTodos', response.data);
  },

  async addTodo({ commit }, title) {
    const response = await axios.post(
      'https://jsonplaceholder.typicode.com/todos',
      { title, completed: false }
    );

    commit('newTodo', response.data);
  },

  async deleteTodo({ commit }, id) {
    await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

    commit('removeTodo', id);
  },

  async filterTodos({ commit }, event) {
    // Get the limit
    const limit = parseInt(
      event.target.options[event.target.options.selectedIndex].innerText
    );

    // Request
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/todos?_limit=${limit}`
    );

    commit('setTodos', response.data);
  },

  async updateTodo({ commit }, updatedTodo) {
    const response = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${updatedTodo.id}`,
      updatedTodo
    );

    commit('updateTodo', response.data);
  },
};

const mutations = {
  // setTodos: (state, todos) => (
  //   state.todos = todos
  //   ),
  setTodos: (state, todos) => {
    state.todos = todos;
    state.isLoading = false;
    state.isError = false;
  },
  newTodo: (state, todo) => state.todos.unshift(todo),
  removeTodo: (state, id) =>
    (state.todos = state.todos.filter((todo) => todo.id !== id)),
  updateTodo: (state, updatedTodo) => {
    // Find index
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id);

    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo);
    }
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
