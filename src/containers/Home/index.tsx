
import { useUserContext } from '../../utils/userHooks';

/**
*   首页
*/
const Home = ({}) => {
    const { store } = useUserContext();
    return (<div>{ store.tel }</div>);
};

export default Home;    


