/*
 * @Date: 2023-04-12 13:26:51
 * @Author: Bruce
 * @Description: 
 */
import { PageContainer, ProForm, ProFormInstance, ProFormText, ProFormTextArea } from "@ant-design/pro-components";
import { useMutation } from "@apollo/client";
import { Row, Col, message, Form } from "antd";
import { useEffect, useRef } from "react";
import OSSImageUpload from '../../components/OSSImageUpload'
import { UPDATE_USER } from "../../graphql/user";
import { useUserContext } from "../../hooks/userHooks";

/**
*   个人中心
*/
const My = () => {
    const formRef = useRef<ProFormInstance>();
    const { store } = useUserContext();
    const [ updateUserInfo ] = useMutation(UPDATE_USER);
    useEffect(()=>{
        if(!store.tel){
            return
        }
        formRef.current?.setFieldsValue({
            tel: store.tel,
            name: store.name,
            desc: store.desc,
            avatar: {
                url: store.avatar,
            }
        })
    }, [store])
    return (
        <PageContainer>
            <ProForm 
                formRef={formRef}
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
                        const res = await updateUserInfo({
                            variables: {
                                id: store.id,
                                params: {
                                    name: value.name,
                                    desc: value.desc,
                                    avatar: value.avatar.url,
                                }
                            }
                        })
                        if(res.data.update.code === 200){
                            message.success(res.data.update.message)
                        }else{
                            message.error(res.data.update.message)
                        } 
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
                        <Form.Item name="avatar">
                            <OSSImageUpload />
                        </Form.Item>                    
                    </Col>
                </Row>
            </ProForm>
        </PageContainer>
    );
};

export default My;    


