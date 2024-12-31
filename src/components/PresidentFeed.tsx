import { useState, useRef } from "react";
import styled from "styled-components";
import { President } from "../types/president";
import { PresidentCard } from "./PresidentCard";

const Container = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  height: calc(100vh - 128px);
  margin: 0 auto;
  overflow: hidden;
  touch-action: none;
`;

interface PresidentFeedProps {
  presidents: President[];
  onComplete: () => void;
}

export const PresidentFeed: React.FC<PresidentFeedProps> = ({
  presidents,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [direction, setDirection] = useState<"left" | "right" | "none">("none");
  const startX = useRef(0);
  const containerWidth = 600;

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    startX.current = "touches" in e ? e.touches[0].clientX : e.clientX;
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;

    const currentX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX.current;

    // Add resistance at the edges
    const resistance =
      (currentIndex === 0 && diff > 0) ||
      (currentIndex === presidents.length - 1 && diff < 0)
        ? 0.2
        : 1;

    setOffset(diff * resistance);
    setDirection(diff > 0 ? "right" : "left");
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    const threshold = 100;
    if (Math.abs(offset) > threshold) {
      if (offset > 0 && currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
      } else if (offset < 0 && currentIndex < presidents.length - 1) {
        setCurrentIndex(currentIndex + 1);
      }
    }

    setOffset(0);
    setDirection("none");

    if (currentIndex === presidents.length - 1) {
      onComplete();
    }
  };

  const getCardOffset = (index: number) => {
    const baseOffset = (index - currentIndex) * containerWidth;
    return baseOffset + offset;
  };

  return (
    <Container
      onMouseDown={handleDragStart}
      onMouseMove={handleDragMove}
      onMouseUp={handleDragEnd}
      onMouseLeave={handleDragEnd}
      onTouchStart={handleDragStart}
      onTouchMove={handleDragMove}
      onTouchEnd={handleDragEnd}
    >
      {presidents.map((president, index) => (
        <PresidentCard
          key={president.id}
          president={president}
          offset={getCardOffset(index)}
          isDragging={isDragging}
          direction={direction}
        />
      ))}
    </Container>
  );
};
