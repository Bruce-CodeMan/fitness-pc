/*
 * @Date: 2023-04-10 09:40:33
 * @Author: Bruce
 * @Description: 
 */

import { useUserContext } from '../../hooks/userHooks';
import { Button } from 'antd';
import { useGoTo } from '../../hooks';
import { ROUTE_KEY } from '../../routes/menus';
/**
*   首页
*/
const Home = () => {
    const { store } = useUserContext();
    const { go } = useGoTo();
    return (<Button onClick={() => go(ROUTE_KEY.MY)}>个人中心</Button>);
};

export default Home;    


