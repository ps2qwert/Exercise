# 初识React Hook

## useState

> 这是个可以用来定义一个“state”变量的方法

### e.g 通过useState控制组件显示/隐藏

> 相信这个需求大家在实际运用中遇到的比较多，下面一起看看使用useState的实现方式吧

```
function Example(){
  // useState会返回包含两个元素的数组，我们通过数组解构分配给它们名称。第一个是状态的值，第二个是设置当前状态值的函数。useState里面的参数用来设置默认值。
  const [visiable,toggleVisiable] = useState(false)
  return (
    <div>
      // 这边使用的函数式更新，因为更新值需要通过之前的值反转一下
      <h3>示例1：</h3>
      <button onClick={()=>toggleVisiable(visiable => !visiable)}>显示</button>
      {
        visiable
        ? <div>1</div>
        : <div>2</div>
      }
    </div>
  )
}
```

### e.g 控制数组状态

```
function Example1(){
    const [todos, setTodos] = useState([{ text: 'Learn Hooks' }]);
    // 一开始傻傻以为直接push进去就可以，最后发现并不可以。是因为这个设置函数并不会直接讲旧值进行合并，需要通过...复制当前状态，生成新的数组。
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
          todos.map((e)=> <div>{e.text}</div>)
        }
        <button onClick={addTodo}>
          add Todos
        </button>
      </div>
    );
}
```

### e.g 设置数组选中

```
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
```


## useEffect

> 在hook里面,使用useEffect可以让你想在什么数据变动的时候进行什么样操作,而不是像class类里的生命周期一样,让你在什么阶段做什么事情,使其更加的简单简洁。如下代码就可以每次组件更新的时候打印出visiable当前的状态。
```
function Example(){

  const [visiable,toggleVisiable] = useState(false)

  useEffect(() => {
    // 使用浏览器的 API 更新页面标题
    console.log(visiable);
  });
  
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
```

> 当你需要想componentDidMount一样只执行一次的话,可以在useEffect第二参数传个空数组。useEffect第二个参数是用来，当props参数改变时，useEffect才执行。需要注意第二参数是一个数组。

```
  // 只执行一次
  useEffect(() => {
    console.log(visiable);
  },[]);

  // 当传入的props中的data修改了才执行
  useEffect(() => {
    console.log(visiable);
  },[props.data]); 
```

> 在业务中我们可能需要在componentWillUnmount中把数据清空，取消监听等操作。在useEffect中就是：
```
  //在return里面写函数就可以
  useEffect(() => {
    return ()=>{
      setCounter(false)
    }
  });
```

## 自定义Hook

> 在平时业务经常会组件之间重用一些状态逻辑，如modal弹窗的显示隐藏，再每一个class里面都要设置setState一个状态true和false。我们就可以把这个提取出来写一个自定义HooK,还是以示例一为例：

```
//如官网所说自定义Hook更像是一种约定而不是功能，以“use”开头命名。我们在这里就把更改true和false的逻辑提取出来了，在其他函数组件中也可以直接调用。
function useToggle(initialValue) {
  const [value, setValue] = useState(!!initialValue)
  const toggler = useCallback(() => setValue(value => !value), [])
  return [value, toggler]
}

//在组件中只要将状态和行为解构出来，不用考虑内部的逻辑，非常的方便。
function Example(props){
  const [visiable,toggleVisiable] = useToggle(false)
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
```

## useContext

> 如果大家之前对 context 比较熟悉，应该非常容易理解useContext,它就是给你在hook有访问上下文能力。

```

const AppContext = React.createContext({});
function useStateDemo(){
    const [count, setCount] = useState(110);
  
    return (
      <AppContext.Provider value={{
        username: count
      }}>
        //调用useContext 的组件总会在 context 值变化时重新渲染
        <Example1></Example1>
        <Example2/>
      </AppContext.Provider>
    );
}

function Example1(){

  const { username } = useContext(AppContext)
  return (
    <div className={styles.normal}>{username}
    </div>
  );
}


function Example2() {
  const { username } = useContext(AppContext)
  return (
      <div>{username}</div>
  );
}
```


## useReducer

> useReducer也是用于更新状态的一种方式，但是它比useState更复杂一点,如果之前熟悉redux的话基本很容易理解。它接受一个reducer函数和初始的状态，并返回实际的state和dispatch函数。通过dispatch函数接收做什么操作来更改状态。

```
const initialState = 0;
const reducer = (state, action) => {
  switch (action) {
    case 'increment': return state + 1;
    case 'decrement': return state - 1;
    case 'reset': return 0;
    default: throw new Error('Unexpected action');
  }
};

const Example01 = () => {
  const [count, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      {count}
      <button onClick={() => dispatch('increment')}>+1</button>
      <button onClick={() => dispatch('decrement')}>-1</button>
      <button onClick={() => dispatch('reset')}>reset</button>
    </div>
  );
};
```
