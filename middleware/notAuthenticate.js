export default function({ store, redirect }) {
  // If the user is authenticated redirect to home page
  console.log("unauth-middleware");

  if (store.state.user) {
    return redirect("/");
  }
}
