/* 
  【TodoItemコンポーネント】
　・Todoアイテムを表示する
　・チェックボックスにチェックが入っているか管理する
　・チェックボックスにチェックが入っているかアイテムをグレーアウトする
*/
function TodoItem( {item, onClick} ) {
  return (
   <label className={`panel-block ${item.done ? 'has-text-grey-light' : ''}`}>
     <input type="checkbox" onChange={() => onClick(item)}/>
     {item.text}
   </label>
  );
}

export default TodoItem;