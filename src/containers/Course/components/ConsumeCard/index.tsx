import { Drawer } from "antd";
import { EditableProTable } from '@ant-design/pro-components';
import { ICard } from "../../../../utils/types";
import { getColumns } from "./constants";
import { useCards, useEditCardInfo } from "../../../../service/card";

interface IProps {
    id: string;
    onClose: (isReload?: boolean) => void;
}

const ConsumeCard = ({
    onClose,
    id
}: IProps) => {

    const { data, loading, refetch } = useCards(id)
    const [ edit, editLoading ] = useEditCardInfo();

    const onDeleteHandler = (key: string) => {
        
    }

    const onSaveHandler = (d: ICard) => {
        edit(d.id, id, {
            name: d.name,
            type: d.type,
            time: d.time,
            validatyDay: d.validatyDay
        }, refetch)
    }

    return (
        <Drawer
            title="关联消费卡"
            width="70vw"
            open
            onClose={()=>onClose()}
        >   
            <EditableProTable 
                headerTitle="请管理该课程的消费卡"
                rowKey="id"
                loading={loading || editLoading}
                columns={getColumns(onDeleteHandler)}
                editable={{
                    onSave: async(rowKey, d) => {
                        onSaveHandler(d)
                    }
                }}
                recordCreatorProps={{
                    record: ()=>({
                        id: "new",
                        name: "",
                        type: "time",
                        time: 0,
                        validatyDay: 0
                    })
                }}
            />
        </Drawer>
    )
}

export default ConsumeCard;