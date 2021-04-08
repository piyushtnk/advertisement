export default function (context) {
	context.$axios.onRequest(config => {
		config.headers.common["Authorization"] = `Bearer ${context.$cookie.get('token')}`;
	});
	context.$axios.onError(error => {
		//   Show the snackbar message.
		context.store.dispatch("setSnackbarText", error);
		context.store.dispatch("setSnackbarVisible", true);

		//   Once user Unauthorized then moved them to login page.
		if (error.response.status == 401) {
			localStorage.clear();
			context.redirect("/login");
		}
	});
}
