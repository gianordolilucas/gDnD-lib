import { useCallback } from 'react';

export const DragElement = ({
  id,
  onClick,
  onStartDrag,
  onDrag,
  onFinishDrag,
  children,
}: {
  id: string;
  onClick?: (id: string) => void;
  onStartDrag?: (id: string) => void;
  onDrag?: (id: string) => void;
  onFinishDrag?: (id: string) => void;
  children: React.ReactNode;
}) => {
  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.dataTransfer.setData('elementId', id);
      if (onStartDrag) onStartDrag(id);
    },
    [id, onStartDrag],
  );

  const handleDrag = useCallback(() => {
    if (onDrag) onDrag(id);
  }, [id, onDrag]);

  const handleDragEnd = useCallback(() => {
    if (onFinishDrag) onFinishDrag(id);
  }, [id, onFinishDrag]);

  const handleClick = useCallback(() => {
    if (onClick) onClick(id);
  }, [id, onClick]);

  return (
    <div
      className="drag-element"
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      onClick={handleClick}
    >
      {children}
    </div>
  );
};
