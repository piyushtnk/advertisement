import Vuex from "vuex";
import Clients from "./modules/clients";
import Login from "./modules/login";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      Login,
      Clients
    }
  });
};

export default createStore;
