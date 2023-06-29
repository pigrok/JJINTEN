import React, { useEffect } from "react";
import NewsCard from "./NewsCard";
import { styled } from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchTodos } from "../redux/modules/todos";
import { setTodos } from "../redux/modules/todos";
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
    dispatch(fetchTodos());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setTodos(todos));
  }, [dispatch, todos]);

  const navigateClick = (todoId) => {
    navigate(`/${todoId}`);
  };

  const compare = (a, b) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return bDate - aDate;
  };
  return (
    <NewsCardContinerWrapper>
      {todos.sort(compare).map((todo) => {
        return <NewsCard key={todo.id} onClickFunc={() => navigateClick(todo.id)} createdAt={todo.createdAt} category={todo.category} title={todo.title} body={todo.body} />;
      })}
    </NewsCardContinerWrapper>
  );
}

export default NewsCardContainer;
