import './style.css';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import heartImg from './image-PhotoRoom.png-PhotoRoom-removebg-preview.png';
import likedHeartImg from './image-PhotoRoom.png-PhotoRoom__1_-removebg-preview.png';
import StarRating from '../StartRating';
import { addToCart, removeFromCart, getDataOfAddToCart } from '../../Config/firebase';
import { useSelector } from 'react-redux';

function Carts({ cartInfo }) {

    const { title, thumbnail, rating, price, images, brand, category, description, discountPercentage, id, stock } = cartInfo;
    const res = useSelector(res => res.userSlice.userInfo)

    let navigate = useNavigate();

    let [isLiked, setIsLiked] = useState(false);
    const dicountOutOf100Per = 100 - discountPercentage;
    const discountedPrice = price / 100 * dicountOutOf100Per;

    useEffect(() => {
        checkTheCarts();
    }, [])

    const checkTheCarts = async () => {
        const result = await getDataOfAddToCart(res?.userId);
        
        for(let i = 0; i < result.length; i++) {
    
        if (result[i] == id) {
            setIsLiked(true);
            break;
        };
        
        };
    };

    const likeIsClickFunc = async () => {
        setIsLiked(!isLiked);
        !isLiked ?
            await addToCart(id, res?.userId)
            : await removeFromCart(id, res?.userId);
    };

    return (

        <div className="carts">
            <div onClick={() => navigate(`item/${id}`)} className='discount-thumbnail-container'>
                <span className='discount-txt'>{discountPercentage}%</span>
                <img className='thumbnail' src={thumbnail} />
            </div>
            <br />
            <div className='txt-heart-container'>
                <span className='price-txt'>$<ins>{discountedPrice.toFixed(1)}</ins> <del>{price}</del></span>

                <img onClick={likeIsClickFunc} className={isLiked ? 'clicked-heart' : 'heart'} src={isLiked ? likedHeartImg : heartImg} />

            </div>
            <br />
            <span className='tital-txt'>{title}</span>
            <br />
            <StarRating rating={rating} />
            <br />
        </div>
    );
};

export default Carts;