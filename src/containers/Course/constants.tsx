import { ProColumns } from "@ant-design/pro-components";
import { Button, Space } from "antd";

// Custom Imports
import { ICourse } from "../../utils/types";

interface IProps {
    onEditHandler: (id: string) => void;
    onOrderTimeHandler: (id: string) => void;
    onCardeHandler: (id: string) => void;
}

export const COLUMNS: ({
    onEditHandler,
    onOrderTimeHandler,
    onCardeHandler
}: IProps) =>ProColumns<ICourse, 'text'>[] = ({
    onEditHandler,
    onOrderTimeHandler,
    onCardeHandler
}) =>[
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
        align: 'center',
        width: 300,
        render: (text, entity) => [ 
            <Space>
                <Button 
                type="link" 
                key="edit" 
                onClick={() => onEditHandler(entity.id)}
            >
                编辑
            </Button>
            <Button 
                type="link" 
                key="orderTime" 
                onClick={() => onOrderTimeHandler(entity.id)}
            >
                预约时间
            </Button>
            <Button 
            type="link" 
            key="orderTime" 
            onClick={() => onCardeHandler(entity.id)}
        >
            关联消费卡
        </Button>
            </Space>
        ]
    }
]