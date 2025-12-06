import { createSlice } from "@reduxjs/toolkit";


let initialState: any  = {
    data:[
    ],
    idList: [],
    quantity: [{
        productId:'',
        quantity: 0,
        name: ''
    }],
    totalAmount: 0,
    payment: {
    contact: {
        name:'',
        surname:'',
        phone:'',
        email:''
    },
    delivery: false,
    address: {
        item: '',
        comment: ''
    },
    payOnline: false
    }

}

export const BasketSlice = createSlice({
    name: 'basket',
    initialState: initialState,
    reducers : {
        getBasket (state, action) {
            
            if(action?.payload?.length)
            {
                state.data = action?.payload
                state.idList = state?.data?.map((item:any) => item.productId)
                state.quantity = state.data?.reduce((acc:any, item:any) => {
                    const {productId} = item
                    const {palette} = item
                    if (!acc.length) {
                        acc.push({ productId,  quantity: 1, palette})
                    } else {
                    let array = acc.find((item:any) => {
                        if(item.productId == productId && item.palette == palette) {
                            return true
                        } else {
                            return false
                        }
                    })
                        array ? array.quantity++ : acc.push({productId, quantity: 1, palette})
                    }
                return acc

                }, [])
                state.quantity = state?.quantity?.filter((item:any) => item.productId !== null )
            }
            else
            {
                state.data = []
                state.idList = []
            }
        },
        setAmount (state, {payload}){
            state.totalAmount = payload
        },
    }
})

export const {getBasket, setAmount} = BasketSlice.actions
export default BasketSlice.reducer
