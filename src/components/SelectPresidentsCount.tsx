import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
`;

const Title = styled.h1`
  margin-bottom: 2rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1.2rem;
  width: 100px;
  text-align: center;
  border: 2px solid #ccc;
  border-radius: 4px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  font-size: 1.1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

interface SelectPresidentsCountProps {
  totalPresidents: number;
  onSubmit: (count: number) => void;
}

export const SelectPresidentsCount: React.FC<SelectPresidentsCountProps> = ({
  totalPresidents,
  onSubmit,
}) => {
  const [count, setCount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numCount = parseInt(count);
    if (numCount > 0 && numCount <= totalPresidents) {
      onSubmit(numCount);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (
      value === "" ||
      (/^\d+$/.test(value) && parseInt(value) <= totalPresidents)
    ) {
      setCount(value);
    }
  };

  return (
    <Container>
      <Title>Presidential History Feed</Title>
      <Form onSubmit={handleSubmit}>
        <p>How many presidents would you like to learn about?</p>
        <p>(1-{totalPresidents} presidents available)</p>
        <Input
          type="number"
          min="1"
          max={totalPresidents}
          value={count}
          onChange={handleChange}
          placeholder="Count"
        />
        <Button
          type="submit"
          disabled={
            !count || parseInt(count) < 1 || parseInt(count) > totalPresidents
          }
        >
          Start
        </Button>
      </Form>
    </Container>
  );
};
