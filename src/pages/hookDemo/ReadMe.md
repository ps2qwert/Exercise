# 初识React Hook

## useState

### e.g 通过useState控制组件显示/隐藏

> 相信这个需求大家在实际运用中遇到的比较多，下面一起看看使用useState的实现方式吧

```
function Example(){
  // useState会返回包含两个元素的数组，我们通过数组解构分配给它们名称。第一个是状态的值，第二个是设置当前状态值的函数。useState里面的参数用来设置默认值。
  const [visiable,toggleVisiable] = useState(false)
  return (
    <div>
      // 这边使用的函数式更新，因为更新值需要通过之前的值反转一下
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
