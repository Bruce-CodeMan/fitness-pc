import { PageContainer, ProTable } from "@ant-design/pro-components";
import { ICourse } from "../../utils/types";
import { COLUMNS } from "./constants";

const Course = () => {


    return (
        <PageContainer header={{ title: "当前门店下开设的课程" }}>
            <ProTable<ICourse>
                columns={COLUMNS}
                dataSource={[
                    {
                        id: '222',
                        name: "xxx",
                        duration: 30,
                        limitNumber: 10
                    }
                ]}
             />
        </PageContainer>
    )
}

export default Course;