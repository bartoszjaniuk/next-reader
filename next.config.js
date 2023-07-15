/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    JWT_SECRET: "MZ(j:&~3TF)XkYzGkk:vg.a)^3v(^8sdd23223",
    BACKEND_API: "https://pdf-serializer-api.onrender.com/api/v1",
    CLOUD_NAME: "dxmctaf18",
    UPLOAD_PRESET_NAME: "cmz1iqzm",
    // BACKEND_API: "http://localhost:1337/api/v1",
  },
  images: {
    domains: ["res.cloudinary.com", "m.media-amazon.com"],
  },
};

module.exports = nextConfig;
