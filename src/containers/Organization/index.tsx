import { PageContainer, ProList } from "@ant-design/pro-components";
import { Button } from "antd";
import { DEFAULT_PAGE_SIZE } from "../../utils/constant";

/*
 * @Date: 2023-04-18 16:19:08
 * @Author: Bruce
 * @Description: 
 */
const Organization = () => {
    return (
      <PageContainer
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
          />

      </PageContainer>  
    )
}

export default Organization;