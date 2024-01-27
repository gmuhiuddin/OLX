import React, { useContext } from 'react';
import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { getDoc, collection, addDoc, query, doc, where, onSnapshot, serverTimestamp, orderBy } from "firebase/firestore";
import { auth, db, addUserMsg } from '../../Config/firebase';
import SmallLoader from '../../Component/SmallLoader';
import nodeContext from '../../note/nodeContext';

const ChatsPage = () => {
  const { anotherUserId } = useParams();
  const [userData, setUserData] = useState();
  const [chats, setChats] = useState();
  const containerRef = useRef(null);
  const contextState = useContext(nodeContext);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    setUserData(contextState.userData);
  }, []);

  useEffect(() => {
    getMsgs();

    setTimeout(() => {
      scrollToBottom();
    }, 1000);
    
  }, [userData])

  const chatIdGenerator = () => {
    const { userId } = userData;

    let chatId = userId < anotherUserId ? userId + anotherUserId : anotherUserId + userId;

    return chatId;
  };

  const addMsgs = async (e) => {
    e.preventDefault();

    const chatId = await chatIdGenerator();

    addUserMsg({
      userMsg: e.target[0].value,
      userId: userData.userId,
      chatId,
      time: serverTimestamp()
    }, chatId)

    e.target[0].value = '';
  };

  const getMsgs = async () => {

    const chatId = await chatIdGenerator();
    const msgRef = query(collection(db, 'usersChats'), orderBy("time"), where("chatId", "==", chatId));

     onSnapshot(msgRef, (data) => {
      
      if (data.empty) {
        setChats('No chats');
      } else {
        setChats(data.docs);

        scrollToBottom();
      }

    })

  };

  return (
    <div className='chat-container'>
      <div ref={containerRef} className='users-chats-container'>
        {!chats ? <SmallLoader /> : ''}
        {typeof chats == 'object' ?
          chats.map((element) => {
            
            return (
              <div className={element.data().userId == userData.userId ? 'userChat' : 'anotherUserChat'}>
                <span class="user-messsage">{element.data().userMsg}</span>
                <br />
                <span class="chat-time">{dayjs(element.data().time?.toDate()).format(
                "DD-MM-YYYY hh:mm"
            )}</span>
              </div>
            )
          })
          : chats
        }
      </div>
      <form onSubmit={addMsgs}>
        <input required placeholder='Type a message....' type='text' />
        <input id='sumit-btn' style={{ display: "none" }} type="submit" />
        <label for="sumit-btn">
          <i class="fa-solid fa-paper-plane"></i>
        </label>
      </form>
    </div>
  );
  
}

export default ChatsPage;