import * as yup from "yup"


export const signupSchema = yup.object().shape({
  Phone: yup.string().required("Phone Number is required"),
})

export const otpSchema = yup.object().shape({
  otp: yup.string().length(6, "OTP must be exactly 6 digits").required("OTP is required"),
});