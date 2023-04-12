import NotFound from "../containers/404"
import Home from "../containers/Home"
import My from "../containers/My"
import { ROUTE_KEY } from "./menus"

export const ROUTE_COMPONENT = {
    [ROUTE_KEY.HOME]: Home,
    [ROUTE_KEY.MY]: My,
    [ROUTE_KEY.NOTFOUND]: NotFound
}

