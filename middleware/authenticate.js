export default function (context) {
	// If the user is not authenticated
	if (!localStorage.token) {
		return context.redirect(context.app.localePath('/login'));
	}
}
