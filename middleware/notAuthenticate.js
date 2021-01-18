export default function({ store, redirect }) {
  // If the user is authenticated redirect to home page
  if (localStorage.token) {
    return redirect("/system");
  }
}
