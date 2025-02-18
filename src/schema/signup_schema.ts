import * as yup from "yup"


export const signupSchema = yup.object().shape({
  Phone: yup.string().required("Phone Number is required"),
})
