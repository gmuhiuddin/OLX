import { useState, useEffect } from 'react';
import { getDateFromDb } from '../../Config/firebase';
import './style.css';
import Loader from '../Loader';
import CategoryCartsContainer from '../../Component/Category-carts-container';

function CartContainer() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getProducts();
    }, []);

    async function getProducts() {
        let result = await getDateFromDb();
        let arr = [];

        result.forEach((item) => {
            arr.push({
                ...item.data(),
                id: item.id
            })
        })
        setProducts(arr);

    };

    const checkTheCategories = () => {
        let arr = [...categories];

        products.forEach(res => {
            let alreadyExist = false;

            arr.forEach(result => {
                if (res?.category == result) {
                    alreadyExist = true;
                };
            });

            if (!alreadyExist) {
                arr.push(res?.category);

                setCategories(arr);
            };


        })
    };

    if (products.length) {
        checkTheCategories();
    };

    if (!categories.length) {
        return <Loader />
    };

    return (
        <div className="carts-container">
            {categories.map((res, key) => {
                return <CategoryCartsContainer key={key} products={products} category={res} />
            })}
        </div>
    )
};

export default CartContainer;