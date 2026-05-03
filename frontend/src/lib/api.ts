export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchUser() {
    const res = await fetch(`${API_URL}/me`, {
        // headers: {
        //     Authorization: `Bearer ${token}`,
        // },
        credentials: "include",
    })

    const data = await res.json()
    
    if(!res.ok) {
        throw new Error(data.message);
    }

    return data.data;
}

export async function logout() {
    const res = await fetch(`${API_URL}/logout`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
}

export async function createUser(fullname: string, email: string, password: string) {
    const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullname, email, password }),
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data;
}

export async function loginUser(email: string, password: string) {
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(data.message);
    }

    return data
}