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


function useToggle(initialValue) {
  const [value, setValue] = useState(!!initialValue)
  const toggler = useCallback(() => setValue(value => !value), [])

  return [value, toggler]
}

function Example(props){
  const [visiable,toggleVisiable] = useState(false)
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    console.log(visiable);
  },[props.data]);
  return (
    <div>
      <h3>示例1：</h3>
      <button onClick={()=>toggleVisiable(visiable => !visiable)}>显示</button>
      {
        visiable
        ? <div>打开了</div>
        : <div>隐藏了</div>
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
      <h3>示例2：</h3>
      {
        todos.map((e,index)=> <div key={index}>{e.text}</div>)
      }
      <button onClick={addTodo}>
        add Todos
      </button>
    </div>
  );
}



function Example2() {
  const friendList = [
    { id: 1, name: 'Phoebe' },
    { id: 2, name: 'Rachel' },
    { id: 3, name: 'Ross' },
  ];  
  const [recipientID, setRecipientID] = useState(1);
  return (
    <>
      <h3>示例3：</h3>
      {
        friendList.map((e,index)=>{
          return (
            <div onClick={()=> setRecipientID(e.id)} key={index}>
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
    useEffect(() => {
      // 使用浏览器的 API 更新页面标题
      console.log(`You clicked ${count} times`);
    });
  
    return (
      <div>
        <button onClick={()=>{setCount(count + 1)}}>111</button>
        <Example data={count}></Example>
        <Example1></Example1>
        <Example2/>
      </div>
    );
}

export default useStateDemo