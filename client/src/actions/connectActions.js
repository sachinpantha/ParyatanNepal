import axios from 'axios'
import { CONNECT_ADD_GUIDE, CONNECT_REMOVE_GUIDE, CONNECT_SAVE_SHIPPING_ADDRESS, CONNECT_SAVE_PAYMENT_METHOD } from '../constants/connectConstants'
export const connectToGuide = (id, time) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/guides/${id}`)
    dispatch({
        type: CONNECT_ADD_GUIDE,
        payload: {
            guideId: data._id,
            name: data.name,
            image: data.image,
            fees: data.fees,
            status: data.isAvailable,
            time,
        },
    }
    )
    //SAVING IN LOCALSTORAGE
    localStorage.setItem('connectItems', JSON.stringify(getState().connect.connectItems))
}
export const removeFromConnection = (id) => (dispatch, getState) => {
    dispatch({ type: CONNECT_REMOVE_GUIDE, payload: id })
    localStorage.setItem('connectItems', JSON.stringify(getState().connect.connectItems))
}
export const SaveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: CONNECT_SAVE_SHIPPING_ADDRESS, payload: data })
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}
export const SavePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: CONNECT_SAVE_PAYMENT_METHOD, payload: data })
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}