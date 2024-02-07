import './style.css';
import { addDateForAdds, addImageInDatabase, addMultiImagesInDatabase } from '../../Config/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSellPost = () => {
    const [imageLink, setImageLink] = useState();
    const [imagesLinks, setImagesLinks] = useState([]);
    const navigate = useNavigate();

    const sellAddFucn = async (e) => {
        e.preventDefault();

        if (!e.target[4].files[0]) {
            alert('Please enter thumbnail image');
        } else {
            const addInfo = {
                category: e.target[0].value,
                title: e.target[1].value,
                description: e.target[2].value,
                price: e.target[3].value,
                thumbnail: imageLink
            };

            try {
                await addDateForAdds(addInfo);
                e.target[0].value = '';
                e.target[1].value = '';
                e.target[2].value = '';
                setImageLink('');
                navigate('/');

            } catch (e) {
                console.log(e.message)
            };
        };

    };
    console.log(imagesLinks);

    return (
        <div className="sell-container">
            <br />
            <div className='sell-form-container'>
                <form onSubmit={sellAddFucn}>
                    <div className='main-container'>
                        <div className='inputs-container'>

                            <label for="category-option">Category<span className='important-txt'>*</span>:</label>

                            <select required id='category-option'>
                                <option>Select category</option>
                                <option>Mobiles</option>
                                <option>Vehicles</option>
                                <option>Property For Sale</option>
                                <option>Property For Rent</option>
                                <option>Electronics & Home Appliances</option>
                                <option>Bikes</option>
                                <option>Business Indestrial & Agriculture</option>
                                <option>Services</option>
                                <option>Jobs</option>
                                <option>Animals</option>
                                <option>Furniture & Home Decor</option>
                                <option>Fashion & Beauty</option>
                                <option>Books, Sports & Hobbies</option>
                                <option>Kids</option>
                            </select>


                            <label for="titel-txt">Title<span className='important-txt'>*</span>:</label>
                            <input required id='titel-txt' type='text' />

                            <label for="description-txt">Description<span className='important-txt'>*</span>:</label>
                            <textarea maxLength={199} required id='description-txt' type='text' />

                            <label for="price-txt">Price<span className='important-txt'>*</span>:</label>
                            <input required id='price' type='number' />

                        </div>

                        <div className='image-container'>
                            <img src={imageLink} alt='Thumbnail image' />
                            <br />
                            <br />
                            <label for="thumbnail-image" style={{ textAlign: 'left' }}>Add thumbnail image<span className='important-txt'>*</span>:</label>
                            <label className='thumbnail-image-label' for="thumbnail-image">Click here</label>
                            <input onChange={async (e) => {
                                const imageUrl = await addImageInDatabase(e.target.files[0]);
                                setImageLink(imageUrl)
                            }} id='thumbnail-image' type='file' />
                        </div>
                    </div>
                    <br />

                    <h1 style={{ textAlign: 'center' }}>Add Multiple Images</h1>
                    <div className='add-multiple-images-conatiner'>


                        <div className='image-container'>
                            <img src={imagesLinks[0]} alt='First image' />
                            <br />
                            <br />
                            <label for="first-image" style={{ textAlign: 'left' }}>Add first image<span className='important-txt'>*</span>:</label>
                            <label className='first-image-label' for="first-image">Click here</label>
                            <input
                                onChange={async (e) => {
                                    const imageUrl = await addMultiImagesInDatabase(e.target.files[0], 'first');

                                    const imagess = [...imagesLinks];
                                    imagess[0] = imageUrl;
                                    setImagesLinks(imagess);
                                }}
                                id='first-image' type='file' />
                        </div>



                        <div className='image-container'>
                            <img src={imagesLinks[1]} alt='Second image' />
                            <br />
                            <br />
                            <label for="second-image" style={{ textAlign: 'left' }}>Add Second image<span className='important-txt'>*</span>:</label>
                            <label className='second-image-label' for="second-image">Click here</label>
                            <input
                                onChange={async (e) => {
                                    const imageUrl = await addMultiImagesInDatabase(e.target.files[0], 'second');

                                    const imagess = [...imagesLinks];

                                    imagess[1] = imageUrl;

                                    setImagesLinks(imagess);
                                }}
                                id='second-image' type='file' />
                        </div>

                    </div>


                    <br />
                    <button type='submit' className='submit-btn'>Add a sell</button>
                </form>

            </div>
            <br />
        </div>
    );
};

export default AddSellPost;