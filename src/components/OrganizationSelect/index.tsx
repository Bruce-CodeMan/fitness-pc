/*
 * @Date: 2023-04-27 11:16:57
 * @Author: Bruce
 * @Description: Organization Select
 */
import { Select, Space } from "antd";
import { useOrganizations } from "../../service/organization";
import _ from 'lodash';
import { useUserContext } from "../../hooks/userHooks";
import { LOCAL_CURRENT_ORG } from "../../utils/constant";

const currentOrg = () => {
    try {
        const res = JSON.parse(localStorage.getItem(LOCAL_CURRENT_ORG) || '{}');
        return res
    } catch {
        return undefined;
    }
}

const OrganizationSelect = () => {
    const { setStore } = useUserContext();

    const { data, refetch } = useOrganizations(1, 10, true);

    const onSearchHandler = _.debounce((name: string) => {
        refetch({
            name
        })
    }, 500);

    const onChangeHandler = (val :{ value: string, label: string }) => {
        setStore({
            currentOrg: val.value
        });
        localStorage.setItem(LOCAL_CURRENT_ORG, JSON.stringify(val));
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
                defaultValue={currentOrg()}
                onChange={onChangeHandler}
                labelInValue
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