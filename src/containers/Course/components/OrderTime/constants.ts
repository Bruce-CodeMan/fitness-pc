type TWEEK = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'

export interface IDay {
    key: TWEEK;
    label: string;
}

export const DAYS: IDay[] = [
    {
        key: 'monday',
        label: '周一'
    },
    {
        key: 'tuesday',
        label: '周二'
    },
    {
        key: 'wednesday',
        label: '周三'
    },
    {
        key: 'thursday',
        label: '周四'
    },
    {
        key: 'friday',
        label: '周五'
    },
    {
        key: 'saturday',
        label: '周六'
    },
    {
        key: 'sunday',
        label: '周日'
    }
]