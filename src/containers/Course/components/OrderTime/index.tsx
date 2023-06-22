/**
 * 可约时间
 * 
 */

import { Drawer, Tabs, Row, Col, Button, Space } from "antd";
import { EditableProTable } from "@ant-design/pro-components";
import { RedoOutlined, ChromeOutlined } from "@ant-design/icons";
import { useState } from "react";
import _ from 'lodash';

// Custom Imports
import { DAYS, IDay, getMaxKey, isWorkDay } from "./constants";
import { getColumns } from "./constants";
import styles from "./index.module.less";
import { IOrderTime } from "../../../../utils/types";
import { useOrderTime } from "./hooks";

interface IProps {
    id: string;
    onClose: (isReload?: boolean) => void;
}

const OrderTime = ({
    id,
    onClose
}: IProps) => {

    const [ currentDay, setCurrentDay ] = useState<IDay>(DAYS[0]);

    const onTabChangeHandler = (key: string) => {
        const current = DAYS.find(item => item.key === key) as IDay;
        setCurrentDay(current);
    }

    const {
        orderTime,
        loading,
        onDeleteHandler,
        onSaveHandler,
        allWeekDaySyncHandler,
        allWorkDaySyncHandler,
    } = useOrderTime(id, currentDay.key)

    return (
        <Drawer
            title="编辑预约时间"
            width={720}
            open
            onClose={() => onClose()}
            forceRender
        >
            <Tabs 
                type="card"
                items={DAYS}
                onChange={onTabChangeHandler}
            />
            <EditableProTable<IOrderTime> 
                headerTitle={(
                    <Space>
                        选择
                        <span className={ styles.name }>
                            {currentDay.label}
                        </span>
                        的课开放预约的时间
                    </Space>
                )}
                value={orderTime}
                loading={loading}
                rowKey="key"
                recordCreatorProps={{
                    record: () => ({
                        key: getMaxKey(orderTime) + 1,
                        startTime: '12:00:00',
                        endTime: '12:00:00'
                    })
                }}
                columns={getColumns(onDeleteHandler)}
                editable={{
                    onSave: async (rowKey, d) => {
                        let newData = [];
                        if(orderTime?.findIndex((item) => item.key === rowKey) > -1) {
                            newData = orderTime?.map((item) => (item.key === rowKey? _.omit(d, 'index'): {...item}))
                        }
                        newData = [...orderTime, _.omit(d, 'index')]
                        onSaveHandler(newData)
                    }
                }}
            />
            <Row gutter={20} className={styles.buttons}>
                <Col span={12}>
                    <Button
                        icon={<RedoOutlined />}
                        style={{ width: '100%' }}
                        type="primary"
                        onClick={allWorkDaySyncHandler}
                        disabled={!isWorkDay(currentDay.key)}
                    >全工作日同步</Button>
                </Col>
                <Col span={12}>
                    <Button
                        icon={<ChromeOutlined/>}
                        style={{ width: '100%' }}
                        type="primary"
                        danger
                        onClick={allWeekDaySyncHandler}
                    >全周同步</Button>
                </Col>
            </Row>
        </Drawer>
    )
}

export default OrderTime;