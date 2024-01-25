import React from 'react';
import './style.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { getDoc, collection, addDoc, query, doc, where, onSnapshot, serverTimestamp, orderBy } from "firebase/firestore";
import { auth, db } from '../../Config/firebase';
import SmallLoader from '../../Component/SmallLoader'

const ChatsPage = () => {
  const { anotherUserId } = useParams();
  const [userData, setUserData] = useState();
  const [chats, setChats] = useState();
  const navigate = useNavigate();
  const containerRef = useRef(null);

  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        const userDateFromDb = await getDoc(doc(db, 'userInfo', uid));

        setUserData({
          ...userDateFromDb.data(),
          userId: userDateFromDb.id
        });

        getMsgs();
        // ...
      } else {
        // User is signed out
        // ...
        setUserData(null);
      }

    });
  }, []);

  const chatIdGenerator = () => {
    const { userId } = userData;

    let chatId = userId < anotherUserId ? userId + anotherUserId : anotherUserId + userId;

    return chatId;
  };

  const addMsgs = async (e) => {
    e.preventDefault();

    const chatId = await chatIdGenerator();

    await addDoc(collection(db, 'usersChats'), {
      userMsg: e.target[0].value,
      userId: userData.userId,
      chatId,
      time: serverTimestamp()
    })

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
        scrollToTop();

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
                {/* <span class="chat-time">{element.data().time.toDate().toString()}</span> */}
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
  )
}

export default ChatsPage;
