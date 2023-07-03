import React, { useState, useEffect } from "react";
import { styled } from "styled-components";
import { BsChevronCompactLeft, BsChevronCompactRight } from "react-icons/bs";

const Carousel = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide === images.length - 1 ? 0 : prevSlide + 1));
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [images.length]);

  return (
    <CarouselWrapper>
      <img src={images[currentSlide]} alt="Carousel Slide" />
    </CarouselWrapper>
  );
};

export default Carousel;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
`;
