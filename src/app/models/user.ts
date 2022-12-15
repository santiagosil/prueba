export interface User{
    id:number;
    name:string;
    username:string;
    email:string;
    phone:string;
}

export const userEmpty:User = {
    id:0,
    email:'',
    name:'',
    phone:'',
    username:''
}