export interface AuthUser {
    id:string;
    email:string;
    username:string;
    name:string;
    avatar_url?:string;
}

export interface AuthContextType{
    user:AuthUser | null;
    loading:boolean;
    isAuthenticated:boolean;
    error:string | null;
    login: (email:string,password:string)=>Promise<void>;
    register:(email:string,password:string,name:string,username:string)=>Promise<void>;
    logout:()=>void;
    initializeUser:()=>Promise<void>;
}