import Vuex from "vuex";
import Login from "./modules/login";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      Login
    }
  });
};

export default createStore;
