import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Button, Drawer } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

// Custom Imports
import { ICourse } from "../../utils/types";
import { COLUMNS } from "./constants";
import { useCourses } from "../../service/course";
import { DEFAULT_PAGE_SIZE } from "../../utils/constant";
import EditCourse from "./components/EditCourse"


const Course = () => {

    const { data, refetch } = useCourses();
    const [ showInfo, setShowInfo ] = useState(false);
    const onClickAddHandler = () => {
        setShowInfo(true)
    }
    return (
        <PageContainer header={{ title: "当前门店下开设的课程" }}>
            <ProTable<ICourse>
                columns={COLUMNS}
                dataSource={data}
                pagination={{
                    pageSize: DEFAULT_PAGE_SIZE
                }}
                toolBarRender={()=> [
                    <Button type="primary" onClick={onClickAddHandler} key="add" icon={<PlusOutlined />}>新建</Button>
                ]}
                request={async (
                    // 第一个参数 params 查询表单和params参数的结合
                    // 第一个参数中一定会有 pageSize 和 current
                    params: {
                        name?: string;
                        pageSize?: number;
                        current?: number;
                    }
                ) => {
                    // 这里需要返回一个 Promise，在返回之前你可以进行数据转化
                    // 如果需要转化参数可以在这里进行修改
                    const msg = await refetch(
                        params.current,
                        params.pageSize,
                        params.name,
                    );
                    return {
                        data: msg.data,
                        // success请返回true, 不然table会停止解析数据
                        success:msg.success,
                        total: msg.page?.total || 0
                    }
                }} 
             />
             <EditCourse open={showInfo} onClose={()=>setShowInfo(false)}/>
        </PageContainer>
    )
}

export default Course;