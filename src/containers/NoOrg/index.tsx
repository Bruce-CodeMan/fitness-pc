import { Button, Result } from 'antd';
import { useEffect } from 'react';
import { useUserContext } from '../../hooks/userHooks';
import { useGoTo } from '../../hooks';

const NoOrg = () => {

    const { store } = useUserContext();
    const { go } = useGoTo();
    useEffect(() => {
        if(store.currentOrg) {
            go();
        }
    }, [store.currentOrg])

    return (<Result 
        status="404"
        title="请选择门店"
        subTitle="所有的管理行为都是基于您选择的门店进行筛选的"
        extra={ <Button type="primary" href="/">返回首页</Button> }
    />)
}

export default NoOrg;

