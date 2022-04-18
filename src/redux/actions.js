import axios from "axios";

const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}`}
});

export const actions = {
    setProducts: "SET_PRODUCTS",
    setIsLoading: "SET_IS_LOADING",
    setCategories: "SET_CATEGORIES",
    setCartProducts: "SET_CART_PRODUCTS",
    setPurchases: "SET_PURCHASES"
}

export const setProducts = products => ({
    type: actions.setProducts,
    payload: products
})

export const setIsLoading = isLoading => ({
    type: actions.setIsLoading,
    payload: isLoading
})

export const setCategories = categories => ({
    type: actions.setCategories,
    payload: categories
})

export const setCartProducts = cartProducts => ({
    type: actions.setCartProducts,
    payload: cartProducts
})

export const setPurchases = purchases => ({
    type: actions.setPurchases,
    payload: purchases
})

export const getProductsThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products')
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const getCategoriesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => dispatch(setCategories(res.data.data.categories)))
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const filterCategoryThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?category=${id}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const filterByNameThunk = productName => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products/?query=${productName}`)
            .then(res => dispatch(setProducts(res.data.data.products)))
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const loginThunk = credentials => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/users/login', credentials)
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const addCartThunk = added => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', added, getConfig())
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const getCartProductsThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
            .then(res => dispatch(setCartProducts(res.data.data.cart.products)))
            .catch(error=> {
                if(error.response.status === 404) console.log("Aun no se han agregado productos al carrito")
            })
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const deleteProductThunk = id => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
            .then(() => dispatch(getCartProductsThunk()))
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const createPurchaseThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())

    };
};

export const addPurchaseThunk = lastPurchase => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', lastPurchase, getConfig())
            .finally(() => dispatch(setIsLoading(false)));
    };
};

export const getPurchasesThunk = () => {
    return dispatch => {
        dispatch(setIsLoading(true))
        return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
            .then(res => dispatch(setPurchases(res.data.data.purchases)))
            .finally(() => dispatch(setIsLoading(false)));
    };
};
