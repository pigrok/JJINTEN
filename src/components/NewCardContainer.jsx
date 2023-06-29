import React, { useEffect } from "react";
import NewsCard from "./NewsCard";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setTodos } from "../redux/modules/todos";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
function NewsCardContainer() {
  const NewsCardContinerWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  `;

  const todos = useSelector((state) => {
    return state.todos;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "todos"));
        const todos = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          const createdAt = data.createdAt;
          return { id: doc.id, ...data, createdAt };
        });
        dispatch(setTodos(todos));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTodos(todos));
  }, [dispatch, todos]);

  const navigateClick = (todoId) => {
    navigate(`/${todoId}`);
  };

  const compare = (a, b) => {
    const aDate = new Date(modifiedDate(a));
    const bDate = new Date(modifiedDate(b));
    return bDate - aDate;
  };

  const modifiedDate = (todo) => {
    if (todo.isModified) {
      return todo.updatedAt;
    } else {
      return todo.createdAt;
    }
  };

  return (
    <NewsCardContinerWrapper>
      <div>
        {todos.sort(compare).map((todo) => {
          return (
            <div
              key={todo.id}
              style={{
                border: "1px solid black",
                padding: "10px",
                margin: "10px",
              }}
              onClick={() => navigateClick(todo.id)}
            >
              {todo.isModified ? <span>(수정됨)</span> : <></>}
              <p>{modifiedDate(todo)}</p>
              <p>카테고리 : {todo.category}</p>
              <p> 제목:{todo.title}</p>

              <p> 내용:{todo.body}</p>
            </div>
          );
        })}
      </div>
    </NewsCardContinerWrapper>
  );
}

export default NewsCardContainer;
