import { ProColumns } from "@ant-design/pro-components";
import { Space, Popconfirm } from "antd";

import { IOrderTime, TWEEK } from "../../../../utils/types";

export interface IDay {
    key: TWEEK;
    label: string;
}

export const DAYS: IDay[] = [
    {
        key: 'monday',
        label: '周一'
    },
    {
        key: 'tuesday',
        label: '周二'
    },
    {
        key: 'wednesday',
        label: '周三'
    },
    {
        key: 'thursday',
        label: '周四'
    },
    {
        key: 'friday',
        label: '周五'
    },
    {
        key: 'saturday',
        label: '周六'
    },
    {
        key: 'sunday',
        label: '周日'
    }
]




export const getColumns = (onDeleteHandler: Function): ProColumns[] => [
    {
        title: "序号",
        dataIndex: 'key',
        width: 50,
        align: 'center',
        editable: false
    },
    {
        title: "开始时间",
        dataIndex: 'startTime',
        valueType: 'time',
        width: 160,
        align: 'center'
    },
    {
        title: "结束时间",
        dataIndex: 'endTime',
        valueType: 'time',
        width: 160,
        align: 'center'
    },
    {
        title: "操作",
        valueType: 'option',
        width: 150,
        align: 'center',
        render: (text, record, _, action) => (
            <Space>
                <a
                    key="edit"
                    onClick={() => {
                        action?.startEditable(record.key || '')
                    }}
                >编辑</a>

                <Popconfirm
                    title="提醒"
                    description="确认要删除吗?"
                    onConfirm={() => onDeleteHandler(record.key)}
                >
                    <a
                        key="delete"
                    >删除</a>
                </Popconfirm>
                
            </Space>
        )
    }
]

export const isWorkDay = (day: string) => ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'].includes(day);

export const getMaxKey = (orderTime: IOrderTime[]) => {
    const keys = orderTime?.map(item => item.key) || [];
    if (keys.length === 0) {
        return 0;
    }
    return Math.max(...keys);
}