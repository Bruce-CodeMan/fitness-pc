import { connect, useGetUser } from '../../utils/userHooks';

/**
*
*/
const UserInfo = ({}) => {
    useGetUser();
    
    return null;
};

export default connect(UserInfo);

