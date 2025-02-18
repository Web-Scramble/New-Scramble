import * as yup from "yup"


export const signupSchema = yup.object().shape({
  Phone: yup.string().required("Email or phone is required"),
})
