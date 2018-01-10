const apiConfig = {
  apiUrl: process.env.REACT_APP_NNB_API_URL
}

const cloudinaryConfig = {
  cloud_name: process.env.REACT_APP_NNB_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_NNB_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_NNB_CLOUDINARY_API_SECRET
}

export { apiConfig, cloudinaryConfig }
