import { ProColumns } from "@ant-design/pro-components";

import { CARD_TYPE } from "../../../../utils/constant";
import { Popconfirm, Space } from "antd";

export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
    {
        title: "序号",
        dataIndex: "key",
        width: 50,
        editable: false,
        align: 'center',
        render: (d, r, index) => index + 1
    },
    {
        title: "名称",
        dataIndex: "name",
        align: "center"
    },
    {
        title: "有效期(天)",
        dataIndex: "validatyDay",
        valueType: 'digit',
        width: 110,
        align: "center"
    },
    {
        title: "类型",
        dataIndex: "type",
        valueType: "select",
        width: 120,
        align: "center",
        request: async () => [
            {
                value: CARD_TYPE.TIME,
                label: "次卡"
            },{
                value: CARD_TYPE.DURATION,
                label: "时长卡"
            }
        ]
    },
    {
        title: "次数",
        dataIndex: "time",
        valueType: "digit",
        width: 100,
        align: "center"
    },
    {
        title: "操作",
        valueType:  "option",
        width: 150,
        align: "center",
        render: (text, record, _, action) => (
            <Space>
                <a
                    key="edit"
                    onClick={() => {
                        action?.startEditable(record.id || '')
                    }}
                >
                    编辑
                </a>
                <Popconfirm
                    title="提醒"
                    description="确认要删除吗"
                    onConfirm={()=>onDeleteHandler(record.id)}
                >
                    <a
                        key="delete"
                    >
                        删除
                    </a>
                </Popconfirm>
            </Space>
        )
    }
]