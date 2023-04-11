import { Spin } from 'antd';
import { IPropChild } from '../../utils/types';
import { connect, useGetUser } from '../../utils/userHooks';

/**
* 获取用户信息组件
*/
const UserInfo = ({ children }: IPropChild) => {
    const {loading} = useGetUser();
    
    return (
        <Spin spinning={loading}>
            <div>
                {children}
            </div>
        </Spin>  
        
    );
};

export default connect(UserInfo);

