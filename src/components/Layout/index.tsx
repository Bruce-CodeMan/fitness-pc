/*
 * @Date: 2023-04-12 10:56:55
 * @Author: Bruce
 * @Description: 
 */
import { MenuDataItem, ProLayout } from '@ant-design/pro-components';
import { useOutlet, Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../hooks/userHooks';
import logo from "../../assets/react.svg";
import { routes, ROUTE_KEY } from '../../routes/menus';
import { AUTH_TOKEN } from '../../utils/constant';
import { useGoTo } from '../../hooks';
import { Space, Tooltip } from 'antd';
import { LogoutOutlined, ShopOutlined } from '@ant-design/icons';
import OrganizationSelect from '../OrganizationSelect';

/**
* 外层框架
*/

const menuItemRender = (
    item: MenuDataItem,
    dom: React.ReactNode
) => <Link to={item.path || '/'}>{dom}</Link>;

const Layout = () => {
    const outlet = useOutlet();
    const { store } = useUserContext();
    const nav = useNavigate();
    const { go } = useGoTo();

    const logoutHandler = () => {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, '');
        nav('/login');
    }

    const goToOrganization = () => {
        go(ROUTE_KEY.ORGANIZATION)
    }

    return (
        <ProLayout
            layout='mix'
            siderWidth={180}
            avatarProps={{
                src: store.avatar || null,
                title: store.name,
                size: 'small',
                onClick: () => go(ROUTE_KEY.MY),
            }}
            links={[
                <Space size={20} onClick={logoutHandler}>
                    <LogoutOutlined />退出
                </Space>
            ]}
            title={false}
            logo={<img src={ logo }/>}
            route={{
                path: '/',
                routes: routes
            }}
            actionsRender={() => [
                <OrganizationSelect />,
                <Tooltip title="门店管理">
                    <ShopOutlined onClick={goToOrganization}/>
                </Tooltip>
            ]}
            menuItemRender={menuItemRender}
            onMenuHeaderClick={() => nav('/')}
        >
            
            <div key={store.currentOrg}>
            { outlet }
            </div>
        </ProLayout>
    );
};

export default Layout;