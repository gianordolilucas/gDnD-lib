import { useState, useCallback, useMemo } from 'react';

export const DropRegion = ({
  children,
  onDrop,
}: {
  children: React.ReactNode;
  onDrop: (id: string) => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Memoize a classe CSS baseada no estado
  const dropRegionClass = useMemo(
    () => (isHovered ? 'drop-region highlighted' : 'drop-region'),
    [isHovered],
  );

  // Usar useCallback para evitar re-criação das funções a cada renderização
  const handleDragEnter = useCallback(() => setIsHovered(true), []);
  const handleDragLeave = useCallback(() => setIsHovered(false), []);

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setIsHovered(false);
      const cardId = e.dataTransfer.getData('cardId');
      if (onDrop) onDrop(cardId);
    },
    [onDrop],
  );

  return (
    <div
      className={dropRegionClass}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
};
