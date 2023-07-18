import { SortOrder } from "mongoose";

export enum SortType {
    Empty = '',
    Title = 'originalname',
    CreateAt = 'createAt' 
} 

export interface Sorting{
    type: SortType;
    value: SortOrder;
}