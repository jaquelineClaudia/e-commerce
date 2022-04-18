import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getPurchasesThunk } from '../redux/actions';
import '../styles/purchases.css';

const Purchases = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const purchases = useSelector(state => state.purchases);

    useEffect(() => {
        dispatch(getPurchasesThunk());
    }, [ dispatch ]);

    const purchaseDate = date => {
        const newDate = new Date(date)
        const options = {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
        }

        return newDate.toLocaleDateString('en-EN', options)
    }  

    return (
        <div className='purchases-container'>
            <div className='purchases-header'>
                <h3 onClick={() => navigate('/')}>Home</h3>
                <div className='circle'></div>
                <h3><strong>purchases</strong></h3>
            </div>
            <h2 className='purchases-title'>My purchases</h2>
            <ul className='purchases-list'>
                {
                    purchases.map(eachPurchase => (
                        <li className='purchase-column' key={eachPurchase.id}>
                            <div className="purchase-card">
                                <h3 className="purchase-date">{purchaseDate(eachPurchase.createdAt)}</h3>
                                {
                                    [eachPurchase.cart.products].map(purchaseItems => (
                                        <div className='each-purchase-products'>
                                            {
                                                purchaseItems.map(product =>
                                                    <ul className='purchase-info' onClick={() => navigate(`/product/${product.id}`)}>
                                                        <li className='product-name'>{product.title}</li>
                                                        <li className='product-quantity'>{product.productsInCart.quantity}</li>
                                                        <li className='product-price'>$ {product.price}</li>
                                                    </ul>
                                                )
                                            }
                                        </div>
                                    ))
                                }
                            </div>                        
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};

export default Purchases;