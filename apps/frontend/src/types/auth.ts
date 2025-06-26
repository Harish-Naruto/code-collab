export interface AuthUser {
    id: string;
    email: string;
    username: string;
    name: string;
    avatar_url?: string;
}

type Apicall ={
        success: boolean;
        message?: undefined;
    } | {
        success: boolean;
        message: string;

    }

export interface AuthContextType {
    user: AuthUser | null;
    loading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<Apicall>;
    register: (user: User) => Promise<Apicall>;
    logout: () => void;
    ForgotPassword: (email:string) => Promise<Apicall>;
    resetPassword: (newPassword: string) =>Promise<Apicall>;
    verifyOtp: (email: string, otp: string) => Promise<Apicall>;
}


export type User = {
    email: string;
    username: string;
    name: string;
    avatar_url?: string;
    password: string;
}