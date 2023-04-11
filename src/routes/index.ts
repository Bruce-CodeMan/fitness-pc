import Login from '../containers/Login';
import Home from '../containers/Home';

export const ROUTE_CONFIG = [
    {
        key: "home",
        path: "/",
        element: Home,
        name: "首页"
    },
    {
        key: "login",
        path: "/login",
        hideInMenu: true,
        element: Login,
        name: '登录'
    }
]

