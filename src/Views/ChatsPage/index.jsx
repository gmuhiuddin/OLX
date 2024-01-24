import React from 'react';
import './style.css';
import { useParams, useNavigate } from 'react-router-dom';

const ChatsPage = () => {
    const {userId} = useParams();

    const addMsgs = (e) => {
        e.preventDefault();

        console.log(e.target[0].value);

        e.target[0].value= '';
    };

  return (
    <div className='chat-container'>
        <div className='users-chats-container'>
            <div className='userChat'>
asdjkfjhalsdkfj
asdjkfjhalsdkfjasdkfkjasldkjfhaslkdjfhalskjdfhaslkdjfhaslkjdfhsalddkjfhslkdjfjhlaksjdjfhaslkdjfhlasdkjdfhslkadjfjhasldkdjfjhasdlkjdfjhasdlkdjfhaslkfhaslkjdfhasdlkdjfjhsldakdjfjhsadlkfhaslkjkfjhsdadlkjhfalskdjdjfhsadlkjdfhskdlkfhfsdlkjfhasdlkjdfhsdlkjdjfhskjdjfhalskjfdflkj
            </div>
            <div className='anotherUserChat'>
asdjkfjhalsdkfjasdkfkjasldkjfhaslkdjfhalskjdfhaslkdjfhaslkjdfhsalddkjfhslkdjfjhlaksjdjfhaslkdjfhlasdkjdfhslkadjfjhasldkdjfjhasdlkjdfjhasdlkdjfhaslkfhaslkjdfhasdlkdjfjhsldakdjfjhsadlkfhaslkjkfjhsdadlkjhfalskdjdjfhsadlkjdfhskdlkfhfsdlkjfhasdlkjdfhsdlkjdjfhskjdjfhalskjfdflkj
            </div>
        </div>
        <form onSubmit={addMsgs}>
        <input placeholder='Type a message....' type='text' />
        <input id='sumit-btn' style={{display:"none"}} type="submit" />
        <label for="sumit-btn">
        <i class="fa-solid fa-paper-plane"></i>
        </label>
        </form>
    </div>
  )
}

export default ChatsPage;
