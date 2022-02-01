import axios from "axios"

const axiosInstance = axios.create({ baseURL: 'http://localhost:8080/' })

const api = {
  getProducts: () => {
    return  axiosInstance.get('products')
  },
  getProduct:  (id) => {
    return  axiosInstance.get(`product/${id}`)
  },
  addToCart: (id, data) => {
    return  axiosInstance.post(`addToCart/${id}`, data)
  },
  getCartEndPoint:()=>{
    return axiosInstance.get('cart')
  },
  getUpdateCartEndPoint:(id,data)=>{
    return axiosInstance.post(`updateCart/${id}`,data)
  },
  getEmptyCart:()=>{
    return axiosInstance.get('emptyCart')
  },
  getCheckout:()=>{
    return axiosInstance.get('checkout')
  },
  loginEndPoint:(email,password)=>{
    return axiosInstance.post('login',{email: email,password: password})
  }
}

window.api = api
export default api