import { Drawer } from "antd";
import { EditableProTable } from '@ant-design/pro-components';
import { ICard } from "../../../../utils/types";
import { getColumns } from "./constants";
import { useCards, useDeleteCard, useEditCardInfo } from "../../../../service/card";

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
    const [ del, delLoading ] = useDeleteCard();

    const onDeleteHandler = (key: string) => {
        del(key, refetch);
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
            <EditableProTable<ICard>
                headerTitle="请管理该课程的消费卡"
                rowKey="id"
                loading={loading || editLoading || delLoading}
                columns={getColumns(onDeleteHandler)}
                editable={{
                    onSave: async (rowKey, d) => {
                        onSaveHandler(d)
                    },
                    onDelete: async (key) => {
                        onDeleteHandler(key as string);
                    }
                }}
                value={data}
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