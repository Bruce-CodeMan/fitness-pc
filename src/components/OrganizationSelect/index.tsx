/*
 * @Date: 2023-04-27 11:16:57
 * @Author: Bruce
 * @Description: Organization Select
 */
import { Select, Space } from "antd";
import { useOrganizations } from "../../service/organization";
import _ from 'lodash';
import { useUserContext } from "../../hooks/userHooks";

const OrganizationSelect = () => {
    const { store, setStore } = useUserContext();

    const { data, refetch } = useOrganizations(1, 10, true);

    const onSearchHandler = _.debounce((name: string) => {
        refetch({
            name
        })
    }, 500);

    const onChangeHandler = (val :string) => {
        setStore({
            currentOrg: val
        })
    }

    return (
        <Space>
            选择门店:
            <Select 
                style={{ width: 200 }}
                placeholder="请选择门店"
                showSearch
                onSearch={onSearchHandler}
                filterOption={false}
                onChange={onChangeHandler}
            >
                {data?.map((item) => (
                    <Select.Option
                        key={item.id}
                        value={item.id}
                    >
                        {item.name}
                    </Select.Option>
                ))}
            </Select>
        </Space>
        
    )
}

export default OrganizationSelect;