import Utils from './utils'
const validations = {}

validations.validateEmail = email => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}

validations.validatePasswordRequirements = password=>{
  const minimalPasswordLength = 6
  return !Utils.IsNullOrEmpty(password) && password.toString().length >= minimalPasswordLength 
}

export default validations
