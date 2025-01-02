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
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: top;
  flex-shrink: 0;
`;

const Content = styled.div`
  padding: 24px;
  color: #e3e3e3;
  flex: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  -ms-overflow-style: none;
  scrollbar-width: none;

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
