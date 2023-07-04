import {useSelector} from "react-redux";

const useCart = () => {
    const cart = useSelector(state => state.cart.cart)
    let totalQuantity = 0
    let totalPrice = 0

    cart.forEach(item => {
        totalQuantity += item.quantity
        totalPrice += item.prix * item.quantity
    })

    return [totalQuantity, totalPrice]
}

export default useCart