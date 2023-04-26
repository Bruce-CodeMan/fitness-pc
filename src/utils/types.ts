/*
 * @Date: 2023-04-10 09:40:33
 * @Author: Bruce
 * @Description: 
 */
export interface IPropChild {
    children: React.ReactNode;
}

/**
 * 用户
 */
export interface IUser {
    id: string;
    tel: string;
    name: string;
    desc: string;
    avatar: string;
}

/**
 * 照片
 */
export interface IMedia {
    id: string;
    url: string;
    remark: string;
}

/**
 * 分页
 */
export interface IPage {
    pageNum: number;
    pageSize: number;
    total: number;
}

/**
 *  门店
 */
export interface IOrganization {
    id: string;
    orgFrontImg?: IMedia[];
    orgRoomImg?: IMedia[];
    orgOtherImg?: IMedia[];
    name: string;
    logo: string;
    tags?: string;
    description?: string;
    address?: string;
    tel?: string;
    longitude?: string;
    latitude?: string;
    identityCardFrontImg: string;
    identityCardBackImg: string;
    businessLicense: string;
}

export type TBaseOrganization = Partial<IOrganization>;
export type TOrganizationsQuery = { [key: string]: { _typename?: 'Query', data: IOrganization[], page: IPage } };
export type TOrganizationQuery = { [key: string]: { _typename?: 'Query', data: IOrganization } };
