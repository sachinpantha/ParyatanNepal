import { CONNECT_ADD_GUIDE, CONNECT_REMOVE_GUIDE, CONNECT_SAVE_SHIPPING_ADDRESS, CONNECT_SAVE_PAYMENT_METHOD } from "../constants/connectConstants";

export const connectReducer = (state = { connectItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case CONNECT_ADD_GUIDE:
            const item = action.payload
            const existItem = state.connectItems.find((x) => x.guideId === item.guideId)
            if (existItem) {
                return {
                    ...state,
                    connectItems: state.connectItems.map((x) => x.guideId === existItem.guideId ? item : x)
                }
            } else {
                return {
                    ...state,
                    connectItems: [...state.connectItems, item]
                }
            }
        case CONNECT_REMOVE_GUIDE:
            return {
                ...state,
                connectItems: state.connectItems.filter((x) => x.guideId !== action.payload)
            }
        case CONNECT_SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload
            }
        case CONNECT_SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload
            }
        default:
            return state
    }
}
// import { CONNECT_REMOVE_GUIDE } from "../constants/connectConstants";