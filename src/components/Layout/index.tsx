import { PageContainer, ProLayout } from '@ant-design/pro-components';
import { useOutlet } from 'react-router-dom';
import { useUserContext } from '../../utils/userHooks';
import logo from "../../assets/react.svg";
import { ROUTE_CONFIG } from '../../routes';

/**
* 组件搭建
*/
const Layout = () => {
    const outlet = useOutlet();
    const { store } = useUserContext();

    return (
        <ProLayout
            layout='mix'
            avatarProps={{
                src: '',
                title: store.tel,
                size: 'small'
            }}
            title={false}
            logo={<img src={ logo }/>}
            route={{
                path: '/',
                routes: ROUTE_CONFIG
            }}
        >
            <PageContainer>
                { outlet }
            </PageContainer>
        </ProLayout>
    );
};

export default Layout;