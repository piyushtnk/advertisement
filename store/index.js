import Vuex from "vuex";
import Default from "./modules/default";
import Login from "./modules/login";
import Dashboard from "./modules/dashboard";
import Banner from "./modules/banner";
import Clients from "./modules/clients";
import Stats from "./modules/stats";
import Options from "./modules/options";

const createStore = () => {
	return new Vuex.Store({
		modules: {
			Default,
			Login,
			Dashboard,
			Banner,
			Clients,
			Stats,
			Options
		}
	});
};

export default createStore;
