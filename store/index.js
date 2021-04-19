import Vuex from "vuex";

// Ads store
import Default from "./modules/default";
import Login from "./modules/login";
import Dashboard from "./modules/dashboard";
import Banner from "./modules/banner";
import Clients from "./modules/clients";

// B91
import B91Charts from "./modules/b91/charts";
import B91Players from "./modules/b91/players";
import Options from "./modules/b91/options";
import Stats from "./modules/b91/stats";
import B91Banner from "./modules/b91/banner";


const createStore = () => {
	return new Vuex.Store({
		modules: {
			Default,
			Login,
			Dashboard,
			Banner,
			Clients,
			Stats,
			Options,
			B91Charts,
			B91Players,
			B91Banner
		}
	});
};

export default createStore;
