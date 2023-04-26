/*
 * @Date: 2023-04-18 16:45:48
 * @Author: Bruce
 * @Description: 
 */
import { Drawer, Button, Form, Row, Col, Input, Select, Spin, UploadFile } from "antd";
import OSSImageUpload from "../../../../components/OSSImageUpload";
import { useOrganization } from "../../../../service/organization";
import { useMemo } from "react";
import { IOrganization } from "../../../../utils/types";

interface IProp {
    id: string;
    onClose: () => void;
}

const EditOrganization = ({id, onClose}: IProp) => {
    const [form] = Form.useForm();
    const { data, loading: queryLoading } = useOrganization(id);

    const initValue = useMemo(() => (data? {
        ...data,
        tags: data.tags?.split(','),
        logo: [{ url: data.logo }],
    }: {}), [data])

    const onFinishHandler = async () => {
        const values = await form.validateFields();
        if(values) {
            const formData = {
                ...values,
                logo: values.logo[0].url,
                tags: values.tags[0].join(','),
                identityCardBackImg: values.identityCardBackImg[0].url,
                identityCardFrontImg: values.identityCardFrontImg[0].url,
                businessLicense: values.businessLicense[0].url,
                orgFrontImg: values?.orgFrontImg?.map((item: UploadFile) => ({ url: item.url })),
                orgRoomImg: values?.orgRoomImg?.map((item: UploadFile) => ({ url: item.url })),
                orgOtherImg: values?.orgOtherImg?.map((item: UploadFile) => ({ url: item.url })),
            } as IOrganization;
        }
    }

    if(queryLoading) {
        return <Spin />
    }

    return (
        <Drawer
            title="编辑门店信息"
            width="70vh"
            onClose={onClose}
            open
            footerStyle={{ textAlign: 'right' }}
            footer={(
                <Button
                    type="primary"
                    onClick={onFinishHandler}
                >
                    保存
                </Button>
            )}
        >
            <Form layout="vertical" initialValues={initValue}>
                <Row gutter={20}>
                    <Col span={10}>
                        <Form.Item 
                            style={{ width:'100%' }} 
                            label="Logo" 
                            name="logo" 
                            rules={[{ required: true }]}
                        >
                            <OSSImageUpload label="替换logo"/>
                        </Form.Item>
                    </Col>
                    <Col span={14}>
                        <Form.Item
                            style={{ width: '100%' }}
                            label="名称"
                            name="name"
                            rules={[{ required: true }]}
                        >
                            <Input placeholder="请输入门店名称"/>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={20}>
                    <Col span={11}>
                        <Form.Item
                        label="标签"
                        name="tags"
                        rules={[{ required: true }]}
                        >
                        <Select
                            mode="tags"
                            style={{ width: '100%' }}
                            placeholder="请输入标签"
                        />
                        </Form.Item>
                    </Col>
                    <Col span={5}>
                        <Form.Item
                        label="手机号"
                        name="tel"
                        rules={[{ required: true }]}
                        >
                        <Input placeholder="请输入手机号" />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                        label="经度"
                        name="longitude"
                        rules={[{ required: true }]}
                        >
                        <Input placeholder="请输入经度" />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                        label="纬度"
                        name="latitude"
                        rules={[{ required: true }]}
                        >
                        <Input placeholder="请输入纬度" />
                        </Form.Item>
                    </Col>
                </Row>

                <Form.Item
                    label="地址"
                    name="address"
                    rules={[{ required: true }]}
                >
                <Input placeholder="请输入地址" />
                </Form.Item>
                <Form.Item
                    label="门店简介"
                    name="description"
                    rules={[{ required: true }]}
                >
                <Input.TextArea
                    maxLength={500}
                    rows={5}
                    allowClear
                    showCount
                />
                </Form.Item>

                <Row gutter={20}>
                    <Col span={8}>
                        <Form.Item
                        style={{ width: '100%' }}
                        label="营业执照"
                        name="businessLicense"
                        rules={[{ required: true }]}
                        >
                        <OSSImageUpload
                            label="替换营业执照"
                            maxCount={1}
                            imgCropAspect={3 / 2}
                        />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        style={{ width: '100%' }}
                        label="身份证正面"
                        name="identityCardFrontImg"
                        rules={[{ required: true }]}
                        >
                        <OSSImageUpload
                            label="替换身份证"
                            maxCount={1}
                            imgCropAspect={3 / 2}
                        />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                        style={{ width: '100%' }}
                        label="身份证背面"
                        name="identityCardBackImg"
                        rules={[{ required: true }]}
                        >
                        <OSSImageUpload
                            label="替换身份证"
                            maxCount={1}
                            imgCropAspect={3 / 2}
                        />
                        </Form.Item>
                    </Col>
                    </Row>

            </Form>
        </Drawer>
    )
}

export default EditOrganization;