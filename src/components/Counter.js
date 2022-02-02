import { CartState } from "../context/Context";
import Button from "react-bootstrap/Button";
import {useState}from 'react'
import "../assets/counter.css"

export default function Counter({available,quantityProduct,productId,productAmount}){
    const [counter,setCounter]=useState(quantityProduct)
    const { updateQuantity,updateCart } = CartState();

    const addCount=()=>{
        if(counter>=1 && counter<available)setCounter(counter+1)   
    }
    const decrCount=()=>{
        if(counter>1)setCounter(counter-1)
    }

    const getAmount = (productAmount, productQuantity) => {
        const singleAmount = productAmount * productQuantity;
        return <span><h6>Amount: {singleAmount}$</h6></span>;
      };

    return <div className="btn-counter" style={{display: 'flex'}}>
        <div className="flex-btn-counter"
        style={{
            display: "flex",
            alignItems:"baseline"
        }}
        >
       
        <Button onClick={()=>decrCount()}>-</Button>
        <span>Quantity: {counter}</span>
        <Button onClick={()=>addCount()} style={{}}>+</Button>
        {getAmount(productAmount,quantityProduct)}
        </div>
        
        <div className="flex-btn-counter"
        style={{
            display: "flex",
            justifyContent:"start"
        }}
        >  
        <Button onClick={()=>updateQuantity(productId,counter)} style={{marginRight:'10px'}} >Confirm quantity</Button>
        <Button onClick={()=>updateCart(productId,"clearId")}>X</Button>
        </div>
        
    </div>
}