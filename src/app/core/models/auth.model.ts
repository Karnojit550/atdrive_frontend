export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    password: string;
    confirmPassword: string;
}

export interface User {
    id: string;
    username: string;
    email?: string;
    name?: string;
    role?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface AuthResponse {
    data: {
        token: string;
        user: User;
    }
}

export interface UserData {
    user: User;
    loginTime: string;
}
