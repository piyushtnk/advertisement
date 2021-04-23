export default function (context) {

	// If the user is not authenticated
	if (!context.$cookie.get('token')) {
		return context.redirect(context.app.localePath('/auth'));
	}

	// Set new theme
	context.$vuetify.theme.dark = context.$cookie.get('dark');
}
