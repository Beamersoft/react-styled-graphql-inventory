import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export const Spinner = styled.div`
  display: block;
  margin: 10px auto;
  width: 20px;
  height: 20px;
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top-color: #007bff;
  animation: ${spin} 1s linear infinite;
`;

export const ProductCard = styled.div`
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.03);
  }
`;

export const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const ProdInfo = styled.div`
  padding: 0.5rem;
`;

export const ProductName = styled.h3`
  margin: 0.5rem 0;
`;

export const ProductDescription = styled.p`
  color: #666;
`;

export const ProductPrice = styled.div`
  padding-top: 8px;
  font-weight: bold;
`;

export const StyledSelect = styled.select`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

export const StyledButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  text-transform: uppercase;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0056b3;
  }

  &:focus {
    outline: none;
  }
`;