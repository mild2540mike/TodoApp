/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        NEXT_PUBLIC_TODO_BASE_URL: process.env.NEXT_PUBLIC_TODO_BASE_URL,
        NEXT_PUBLIC_TODO_API_ENDPOINT: process.env.NEXT_PUBLIC_TODO_API_ENDPOINT,
        NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SALT: process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SALT,
        NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SECRET: process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_SECRET,
        NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_ENABLE: process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_ENCRYPT_ENABLE,
        NEXT_PUBLIC_TODO_SERVER_CLIENT_COOKIE_EXPIRE_MINUTE: process.env.NEXT_PUBLIC_TODO_SERVER_CLIENT_COOKIE_EXPIRE_MINUTE,
        NEXT_PUBLIC_TODO_STORE_COOKIE_ENCRYPT_SECRET: process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_ENCRYPT_SECRET,
        NEXT_PUBLIC_TODO_STORE_COOKIE_ENCRYPT_SALT: process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_ENCRYPT_SALT,
        NEXT_PUBLIC_TODO_STORE_COOKIE_EXPIRE_MINUTE: process.env.NEXT_PUBLIC_TODO_STORE_COOKIE_EXPIRE_MINUTE,
    },
};

export default nextConfig;
