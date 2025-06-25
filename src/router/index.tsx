import { createBrowserRouter } from "react-router";
import { routes } from "./routes";

const BASE_PATH = '/otaku-vibe/';

const router = createBrowserRouter(routes, {
    basename: BASE_PATH
});

export default router;


