import { useState, useEffect } from 'react';
import {getDateFromDb} from '../../Config/firebase';
import './style.css';
import Loader from '../Loader';
import CategoryCartsContainer from '../../Component/Category-carts-container';

function CartContainer() {
    const [products, setProducts] = useState([]);
    
    useEffect(() => {
        getProducts()
    }, []);

    async function getProducts() {
        let result =  await getDateFromDb();
        let arr = [];

        result.forEach((item) => {
            arr.push({
                ...item.data(),
                id: item.id
            })
        })
        setProducts(arr)
    };

    if (!products.length) {
        return <Loader />
    };

    return (
        <div className="carts-container">
            <CategoryCartsContainer products={products} category={'Mobiles'} />
            <CategoryCartsContainer products={products} category={'Bikes'} />
            <CategoryCartsContainer products={products} category={'laptops'} />
            <CategoryCartsContainer products={products} category={'Property For Rent'} />
            <CategoryCartsContainer products={products} category={'Property For Sale'} />
            <CategoryCartsContainer products={products} category={'Vehicles'} />
            <CategoryCartsContainer products={products} category={'fragrances'} />
            <CategoryCartsContainer products={products} category={'groceries'} />
            <CategoryCartsContainer products={products} category={'home-decoration'} />
            <CategoryCartsContainer products={products} category={'skincare'} />
            <CategoryCartsContainer products={products} category={'smartphones'} />
        </div>
    )
};

export default CartContainer;