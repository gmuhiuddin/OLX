import Carts from '../../Component/Carts/index';
import { useState, useEffect } from 'react';
import {getDateFromDb} from '../../Config/firebase';
import './style.css';
import Loader from '../Loader';

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
                productId: item.id
            })
        })
        setProducts(arr)
    };

    if (!products.length) {
        return <Loader />
    };

    return (
        <div className="carts-container">
            {products?.map((element) => {
                return <Carts cartInfo={element} />
            })}
        </div>
    )
};

export default CartContainer;