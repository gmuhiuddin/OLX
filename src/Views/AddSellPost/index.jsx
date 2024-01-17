import './style.css';
import { addDateForAdds, addImageInDatabase } from '../../Config/firebase';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSellPost = () => {
    const [imageLink, setImageLink] = useState();
    const navigate = useNavigate();

    const sellAddFucn = async (e) => {
        e.preventDefault();

       if(!e.target[3].files[0]){
        alert('Please enter thumbnail image')
       }else{
        const addInfo = {
            title: e.target[0].value,
            description: e.target[1].value,
            price: e.target[2].value,
            thumbnail: imageLink
        };

        try {
            await addDateForAdds(addInfo);
            e.target[0].value = '';
            e.target[1].value = '';
            e.target[2].value = '';
            setImageLink('');
            navigate('/')

        } catch (e) {
            alert(e.message)
        }
       }

    };

    return (
        <div className="sell-container">
            <br />
            <div className='sell-form-container'>
                <form onSubmit={sellAddFucn}>
                    <div className='main-container'>
                        <div className='inputs-container'>

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
                    <br />
                    <button type='submit' className='submit-btn'>Add a sell</button>
                </form>
            </div>
        </div>
    )
}

export default AddSellPost;