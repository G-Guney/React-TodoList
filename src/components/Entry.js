import React, { useState } from "react";

function Entry() {
  const [inputValue, setInputValue] = useState(""); // input state

  const [items, setItems] = useState([]); // todos state

  const [delBtn, setDelBtn] = useState(false);

  const handleSubmit = (e) => {
    // submit fonk.
    e.preventDefault();
    if (inputValue.trim()) {
      addItem(inputValue);
      setInputValue("");
    }
  };

  const addItem = (text) => {
    // add todo fonk.
    const newItem = {
      text,
      id: Date.now(),
      isComplete: false,
      isEditing: false,
    };
    setItems([...items, newItem]);
  };
  const delItem = (id) => {
    // delete todo fonk.
    setItems(items.filter((item) => item.id !== id));
  };
  const completeItem = (id) => {
    // underline fonk
    // ...item ile diğer özellikleri saklıyoruz

    setItems(
      items.map((item) =>
        item.id == id ? { ...item, isComplete: !item.isComplete } : item
      )
    );
  };
  const editItem = (id) => {
    // edit fonk.
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isEditing: true } : item
      )
    );
  };
  const handleItemBlur = (id) => {
    // focus out fonk
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, isEditing: false } : item
      )
    );
  };

  return (
    <div>
      <div className="form-box">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="What needs to be done?"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </form>
        <div>
          {items.map((item) =>
            item.isEditing ? (
              <input
                key={item.id}
                value={item.text}
                onChange={(e) =>
                  setItems(
                    items.map((i) =>
                      i.id === item.id ? { ...i, text: e.target.value } : i
                    )
                  )
                }
                onBlur={() => handleItemBlur(item.id)}
                autoFocus
              />
            ) : (
              <li
                className="todo-item"
                key={item.id}
                style={{
                  textDecoration: item.isComplete ? "line-through" : "none",
                }}
              >
                {" "}
                <span
                  onClick={() => editItem(item.id)}
                >
                  {" "}
                  {item.text}{" "}
                </span>
                <button
                  onClick={() => completeItem(item.id)}
                  className={item.isComplete ? "complete-btn" : "no-click"}
                >
                  {" "}
                  &#10003;{" "}
                </button>
                <button
                  onClick={() => delItem(item.id)}
                  className="delete-btn"
                >
                  {" "}
                  X{" "}
                </button>
              </li>
            )
          )}
        </div>
      </div>
      <div className="filter-box">
        <p>{items.length} items left</p>
      </div>
    </div>
  );
}

export default Entry;
