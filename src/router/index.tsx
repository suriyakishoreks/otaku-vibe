import { createBrowserRouter } from "react-router";
import { routes } from "./routes";

const BASE_PATH = '/anime-list-app/';

const router = createBrowserRouter(routes, {
    basename: BASE_PATH
});

export default router;


