/**
 * 可约时间
 * 
 */

import { Drawer, Tabs, Row, Col, Button, Space } from "antd";
import { EditableProTable } from "@ant-design/pro-components";
import { RedoOutlined, ChromeOutlined } from "@ant-design/icons";
import { useState, useMemo } from "react";
import _ from 'lodash';

// Custom Imports
import { DAYS, IDay } from "./constants";
import { getColumns } from "./constants";
import styles from "./index.module.less";
import { IOrderTime } from "../../../../utils/types";
import { useCourseInfo, useEditCourseInfo } from "../../../../service/course";

interface IProps {
    id: string;
    onClose: (isReload?: boolean) => void;
}

const OrderTime = ({
    id,
    onClose
}: IProps) => {

    const [ currentDay, setCurrentDay ] = useState<IDay>(DAYS[0]);
    const { data, loading, refetch } = useCourseInfo(id);
    const [ edit, editLoading ] = useEditCourseInfo();

    const orderTime = useMemo(
        () => (data?.reducibleTime || []).find((item) => item.week 
        === currentDay.key)?.orderTime as IOrderTime[],
        [data]
    )

    const onTabChangeHandler = (key: string) => {
        const current = DAYS.find(item => item.key === key) as IDay;
        setCurrentDay(current);
    }

    

    const onSaveHandler = (ot: IOrderTime[]) => {
        const rt = [...(data?.reducibleTime || [])]
        const index = rt.findIndex((item) => item.week === currentDay.key)
        if(index > -1) {
            rt[index] = {
                week: currentDay.key,
                orderTime:ot
            }
        }else{
            rt.push({
                week: currentDay.key,
                orderTime: ot
            })
        }
        edit(id, {
            reducibleTime: rt
        }, () => refetch())
    }

    const onDeleteHandler = (key: number) => {
        const newData = orderTime.filter((item) => item.key !== key);
        onSaveHandler(newData);
    }

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
                loading={loading || editLoading}
                rowKey="key"
                recordCreatorProps={{
                    record: (index: number) => ({
                        key: index + 1,
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
                    >全工作日同步</Button>
                </Col>
                <Col span={12}>
                    <Button
                        icon={<ChromeOutlined/>}
                        style={{ width: '100%' }}
                        type="primary"
                        danger
                    >全周同步</Button>
                </Col>
            </Row>
        </Drawer>
    )
}

export default OrderTime;