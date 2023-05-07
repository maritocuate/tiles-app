const path = require('path')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "lh3.googleusercontent.com",
            "res.cloudinary.com"
        ]
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'app')],
    },
}

module.exports = nextConfig
