import * as yup from 'yup'

// Define the product schema using Yup for validation
export const productSchema = yup.object({
  name: yup.string().required('Product name is required'),
  price: yup
    .number()
    .positive('Price must be a positive number')
    .required('Price is required'),
  description: yup.string().optional(),
})
