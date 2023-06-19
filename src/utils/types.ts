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
    refetchHandler?: () => void;
    currentOrg?: string;
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

export interface ICourse {
    id: string;
    name: string;
    desc?: string;
    group?: string;     // 适龄人群
    baseAbility?: string;
    limitNumber: number; // 限制人数
    duration: number;    // 持续时长
    reserveInfo?: string;
    refundInfo?: string;
    otherInfo?: string;
}

export type TCoursesQuery = { [key: string]: { __typename?: 'Query', data: ICourse[], page: IPage } }

export type TBaseCourse = Partial<ICourse>