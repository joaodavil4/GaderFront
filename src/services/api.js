import axios from 'axios'
import GADER_ENVIRONMENT from '../shared/constants/GADER_ENVIRONMENT'
 
const axiosInstance = axios.create({
    baseURL: 'http://gaderapp-001-site1.atempurl.com/api/', 
  }); 


// Requests interceptor
axiosInstance.interceptors.request.use(
  config => {
    
    // TODO: Get the environment code dynamicly
    config.headers.Environment = GADER_ENVIRONMENT.DEVELOPMENT
    // Do something before request is sent  
    return config
  },
  error => {
    // Do something with request error
    return Promise.reject(error)
  },
)

export default axiosInstance
