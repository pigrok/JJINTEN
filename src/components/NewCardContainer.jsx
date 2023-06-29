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
    @media screen and (min-width: 520px) {
      grid-template-columns: repeat(2, 1fr);
    }
    @media screen and (min-width: 780px) {
      grid-template-columns: repeat(3, 1fr);
    }
    @media screen and (min-width: 1060px) {
      grid-template-columns: repeat(4, 1fr);
    }
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

  const compareDateCard = (a, b) => {
    const aDate = new Date(modifiedDateCard(a));
    const bDate = new Date(modifiedDateCard(b));
    return bDate - aDate;
  };

  const modifiedDateCard = (todo) => {
    if (todo.isModified) {
      return todo.updatedAt;
    } else {
      return todo.createdAt;
    }
  };

  return (
    <NewsCardContinerWrapper>
      {todos.sort(compareDateCard).map((todo) => {
        return (
          <NewsCard
            key={todo.id}
            onClickFunc={() => navigateClick(todo.id)}
            createdAt={todo.createdAt}
            category={todo.category}
            title={todo.title}
            body={todo.body}
            writer={todo.writer}
            updatedAt={todo.updatedAt}
            isModified={todo.isModified}
          />
        );
      })}
    </NewsCardContinerWrapper>
  );
}

export default NewsCardContainer;
