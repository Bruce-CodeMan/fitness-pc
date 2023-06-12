import { ProColumns } from "@ant-design/pro-components";
import { Button } from "antd";

// Custom Imports
import { ICourse } from "../../utils/types";

export const COLUMNS: ProColumns<ICourse, 'text'>[] = [
    {
        title: '课程标题',
        dataIndex: 'name',
        ellipsis:true,
        copyable: true
    }, 
    {
        title: '限制人数',
        dataIndex: 'limitNumber',
        width: 75,
        search: false
    },
    {
        title: '持续时长',
        dataIndex: 'duration',
        width: 75
    },
    {
        title: '操作',
        valueType: 'option',
        dataIndex: 'id',
        render: (text) => {
            return (
                <Button type="link">编辑{text}</Button>
            )
        }
    }
]