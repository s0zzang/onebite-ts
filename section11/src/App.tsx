import React, { useReducer, useRef } from "react";
import { useContext } from "react";
import "./App.css";
import Editor from "./components/Editor";
import TodoItem from "./components/TodoItem";
import { Todo } from "./types";

type Action =
  | {
      type: "CREATE";
      data: { id: number; content: string };
    }
  | { type: "DELETE"; id: number };

function reducer(state: Todo[], action: Action) {
  switch (action.type) {
    case "CREATE": {
      return [...state, action.data];
    }
    case "DELETE": {
      return state.filter((it) => it.id !== action.id);
    }
  }
}

export const TodoStateContext = React.createContext<Todo[] | null>(null);
export const TodoDispatchContext = React.createContext<{
  onClickAdd: (text: string) => void;
  onClickDelete: (id: number) => void;
} | null>(null);

export function useTodoDIspatch() {
  const dispatch = useContext(TodoDispatchContext);
  if (!dispatch) throw new Error("TodoDIspatchContext에 문제가 있습니다.");
  return dispatch;
}

function App() {
  const [todos, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  console.log(todos);

  const onClickAdd = (text: string) => {
    // setTodos([...todos, { id: idRef.current++, content: text }]);
    dispatch({ type: "CREATE", data: { id: idRef.current++, content: text } });
  };

  const onClickDelete = (id: number) => [
    // setTodos(todos.filter((todo) => todo.id !== id)),
    dispatch({ type: "DELETE", id: id }),
  ];

  return (
    <div className="App">
      <h1>Todo</h1>
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={{ onClickAdd, onClickDelete }}>
          <Editor>
            <div>child</div>
          </Editor>
          <div>
            {todos.map((todo) => (
              <TodoItem key={todo.id} {...todo} />
            ))}
          </div>
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
