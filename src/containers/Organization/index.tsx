import { PageContainer, ProList } from "@ant-design/pro-components";
import { Button, Popconfirm, Tag } from "antd";
import { useDeleteOrg, useOrganizations } from "../../service/organization";
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
    const [ handleDel, delLoading ] = useDeleteOrg();

    // 关闭抽屉弹出框
    const onCloseHandler = () => {
        setShowEdit(false);
        refetch();
    }

    // 获取翻页
    const onPageChangeHandler = (pageNum: number, pageSize: number) => {
        refetch({
            page: {
                pageNum,
                pageSize
            }
        })
    }

    // 编辑函数
    const editInfoHandler = (id: string) => {
        setCurId(id);
        setShowEdit(true);
    }

    // 删除函数
    const delInfoHandler = async (id: string) => {
        console.log(id)
        handleDel(id, refetch);
    }

    // 新增门店
    const addInfoHandler = () => {
        setCurId('');
        setShowEdit(true);
    }

    const dataSource = data?.map((item) => ({
        ...item,
        key: item.id,
        subTitle: <div>{item.tags?.split(',').map((tag) => (<Tag key={tag} color="#5BD8A6">{tag}</Tag>))}</div>,
        actions: [
            <Button type="link" onClick={() => editInfoHandler(item.id)}>编辑</Button>,
            <Popconfirm
                title="提醒"
                okButtonProps={{
                    loading: delLoading
                }}
                description={`确定要删除 ${item.name} 吗?`}
                onConfirm={() => delInfoHandler(item.id)}
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
            <Button key="1" type="primary" onClick={addInfoHandler}>新增门店</Button>
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