import { configureStore, createSlice } from "@reduxjs/toolkit";


const productsSlice=createSlice({
    name:'products',
    initialState:{
        veg:[
            {name:'Tomato' ,price:200.0},
            {name:'Potato',price:100.8},

        ],
        nonveg:[
            
                {name:'Chicken',price:800.0},
                {name:'Fish',price:1000.0},
            
        ],
    },
    reducers:{}
});


const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:
    {
        addToCart:(state,action)=>{
            const item=state.find(item=>item.name===action.payload.name);
            if(item)
            {
             item.quantity+=1;   
            }
            else{
                state.push({...action.payload, quantity:1});
            }
        },
        
        
       
        
        
        
        increament: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                item.quantity += 1;
            }
        },
        
        decreament: (state, action) => {
            const item = state.find(item => item.name === action.payload.name);
            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1; // Decrease quantity
                } else {
                    return state.filter(item => item.name !== action.payload.name); // Remove item if quantity is 1
                }
            }
            return state; // Return the modified state
        },
        remove: (state, action) => {
            return state.filter(item => item.name !== action.payload.name);
            console.log("Removing item:", action.payload.name);
        }
        
    }      



})

const store=configureStore({
    reducer:
    {
        products:productsSlice.reducer,
        cart: cartSlice.reducer,
    }

})
export const {addToCart,increament,decreament,remove}=cartSlice.actions;
export default store;
