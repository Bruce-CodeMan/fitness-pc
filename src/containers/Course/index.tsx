import { PageContainer, ProTable } from "@ant-design/pro-components";
import { ICourse } from "../../utils/types";
import { COLUMNS } from "./constants";
import { useCourses } from "../../service/course";

const Course = () => {

    const { data } = useCourses();
    console.log("data: ", data);
    return (
        <PageContainer header={{ title: "当前门店下开设的课程" }}>
            <ProTable<ICourse>
                columns={COLUMNS}
                dataSource={data}
             />
        </PageContainer>
    )
}

export default Course;