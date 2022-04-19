import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link} from 'react-router-dom';
import Filter from '../components/Filter';
import { addCartThunk, filterByNameThunk, getCategoriesThunk, getProductsThunk } from '../redux/actions';
import '../styles/home.css';

const Home = () => {
   
    const dispatch = useDispatch();
    const products = useSelector(state => state.products);    
    const [ searchResult, setSearchResult ] = useState("");
    const [ isFilterOpen, setIsFilterOpen ] = useState(false);

    useEffect(() => {
        dispatch(getProductsThunk());
        dispatch(getCategoriesThunk());
    }, { });

    const searchProduct = e => {
        e.preventDefault();

        dispatch(filterByNameThunk(searchResult));
    }

    const addToCart = id => {
        const added = {
            id,
            quantity: 1
        }
        dispatch(addCartThunk(added));
    }

    return (
        <main className='home-container'>
            <div className="search-container">
                <form onSubmit={searchProduct} className='form-search' onClick={() => setIsFilterOpen(false)}>
                    <input 
                        type="text" 
                        placeholder='Search product' 
                        onChange={e => setSearchResult(e.target.value)}
                        value={searchResult}
                    />
                    <button><i className="fa-solid fa-magnifying-glass"></i></button>
                </form>
                <div className="filter-button-container">
                    <button 
                        className='filter-button'
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                    >
                            <i className="fa-solid fa-filter"></i> Filters
                    </button>
                </div>
            </div>
            
            <Filter isFilterOpen={isFilterOpen} setIsFilterOpen={setIsFilterOpen}/>
            
            <ul className='products-list' onClick={() => setIsFilterOpen(false)}>
                {
                    products.length === 0 ? (
                        <p>No results for "{searchResult}"</p>
                    ) : (
                        products.map( product => (
                            <li key={product.id} className='column'>
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
                                        onClick={() => addToCart(product.id)}
                                    >
                                        <i className="fa-solid fa-cart-shopping"></i>
                                    </button>   
                                </div>
                            </li>
                        )               
                    ))
                }
            </ul>
        </main>
    );
};

export default Home;