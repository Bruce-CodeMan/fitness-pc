/*
 * @Date: 2023-04-27 11:16:57
 * @Author: Bruce
 * @Description: 
 */
import { Select } from "antd";
import { useOrganizations } from "../../service/organization";

const OrganizationSelect = () => {

    const { data } = useOrganizations(1, 10, true);

    return (
        <Select>
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