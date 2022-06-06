import { useState, useEffect } from 'react';

/* 
  【Storageフック】
　・TodoをlocalStorageを使って保存する
　・以下機能をサポートする
　  - localstrageに保存されているすべてのTodoの読み出し機能
　  - Todoをlocalstrageに保存する
　  - localstrageにあるTodoを削除する
*/

const STORAGE_KEY = 'itss-todo';

function useStorage() {
  const [items, setItems] = useState([]);
　
　/* 副作用を使う */
  useEffect(() => {
    const storage = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    setItems(storage);
  }, []);

  const putItems = items => {
    setItems([...items]);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  };

  const clearItems = () => {
    setItems([])
    localStorage.removeItem(STORAGE_KEY);
  };

  return [items, putItems, clearItems];
}

export default useStorage;