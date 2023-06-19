import { Drawer } from "antd"

interface IProps {
    id?: string;
    onClose: () => void;
    open: boolean;
}

const EditCourse = ({
    id,
    onClose,
    open
}: IProps) => {
    return (
        <Drawer open={open} onClose={onClose}/>
    )
}

export default EditCourse;