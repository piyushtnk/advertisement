export default function (context) {
	context.$axios.onRequest(config => {
		config.baseURL = process.env.BASE_URL + '/api';
		config.headers.common["Authorization"] = `Bearer ${context.$cookie.get('token')}`;
	});
	context.$axios.onError(error => {
		//   Sending the toast messages.
		context.store.dispatch("setToast", { message: error, color: 'red' });

		//   Once user Unauthorized then moved them to login page.
		if (error.response.status == 401) {
			context.$cookie.removeAll();
			context.redirect(context.app.localePath('/'));
		}
	});
}
