import styled from "styled-components";
import { President } from "../types/president";

interface PresidentCardProps {
  president: President;
  offset: number;
  isDragging: boolean;
  direction: "left" | "right" | "none";
}

const Card = styled.div<{
  offset: number;
  isDragging: boolean;
  direction: "left" | "right" | "none";
}>`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateX(${(props) => props.offset}px);
  transition: ${(props) =>
    props.isDragging ? "none" : "transform 0.3s ease-out"};
  user-select: none;
  background: #132f4c;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  width: 100%;
  height: 40%;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 24px;
  color: #e3e3e3;
  flex: 1;
  overflow-y: auto;

  h2 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  h3 {
    font-size: 18px;
    color: #90caf9;
    margin-bottom: 16px;
  }

  p {
    &:first-of-type {
      color: #90caf9;
      font-size: 16px;
      margin-bottom: 16px;
    }
  }
`;

export const PresidentCard: React.FC<PresidentCardProps> = ({
  president,
  offset,
  isDragging,
  direction,
}) => {
  return (
    <Card offset={offset} isDragging={isDragging} direction={direction}>
      <Image src={president.imageUrl} alt={president.name} />
      <Content>
        <h2>{president.name}</h2>
        <h3>{president.orderNumber}th President</h3>
        <p>{president.yearsInOffice}</p>
        <p>{president.biography}</p>
      </Content>
    </Card>
  );
};
