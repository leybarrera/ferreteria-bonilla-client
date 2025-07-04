import validator from "ecuador-validator";
import validators from "validator";
const isValidDNI = (dni) => {
  return validator.ci(dni);
};

const isValidPhone = (phone) => {
  return validator.cellphone(phone);
};

const isValidEmail = (email) => {
  return validators.isEmail(email);
};

export default {
  isValidDNI,
  isValidPhone,
  isValidEmail,
};
