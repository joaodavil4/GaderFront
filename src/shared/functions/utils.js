const utils = {}

utils.IsNullOrEmpty = value=>{
    if (value === undefined || value === null || value === ``) return true
    return false
} 


export default utils
