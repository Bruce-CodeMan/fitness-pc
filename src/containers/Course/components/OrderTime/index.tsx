/**
 * 可约时间
 * 
 */

import { Drawer, Tabs, Row, Col, Button } from "antd";
import { EditableProTable } from "@ant-design/pro-components";
import { RedoOutlined, ChromeOutlined } from "@ant-design/icons";

// Custom Imports
import { DAYS, IDay } from "./constants";
import { useState, useEffect } from "react";
import { getColumns } from "./constants";
import styles from "./index.module.less";
import { useCourse } from "../../../../service/course";

interface IProps {
    id: string;
    onClose: (isReload?: boolean) => void;
}

const OrderTime = ({
    id,
    onClose
}: IProps) => {

    const [ currentDay, setCurrentDay ] = useState<IDay>(DAYS[0]);

    const { getCourse, loading } = useCourse();

    useEffect(() => {
        const init = async () => {
            if(id) {
                const res = await getCourse(id);

            }
        }
    })

    const onTabChangeHandler = (key: string) => {
        const current = DAYS.find(item => item.key === key) as IDay;
        setCurrentDay(current);
    }

    const onDeleteHandler = () => {

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
            <EditableProTable 
                rowKey="key"
                recordCreatorProps={{
                    record: (index: number) => ({
                        key: index + 1,
                        startTime: '12:00:00',
                        endTime: '12:00:00'
                    })
                }}
                columns={getColumns(onDeleteHandler)}
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