/*
 * @Date: 2023-04-12 10:56:55
 * @Author: Bruce
 * @Description: 
 */
import NotFound from "../containers/404"
import Home from "../containers/Home"
import My from "../containers/My"
import Organization from "../containers/Organization"
import NoOrg from "../containers/NoOrg"
import { ROUTE_KEY } from "./menus"

export const ROUTE_COMPONENT = {
    [ROUTE_KEY.HOME]: Home,
    [ROUTE_KEY.MY]: My,
    [ROUTE_KEY.NOTFOUND]: NotFound,
    [ROUTE_KEY.ORGANIZATION]: Organization,
    [ROUTE_KEY.NO_ORG]: NoOrg
}

