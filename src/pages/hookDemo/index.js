import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import React, { useState,useEffect,useCallback } from 'react';


// function FriendStatus(props) {
//   const [isOnline, setIsOnline] = useState(null);

//   function handleStatusChange(status) {
//     setIsOnline(status.isOnline);
//   }

//   useEffect(() => {
//     ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);

//     return () => {
//       ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
//     };
//   });

//   if (isOnline === null) {
//     return 'Loading...';
//   }
//   return isOnline ? 'Online' : 'Offline';
// }

const friendList = [
  { id: 1, name: 'Phoebe' },
  { id: 2, name: 'Rachel' },
  { id: 3, name: 'Ross' },
];

function useToggle(initialValue) {
  const [value, setValue] = useState(!!initialValue)
  const toggler = useCallback(() => setValue(value => !value), [])

  return [value, toggler]
}

function Example(){
  const [visiable,toggleVisiable] = useState(false)
  return (
    <div>
      <button onClick={()=>toggleVisiable(visiable => !visiable)}>显示</button>
      {
        visiable
        ? <div>1</div>
        : <div>2</div>
      }
    </div>
  )
}

function Example1(){
  const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);

  let addTodo = () =>{
    setTodos([
      ...todos,
      { text: `earn Hooks${Math.random() * 100}` }
    ])
  }
  return (
    <div className={styles.normal}>
      {
        todos.map((e)=> <div>{e.text}</div>)
      }
      <button onClick={addTodo}>
        add Todos
      </button>
    </div>
  );
}



function ChatRecipientPicker() {
  const [recipientID, setRecipientID] = useState(1);
  return (
    <>
      <div/>
      {
        friendList.map((e)=>{
          return (
            <div onClick={()=> setRecipientID(e.id)}>
              {recipientID === e.id ? '选中' : ''}{e.name}
            </div>
          )
        })
      }
    </>
  );
}

function useStateDemo(){
    const [count, setCount] = useState(110);
    const [enable, toggleEnable] = useToggle()
    useEffect(() => {
      // 使用浏览器的 API 更新页面标题
      console.log(`You clicked ${count} times`);
    });
  
    return (
      <div className={styles.normal}>
        <input value={enable} onClick={toggleEnable}></input>
        <Example></Example>
        <Example1></Example1>
        <ChatRecipientPicker/>
      </div>
    );
}

export default useStateDemo