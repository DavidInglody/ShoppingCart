import { DECREASE, DELETE, DISPLAY_ITEMS, INCREASE, LOADING, REMOVE_ALL } from "./actions"

export const reducer = (state,action)=>{
    if(action.type === LOADING){
        return {...state,loading:true}
    }
    if(action.type === DISPLAY_ITEMS){
        const newCart = new Map(action.payload.cart.map((item)=>[item.id, item]))
        return {...state, loading:false, cart:newCart}
    }
    if(action.type === REMOVE_ALL){
        const newCart = new Map()
        return{...state, cart: newCart }
    }
    if(action.type === DELETE) {
        const newCart = new Map(state.cart)
        const itemId = action.payload.id
        newCart.delete(itemId)
        return {...state,cart:newCart}
    }
    if(action.type === INCREASE) {
        const newCart = new Map(state.cart)
        const itemId = action.payload.id
        const item = newCart.get(itemId)
        const newItem= {...item,amount:item.amount+1}
        newCart.set(itemId,newItem)
        return {...state,cart:newCart}
    }
    if(action.type === DECREASE){
        const newCart = new Map(state.cart)
        const itemId = action.payload.id
        const item = newCart.get(itemId)
        const newItem = {...item, amount:item.amount-1}
        if(newItem.amount === 0){
            newCart.delete(itemId)
            return {...state,cart:newCart}
        }
        newCart.set(itemId,newItem)
        return {...state,cart:newCart}
    }
    
}
