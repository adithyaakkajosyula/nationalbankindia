export interface ComplaintsModel{
    id:number;
    userId:number;
    category:string;
    decription:string;
    date:Date;
    status:string;
    priority:string;
}
export interface PagedResult<T>{
    items: T[];
    totalcountnumber : number;
}