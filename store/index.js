import Vuex from "vuex";
import Clients from "./modules/clients";
import Login from "./modules/login";
import Default from "./modules/default";

const createStore = () => {
  return new Vuex.Store({
    modules: {
      Default,
      Login,
      Clients
    }
  });
};

export default createStore;
