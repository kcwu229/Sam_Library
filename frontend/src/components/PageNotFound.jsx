import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SignUpImage from "../assets/images/oops.png";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Container className="w-screen h-screen">
      <div className="h-3/12 flex flex-col md:flex md:flex-row gap-4 items-center justify-center">
        <div className="flex h-2/6 w-3/6 md:h-5/6 justify-center">
          <img src={SignUpImage} className="h-1/6 w-4/6" />
        </div>
        <br />
        <div className="flex flex-col h-5/6 justify-center items-center gap-3 md:items-start">
          <h1 className="font-semibold text-4xl tmd:text-6xl text-red-600">
            OOPS !
          </h1>
          <h1 className="font-semibold text-2xlt md:text-4xl  text-gray-600 ">
            PAGE NOT FOUND
          </h1>
          <p className="w-8/12 tracking-wide md:text-lg text-sm font-light text-gray-600 md:flex px-10 md:px-0 text-left">
            Due to the network error, the page cannot be shown. Please check
            your network connection and try again.
          </p>
          <Button
            className="text-center md:flex flex justify-center items-center text-sm md:text-xl"
            onClick={() => navigate("/")}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f8f9fa;
`;

const Content = styled.div`
  text-align: center;
  max-width: 600px;
  padding: 20px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 72px;
  margin: 0;
  color: #343a40;
`;

const Subtitle = styled.h2`
  font-size: 24px;
  margin: 10px 0;
  color: #6c757d;
`;

const Description = styled.p`
  font-size: 16px;
  color: #6c757d;
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

export default PageNotFound;
