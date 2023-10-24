"use client"
import { useEffect, useRef, useState } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';

export default function Home() {

  const [todoArray, setTodoArray] = useState([]);
  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    console.log(todoArray)
    inputRef.current.focus()
  }, [todoArray])

  const addTodo = () => {
    if (inputVal === '') return
    setTodoArray((e) => [...e, inputVal])
    setInputVal('')
    inputRef.current.focus()
  }

  const editTodo = (v, i) => {
    let userPrompt = prompt('Enter Todo', v);
    console.log(userPrompt);
    if (userPrompt == null || userPrompt.length === 0) return
    setTodoArray((e) => e.map((value, index) => index === i ? userPrompt : value))
  }

  const changePriority = () => {
    if (todoArray.length < 2) return

    const fromIndex = +prompt('Which todo you want to replace') - 1
    const toIndex = +prompt('To whom todo you want to replace') - 1

    if (fromIndex == null ||
      fromIndex < 0 ||
      toIndex == null ||
      toIndex < 0 ||
      fromIndex == toIndex ||
      (fromIndex >= todoArray.length || toIndex >= todoArray.length)) return

    const newArray = [...todoArray];
    const from = newArray[fromIndex];
    const to = newArray[toIndex];
    newArray[fromIndex] = to;
    newArray[toIndex] = from;

    setTodoArray((e) => newArray);

  }

  return (
    <>

      <div className="border flex flex-row w-5/6 bg-white p-2 gap-2 rounded-md mx-auto mt-4">
        <span className="flex-1">
          <input ref={inputRef} type="text" onChange={(e) => setInputVal(() => e.target.value)} value={inputVal} placeholder="Add Todo" className="outline-none w-full border h-full pl-2 transition duration-200 active:opacity-60" />
        </span>
        <span className="flex gap-2">
          <button onClick={addTodo} className="active:bg-red-100 border p-2 transition duration-200 hover:opacity-60">Add</button>
          <button onClick={() => todoArray.length && setTodoArray([])} className="active:bg-red-100 border p-2 transition duration-200 hover:opacity-60">Delete All</button>
          <button onClick={changePriority} className="active:bg-red-100 border p-2 transition duration-200 hover:opacity-60">Change priority</button>
        </span>
      </div>

      <ul className="border flex flex-col w-5/6 bg-white p-2 gap-2 rounded-md mx-auto mt-1">
        {
          todoArray.length == 0 ? <li className="border p-2 flex items-center transition duration-200 hover:opacity-80">
            <span className='flex-1'>Placeholder Todo</span>
          </li> :
            todoArray.map((v, i) =>
              <li key={i} className="border p-2 flex items-center transition duration-200 hover:opacity-80">
                <span className='flex-1'>{i + 1}. {v}</span>
                <div className='flex gap-5'>
                  <span onClick={() => editTodo(v, i)} className='text-xl cursor-pointer active:opacity-70 transition duration-200'><AiFillEdit /></span>
                  <span onClick={() => setTodoArray((e) => e.filter((_, index) => index !== i))} className='text-xl cursor-pointer active:opacity-70 transition duration-200'><AiFillDelete /></span>
                </div>
              </li>
            )}
      </ul>

    </>
  )
}