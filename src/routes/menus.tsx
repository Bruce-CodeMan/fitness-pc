/*
 * @Date: 2023-04-12 14:29:53
 * @Author: Bruce
 * @Description: 
 */
import { HomeOutlined } from '@ant-design/icons';

interface IRoute {
    name: string;
    path: string;
    icon?: React.ReactNode;
    hideInMenu?: boolean; 
}

export const ROUTE_KEY = {
    HOME: 'home',
    NOTFOUND: '404',
    MY: 'my'
}

export const ROUTE_CONFIG: Record<string, IRoute> = {
    [ROUTE_KEY.HOME]:{
        path: "home",
        name: "首页",
        icon: <HomeOutlined />
    },
    [ROUTE_KEY.NOTFOUND]:{
        path: "*",
        hideInMenu: true,
        name: '404'
    },
    [ROUTE_KEY.MY]: {
        path: "my",
        name: "个人中心",
        icon: <HomeOutlined />
    }
}

export const routes = Object.keys(ROUTE_CONFIG).map((key) => ({...ROUTE_CONFIG[key], key}));

export const getRouteByKey = (key: string) => ROUTE_CONFIG[key];