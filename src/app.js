import dva from "dva";
import { createBrowserHistory } from "history";

const app = dva({
  history: createBrowserHistory(),
});

export default app;
