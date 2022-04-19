import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addCartThunk, getProductsThunk } from '../redux/actions';
import '../styles/product-details.css';

const ProductDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);
    const [ relatedProducts, setRelatedProducts ] = useState([]);
    const [ quantity, setQuantity ] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getProductsThunk());
    }, [ dispatch ]);

    const productFound = products.find(product => product.id === Number(id));

    useEffect(() => {
        /* if(productFound) */
        axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${productFound.category.id}`)
            .then(res => {
                const filteredProducts = res.data.data.products.filter(product => product.id !== Number(id));
                setRelatedProducts(filteredProducts)});
    }, [ productFound.id ]);

    const addToCart = () => {
        const added = {
            id,
            quantity
        }
        dispatch(addCartThunk(added));
    }

    const addRelatedToCart = id => {
        const addRelated = {
            id,
            quantity: 1
        }
        dispatch(addCartThunk(addRelated));
    }

    const decrement = () => {
        if(quantity >= 2) setQuantity(quantity - 1);
    }

    return (
        <div className='product-detail-container'>
            <div className='header'>
                <h3 onClick={() => navigate('/')}>Home</h3>
                <div className='circle'></div>
                <h3><strong>{productFound.title}</strong></h3>
            </div>
            <main className='main-container'>
                <div className="column">
                    <div className="image-container">
                        <button className='arrows'><i className="fa-solid fa-arrow-left"></i></button>
                        <img src={productFound.productImgs[0]} alt="product image" />
                        <button className='arrows'><i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                </div>

                <div className="product-info-container layout-shifter">
                    <h2 className='product-info-title'>{productFound.title}</h2>
                    <div className="price-container">
                        <div className="product-price-det">
                            <p className='price'>Price<br/><span>$ {productFound.price}</span></p>
                        </div>
                        <div className="quantity-container">
                            <label htmlFor="quantity">Quantity</label>
                            <div className="button-container">
                                <button type='button' onClick={decrement}>-</button>
                                <input 
                                    type="text" 
                                    id='quantity' 
                                    onChange={e => setQuantity(e.target.value)} 
                                    value={quantity}
                                />
                                <button type='button' onClick={() => setQuantity(quantity + 1)}>+</button>
                            </div>
                        </div>    
                    </div> 
                    <button className='cart-button' onClick={addToCart}>Add to cart <i className="fa-solid fa-cart-shopping"></i></button>
                    <p className='product-description'>{productFound.description}</p>
                </div>
            </main>
            <ul className='related-products-container'>
                <h2>Take a look at related products</h2>
                <ul className='related-products-list'>
                    {
                        relatedProducts.map(product => (
                            <li key={product.id} className='related-column'>
                                <div className="product-card">
                                    <Link to={`/product/${product.id}`} className='underline'>
                                        <div className="images-hover">
                                            <img src={product.productImgs[1]} className='over' alt="product image" />
                                            <img src={product.productImgs[0]} alt="second image" />
                                        </div>
                                        <h2 className='product-title'>{product.title}</h2>
                                        <p className='price'>Price<br/><span>$ {product.price}</span></p>
                                    </Link>  
                                    <button 
                                        className='add-cart-button'
                                        onClick={() => addRelatedToCart(product.id)}
                                    >
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </button>   
                                </div>     
                            </li>
                        ))
                    }
                </ul>
            </ul>
        </div>
    );
};

export default ProductDetails;