import { createContext, useContext, useEffect, useReducer } from "react";
import cartItems from "./data";
import{reducer} from "./reducer"
import { DECREASE, DELETE, DISPLAY_ITEMS, INCREASE, LOADING, REMOVE_ALL } from "./actions";
import { money } from "./utils";

  const url = 'https://www.course-api.com/react-useReducer-cart-project'

  const defaultState = {
    cart: new Map(),
    loading: false
  }

const createGlobalContext = createContext()
export const useGlobalContext = () => useContext(createGlobalContext)

const AppContext = ({children}) => {
  const [state,dispatch] = useReducer(reducer,defaultState)
  
  const delete_all= ()=>{
    dispatch({type:REMOVE_ALL})
  }
  const remove = (id)=>{
    dispatch({type:DELETE, payload:{id}})
  }
  const increase=(id) =>{
    dispatch({type:INCREASE, payload:{id}})
  }
  const decrease =(id)=>{
    dispatch({type:DECREASE, payload:{id}})
  }
  
  const fetchData = async()=>{
    dispatch({type:LOADING})
    const response = await fetch(url)
    const cart = await response.json()
    dispatch({type:DISPLAY_ITEMS, payload:{cart}})
  }
  useEffect(()=>{
    fetchData()
  },[])

  const {totalAmount,totalCost} = money(state.cart)

  return <createGlobalContext.Provider value={{...state,delete_all,totalAmount,totalCost,remove,increase,decrease}}>
    {children}
  </createGlobalContext.Provider>
}
export default AppContext