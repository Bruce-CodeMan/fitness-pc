import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components';
import { useOutlet, Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../../utils/userHooks';
import logo from "../../assets/react.svg";
import { ROUTE_CONFIG } from '../../routes';
import { AUTH_TOKEN } from '../../utils/constant';

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

    const logout = () => {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, '');
        nav('/login');
    }

    return (
        <ProLayout
            layout='mix'
            siderWidth={130}
            avatarProps={{
                src: '',
                title: store.tel,
                size: 'small',
                onClick: logout,
            }}
            title={false}
            logo={<img src={ logo }/>}
            route={{
                path: '/',
                routes: ROUTE_CONFIG
            }}
            menuItemRender={menuItemRender}
            onMenuHeaderClick={() => nav('/')}
        >
            <PageContainer>
                { outlet }
            </PageContainer>
        </ProLayout>
    );
};

export default Layout;