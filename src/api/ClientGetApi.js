import axios from 'axios'
import { useState } from 'react';

function ClientGetApi(){ 

    //state loading
    const [loading,setLoading]=useState(true)
    //data
    const [data,setData]=useState(undefined)
    //error
    const [error,setError]=useState(undefined)

    const fetchProduct = async (ID)=>{
        try{
            setLoading(true)
            setError(undefined)
            const result = await axios({
                baseURL:"http://localhost:8080",
                url:"/product/"+ID,
                method:"GET",
            })
            console.log(result.data)
            setData(result.data)
        }catch(e){
            console.log(e)
            setError(e)
        }finally{
            setLoading(false)
        }
    }

    return {
        fetchProduct,
        loading,
        data,
        error
    }
}

export default ClientGetApi