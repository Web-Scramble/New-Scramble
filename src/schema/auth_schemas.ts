import * as yup from "yup";

export const signupSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{7,10}$/, "Phone number must be between 7 and 10 digits"),
});


export const otpSchema = yup.object().shape({
  otp: yup.string().length(6, "OTP must be exactly 6 digits").required("OTP is required"),
});
export const accountSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  fullName: yup.string().required("Full name is required"),
});