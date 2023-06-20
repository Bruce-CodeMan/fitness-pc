/**
 * 可约时间
 * 
 */

import { Drawer, Tabs } from "antd";

// Custom Imports
import { DAYS, IDay } from "./constants";
import { useState } from "react";

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
        </Drawer>
    )
}

export default OrderTime;