/*
 * @Date: 2023-04-27 11:16:57
 * @Author: Bruce
 * @Description: Organization Select
 */
import { Select } from "antd";
import { useOrganizations } from "../../service/organization";

const OrganizationSelect = () => {

    const { data } = useOrganizations(1, 10, true);

    const onSearchHandler = () => {}

    return (
        <Select 
            style={{ width: 200 }}
            placeholder="请选择门店"
            showSearch
            onSearch={onSearchHandler}
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
    )
}

export default OrganizationSelect;