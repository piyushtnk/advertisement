export default function({ $axios, redirect, store }) {
  $axios.onRequest(config => {
    config.headers.common["Authorization"] = `Bearer ${localStorage.token}`;
  });
  $axios.onError(error => {
    //   Show the snackbar message.
    store.dispatch("setSnackbarText", error);
    store.dispatch("setSnackbarVisible", true);

    //   Once user Unauthorized then moved them to login page.
    if (error.response.status == 401) {
      localStorage.clear();
      redirect("/login");
    } else {
      console.error(error);
    }
  });
}
