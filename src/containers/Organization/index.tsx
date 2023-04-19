import { PageContainer, ProList } from "@ant-design/pro-components";
import { Button, Popconfirm, Tag } from "antd";
import { useOrganizations } from "../../service/organization";
import { DEFAULT_PAGE_SIZE } from "../../utils/constant";
import { useState } from "react";
import EditOrganization from "./components/EditOrganization";

/*
 * @Date: 2023-04-18 16:19:08
 * @Author: Bruce
 * @Description: 
 */
const Organization = () => {

    const { loading, refetch, page, data } = useOrganizations();
    const [ showEdit, setShowEdit ] = useState(false);
    const [ curId, setCurId ] = useState('');

    const onCloseHandler = () => {
        setShowEdit(false);
        refetch();
    }

    const onPageChangeHandler = (pageNum: number, pageSize: number) => {
        refetch({
            page: {
                pageNum,
                pageSize
            }
        })
    }
    console.log(data)
    const dataSource = data?.map((item) => ({
        ...item,
        key: item.id,
        subTitle: <div>{item.tags?.split('.').map((tag) => (<Tag key={tag} color="#5BD8A6">{tag}</Tag>))}</div>,
        actions: [
            <Button type="link">编辑</Button>,
            <Popconfirm
                title="提醒"
                description={`确定要删除 ${item.name} 吗?`}
            >
                <Button type="link">删除</Button>
            </Popconfirm>
        ],
        content:item.address
    }))

    return (
      <PageContainer
        loading={loading}
        header={{
            title: '门店管理'
        }}
        extra={[
            <Button type="primary">新增门店</Button>
        ]}
      >
          <ProList<any> 
            pagination={{
                defaultPageSize: DEFAULT_PAGE_SIZE,
                showSizeChanger: false,
                total: page?.total,
                onChange: onPageChangeHandler,
            }}
            grid={{ gutter: 10, column: 2 }}  // 2列, 每一列之间有10个像素的分隔
            showActions="always"
            rowSelection={false}
            metas={{
                title: {
                    dataIndex: 'name'
                },
                subTitle: {},
                type: {},
                avatar: {
                    dataIndex: 'logo'
                },
                content: {
                    dataIndex: 'address'
                },
                actions: {
                    cardActionProps: 'extra'
                }
            }}
            dataSource={dataSource}
          />
          {showEdit && (<EditOrganization id={curId} onClose={onCloseHandler}/>)}

      </PageContainer>  
    )
}

export default Organization;