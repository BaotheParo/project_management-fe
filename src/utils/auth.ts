export const getToken = () => localStorage.getItem("token");

export const setToken = (token: string) => localStorage.setItem("token", token);

export const clearToken = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    };

    export const getUserRole = (): string | null => {
    const userData = localStorage.getItem("user");
    if (!userData) return null;

    try {
        const user = JSON.parse(userData);
        return user?.role || null;
    } catch {
        console.error("Invalid user data in localStorage");
        return null;
    }
};

export function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
}
