export default function (context) {
	// If the user is not authenticated
	if (!localStorage.token) {
		return context.redirect(context.app.localePath('/login'));
	} else if (!context.$cookie.get('user')) {
		localStorage.token = '';
		return context.redirect(context.app.localePath('/login'));
	}

	// Set new theme
	context.$vuetify.theme.dark = context.$cookie.get('dark');
}
