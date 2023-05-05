import React, { useState } from "react";

function Entry() {
  const [inputValue, setInputValue] = useState(""); // input state

  const [items, setItems] = useState([]); // todos state

  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = (e) => {
    // submit fonk.
    e.preventDefault();
    if (inputValue.trim()) {
      addItem(inputValue);
      setInputValue("");
    }
  };

  const handleEdit = () => {
    
  }

  const addItem = (text) => {
    // add todo fonk.
    const newItem = { text, id: Date.now(), isComplete : false, isEditing : false};
    setItems([...items, newItem]);
  };
  const delItem = (id) => {
    // delete todo fonk.
    setItems(items.filter((item) => item.id !== id));
  };
  const completeItem = (id) => {
    // underline fonk
    // ...item ile diğer özellikleri saklıyoruz
    setItems(items.map((item) => item.id == id ? {...item, isComplete : !item.isComplete} : item))
  };
  const editItem = (id) => {
    // edit fonk.
    setItems(items.map((item) => item.id === id ? {...item, isEditing : true } : item))
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
      </form>
      <div>
        {items.map((item) => (
          <li key={item.id} style={{textDecoration : item.isComplete ? 'line-through' : 'none'}}>
            {" "}
            <span onClick={() => editItem(item.id)}> {item.text} </span>
            <button onClick={() => completeItem(item.id)}> 0 </button>
            <button onClick={() => delItem(item.id)}> X </button>
          </li>
        ))}
      </div>
    </div>
  );
}

export default Entry;
