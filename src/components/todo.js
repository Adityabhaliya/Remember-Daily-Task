import React, { useState } from 'react'
import todo from '../image/todo.webp'
import '../App.css'
import { useEffect } from 'react';



// to get the data from localstorage
const getLocalItems = () => {
  let list = localStorage.getItem('lists');

  if (list) {
    return JSON.parse(localStorage.getItem('lists'))
  } else {
    return [];
  }
}

const Todo = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalItems())
  const [toggleSubmit , setToggleSubmit] = useState(true)
  const [isEditItem , setIsEditItem] = useState(null)

  const addItem = () => {
    if (!inputData) {
      alert('Plzz Fill The Data')
    }else if(inputData && !toggleSubmit){
      setItems(
        items.map((elem) => {
          if(elem.id === isEditItem){
            return { ...elem,name:inputData}
          }
          return elem;
        })
      )
      setToggleSubmit(true)
      setInputData('')
      setIsEditItem(null)
    } else {
      const allInputData = { id: new Date().getTime().toString(), name: inputData }
      setItems([...items, allInputData]);
      setInputData('')
    }
  }
  const deleteItem = (index) => {

    const updateditems = items.filter((elem) => {
      return index !== elem.id;
    })
    setItems(updateditems)
  }

  const editItem = (id) => {
    let newEditItem = items.find((elem) => {
      return elem.id === id
    })
    console.log(newEditItem)
    setToggleSubmit(false)
    setInputData(newEditItem.name)
    setIsEditItem(id)
  }

  const removeAll = () => {
    setItems([])
  }

  // add data to localstorage
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(items))
  }, [items]);

  return (
    <>
 <h1 style={{color:'black'}}><marquee> &hearts; TODO Mania &hearts; - A to-do app is a digital tool that helps you keep track of tasks and responsibilities you need to accomplish. With a to-do app, you can create lists of tasks, set deadlines, prioritize tasks, and mark them as complete once they are done - &hearts; TODO Mania &hearts; </marquee></h1>
      <div className="main-div">
      
        <div className="child-div">
     
          <figure>
            <img src={todo} alt="todologo " />
            <figcaption>Add Your List Here ⚜️ </figcaption>
          </figure>
          <div className="addItems">
            <input type="text" placeholder='🖍️ Add Items...' value={inputData} onChange={(e) => { setInputData(e.target.value) }} />
            {
            
            toggleSubmit ? <i className='fa fa-plus add-btn' title='Add Item' onClick={addItem}></i> : <i className='far fa-edit add-btn' title='Update Item' onClick={addItem}></i>
            }
          </div>
          <div className="showItems">
            {
              items.map((elem) => {
                return (
                  <div className="eachItem" key={elem.id}>
                    <h3>{elem.name}</h3>
                    <div className="todo-btn">

                      <i className='far fa-edit add-btn' title='Edit Item' onClick={() => editItem(elem.id)}></i>
                      <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={() => deleteItem(elem.id)}></i>
                    </div>
                  </div>

                )
              })
            }
          </div>
          {/*clear all the button  */}
          <div className="showItems">
            <button className='btn effect04' data-sm-link-text='Remove All' onClick={removeAll}><span>CHECK LIST</span></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Todo
