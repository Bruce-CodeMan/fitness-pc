/*
 * @Date: 2023-04-12 13:26:51
 * @Author: Bruce
 * @Description: 
 */
import { ProForm, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { Row, Col } from "antd";

/**
*   首页
*/
const My = ({}) => {
    return (
        <div>
            <ProForm>
                <Row>
                    <Col>
                        <ProFormText name="tel" label="手机号" tooltip="不能修改" disabled/>
                        <ProFormText name="name" label="昵称" placeholder="请输入昵称"/>
                        <ProFormTextArea name="desc" label="简介" placeholder="请输入简介"/>
                    </Col>
                    <Col>
                        <ProFormText />
                    </Col>
                </Row>
            </ProForm>
        </div>
    );
};

export default My;    


