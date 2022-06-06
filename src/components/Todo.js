import React, { useState } from 'react';

/* 
  【Todoのデータ構成】
 ・key：Todoを特定するID（String）
 ・text：Todoの内容（String）
 ・done：完了状態（Boolean true:完了済み,, false:未完了）
*/

/* コンポーネント */
import TodoItem from './TodoItem';
import Input from './Input';
import Filter from './Filter';

/* カスタムフック */
import useStorage from '../hooks/storage';

/* ライブラリ */
import { getKey } from "../lib/util";

function Todo() {
  const [items, putItems] = React.useState([
    /* テストコード 開始 */
    { key: getKey(), text: '日本語の宿題', done: false },
    { key: getKey(), text: 'reactを勉強する', done: false },
    { key: getKey(), text: '明日の準備をする', done: false },
    /* テストコード 終了 */
  ]);
  const [content, setContent] = useState('');
  const [selectedTab, setSelectedTab] = useState(0);
  // const [items, putItems, clearItems] = useStorage();

  const onUpdate = (data) => {
    const index = items.findIndex(item => item.key === data.key);
    const new_arr = [...items];
    if (index !== -1) {
      new_arr[index].done = !data.done;
      putItems([...new_arr]);
    }
  }


  const tabs = ['全て', '未完了', '完了済み'];


  const onSubmit = () => {
    putItems([...items, { key: getKey(), text: content, done: false }]);
    setContent('');
  }

  const getList = () => {
    switch (selectedTab) {
      case 0:
        return items;

      case 1:
        return items.filter(item => item.done);

      case 2:
        return items.filter(item => !item.done);

      default: return [];
    }
  }

  const getTotalItemsTab = () => {
    switch (selectedTab) {
      case 0:
        return {
          total: items.length
        }

      case 1:
        return {
          total: items.filter(item => item.done).length
        }

      case 2:
        return {
          total: items.filter(item => !item.done).length
        }

      default: return {
        total: 0
      };
    }
  }

  // const onRemove = () => {
  //   clearItems();
  // }


  return (
    <div className="panel">
      <div className="panel-heading">
        ITSS ToDoアプリ
      </div>
      <input
        style={{ margin: '10px 0px', width: '100%' }}
        type='text'
        value={content}
        onChange={e => setContent(e.target.value)}
        onKeyUp={e => {
          if (e.key === 'Enter')
            onSubmit()
        }
        }
        placeholder="Add new todo"
      />
      {/* <input
        type='submit'
        value='消去'
        onClick={onRemove}
      /> */}
      <div className='tabs'>
        {
          tabs.map((tab, index) => (<div className={`tab ${index === selectedTab ? 'active' : ''}`} key={index} onClick={() => setSelectedTab(index)} >{tab}</div>))
        }
      </div>
      {getList().map(item => (
        <label key={item.key} className="panel-block">
          <TodoItem item={item} onClick={(data) => onUpdate(data)} />
        </label>
      ))}
      <div className="panel-block">
        { getTotalItemsTab().total } items
      </div>
    </div>
  );
}

export default Todo;