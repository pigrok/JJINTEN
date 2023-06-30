const ADD_TODO = "todos/ADD_TODO";
const DELETE_TODO = "todos/DELETE_TODO";
const UPDATE_TODO = "todos/UPDATE_TODO";
const SET_TODOS = "todos/SET_TODOS";
const UPLOAD_FILE = "todos/UPLOAD_FILE";

export const addTodo = (todo) => ({
  type: ADD_TODO,
  payload: todo,
});

export const deleteTodo = (id) => ({
  type: DELETE_TODO,
  payload: id,
});

export const updateTodo = (id) => ({
  type: UPDATE_TODO,
  payload: id,
});

export const setTodos = (todos) => ({
  type: SET_TODOS,
  payload: todos,
});

const initialState = [];

// 리듀서 함수
const todos = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO: {
      let temp = [...state];
      temp.push(action.payload);
      return temp;
    }
    case DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);

    case UPDATE_TODO:
      return state.map((todo) => (todo.id === action.payload.id ? action.payload : todo));

    case SET_TODOS:
      return action.payload;

    case UPLOAD_FILE:
      return action.payload;

    default:
      return state;
  }
};

export default todos;
