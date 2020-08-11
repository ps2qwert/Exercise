import styles from './index.css';
import { formatMessage } from 'umi-plugin-locale';
import React, { useState,useEffect,useCallback,useContext } from 'react';
import {useForm} from './hook'

const AppContext = React.createContext({});


function useToggle(initialValue) {
  const [value, setValue] = useState(!!initialValue)
  const toggler = useCallback(() => setValue(value => !value), [])

  return [value, toggler]
}

function Example(props){
  const [visiable,toggleVisiable] = useToggle(false)
  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    console.log(visiable);
  },[props.data, visiable]);
  return (
    <div>
      <h3>示例1：</h3>
      <button onClick={toggleVisiable}>显示</button>
      {
        visiable
        ? <div>打开了</div>
        : <div>隐藏了</div>
      }
    </div>
  )
}

function Example1(){
  const { username } = useContext(AppContext)
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
        add Todos{username}
      </button>
    </div>
  );
}



function Example2() {
  const { username } = useContext(AppContext)
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
      <div>{username}</div>
    </>
  );
}

const Child = (({data}) =>{
  console.log('child render...', data)
  const [name, setName] = useState(data)
  return (
      <div>
          <div onClick={()=>setName('jack')}>child</div>
          <div>{name} --- {data}</div>
      </div>
  );
})

function useStateDemo(){
    const [count, setCount] = useState(110);
    const [name, setName] = useState()
    const [value,setForm] = useForm({
      username : '',
      password : ''
    })
    useEffect(() => {
      // 使用浏览器的 API 更新页面标题
      console.log(`You clicked ${count} times`);
    });
    
    console.log('value',value)
    return (
      <AppContext.Provider value={{
        username: count
      }}>
        <Example data={count}></Example>
        <Example1></Example1>
        <Example2/>
        <div>
            {count}
        </div>
        <button onClick={()=>setCount(count+1)}>update count </button>
        <button onClick={()=>setName('jack')}>update name </button>
        <Child data={name}></Child>
        <input onChange = {setForm} name = "username"></input>
        <input onChange = {setForm} name = "password"></input>
      </AppContext.Provider>
    );
}

export default useStateDemo