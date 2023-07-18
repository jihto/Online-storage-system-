export enum SortType {
    Empty = '',
    Title = 'originalname',
    CreateAt = 'createAt', 
    Type = "type"
}
export enum SortValue{
    Empty = '',
    ASC = 'asc',
    DESC = 'desc',
}

export interface Sorting{
    type: SortType;
    value: SortValue;
}