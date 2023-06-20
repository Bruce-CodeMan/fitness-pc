import { ProColumns } from "@ant-design/pro-components";
import { Button } from "antd";

// Custom Imports
import { ICourse } from "../../utils/types";

interface IProps {
    onEditHandler: (id: string) => void;
}

export const COLUMNS: ({
    onEditHandler
}: IProps) =>ProColumns<ICourse, 'text'>[] = ({
    onEditHandler
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
        render: (text, entity) => [ 
            <Button 
                type="link" 
                key="edit" 
                onClick={() => onEditHandler(entity.id)}
            >
                编辑
            </Button>
        ]
    }
]