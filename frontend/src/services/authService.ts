// src/services/authService.ts
import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export interface LoginRequest {
    username: string;
    password: string;
}

export interface User {
    username: string;
    role: string;
}

export async function login(credentials: LoginRequest): Promise<User> {
    const response = await axios.post(`${API_URL}/auth/login`, credentials, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
    });
    return response.data;
}

export async function getCurrentUser(): Promise<User> {
    const response = await axios.get(`${API_URL}/me`, {
        withCredentials: true,
    });
    return response.data;
}

export async function logout(): Promise<void> {
    await axios.post(`${API_URL}/auth/logout`, {}, {
        withCredentials: true,
    }).catch(() => {});
}
