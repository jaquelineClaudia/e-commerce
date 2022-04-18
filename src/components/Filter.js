import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { filterCategoryThunk, getProductsThunk } from '../redux/actions';
import '../styles/filter.css';

const Filter = ({isFilterOpen, setIsFilterOpen}) => {
    const categories = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const [ isCartFiltOpen, setIsCartFiltOpen ] = useState(false);
    
    return (
        <div className={`filter-modal ${isFilterOpen ? 'filter-open' : ""}`}>
            <div className="close-button-container">
                <button onClick={() => setIsFilterOpen(false)} className='close-button'>
                    <i className="fa-solid fa-x"></i>
                </button>
            </div>
            <div className="filters-container">
                <h2>Filter</h2>
                <button 
                    className='category-filter-button'
                    onClick={() => setIsCartFiltOpen(!isCartFiltOpen)}
                >
                    Category <i className="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <ul className={`categories-list  ${isCartFiltOpen ? 'categories-list-open' : ''}`}>
                    <button 
                        onClickCapture={() => {dispatch(getProductsThunk()); setIsFilterOpen(false)}}
                        className='category-button'
                    >
                        All products
                    </button>
                    {
                        categories.slice(0,3).map(category => (
                            <button 
                                key={category.id} 
                                onClick={() => {dispatch(filterCategoryThunk(category.id)); setIsFilterOpen(false);}}
                                className='category-button'
                            >
                                {category.name}
                            </button>
                        ))
                    }
                </ul>
            </div>
            
        </div>
    );
};

export default Filter;