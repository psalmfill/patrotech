import { createStore } from "vuex";
import axios from "../plugins/axios";
const store = createStore({
  state() {
    return {
      count: 0,
      users: [],
    };
  },
  getters: {
    getUsers(state) {
      return state.users;
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    fetchUsers(state) {
      axios.get("admin/users").then((response) => {
        console.log("response", response);
        state.users = response.data["data"];
      });
    },
    addUser(state) {
      state.users.push(user);
    },
  },
});

export default store;
