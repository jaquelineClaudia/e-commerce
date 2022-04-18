import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPurchaseThunk, deleteProductThunk } from '../redux/actions';
import '../styles/cart.css';

const Cart = ({isCartOpen, setIsCartOpen}) => {

    const cartProducts = useSelector(state => state.cartProducts);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [ checkoutTotal, setCheckoutTotal ] = useState(0);

    const clickedProduct = id => {
        navigate(`/product/${id}`)
        setIsCartOpen(false)
    }

    return (
        <div className={`cart-modal ${isCartOpen ? 'open' : ""}`}>
            <h3 className='cart-title'>My Cart</h3>
            <ul className='cart-list'>
                {
                    cartProducts.map(product => (
                        <li key={product.id} onClick={() => clickedProduct(product.id)} className='cart-item'> {/* ******** */}
                            <div className="product-text">
                                <div className="product-name">
                                    <h3>{product.brand}</h3>
                                    <h2 id='cart-product-title'>{product.title}</h2>
                                </div>
                                <button onClick={() => dispatch(deleteProductThunk(product.id))} className='delete-button'><i className="fa-solid fa-trash-can"></i></button>   {/* Cambiar ruta */}
                            </div>
                            
                            <div className="quantity-details">
                                <input
                                    type="text" 
                                    id='quantity' 
                                    value={product.productsInCart.quantity}
                                    readOnly
                                />
                                <p className='price-details'>Total: <span>$ {product.price}</span></p>
                            </div>
                        </li>
                    ))
                }
            </ul>
            <div className="checkout-container">
                <p className='checkout-total'>Total: <span>$ </span></p>
                <button onClick={() => dispatch(addPurchaseThunk(cartProducts))} className='checkout-button'>Checkout</button>
            </div>
        </div>
    );
};

export default Cart;