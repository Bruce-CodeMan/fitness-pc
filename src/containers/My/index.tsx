/*
 * @Date: 2023-04-12 13:26:51
 * @Author: Bruce
 * @Description: 
 */
import { PageContainer, ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Row, Col, message } from "antd";
import OSSImageUpload from '../../components/OSSImageUpload'

/**
*   首页
*/
const My = ({}) => {
    return (
        <PageContainer>
            <ProForm 
                layout="horizontal"
                submitter={{
                    resetButtonProps: {
                        style: {
                            display:'none'
                        }
                    }
                }}
                onFinish={
                    async (value) => {
                        message.success('更新成功')
                    }
                }
            >
                <Row gutter={200}>
                    <Col>
                        <ProFormText name="tel" label="手机号" tooltip="不能修改" disabled/>
                        <ProFormText name="name" label="昵称" placeholder="请输入昵称"/>
                        <ProFormTextArea name="desc" label="简介" placeholder="请输入简介"/>
                    </Col>
                    <Col>
                        <OSSImageUpload />
                    </Col>
                </Row>
            </ProForm>
        </PageContainer>
    );
};

export default My;    


