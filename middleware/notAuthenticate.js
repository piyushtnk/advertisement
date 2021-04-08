export default function (context) {

	// If the user is authenticated redirect to home page		
	if (context.$cookie.get('token')) {
		return context.redirect("/system");
	}
}
