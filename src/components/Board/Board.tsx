import { useEffect, useMemo, useCallback } from 'react';

export const Board = ({
  children,
  websocketUrl,
  onMessage,
}: {
  children: React.ReactNode;
  websocketUrl: string;
  onMessage: (data: unknown) => void;
}) => {
  const socket = useMemo(() => new WebSocket(websocketUrl), [websocketUrl]);

  const handleMessage = useCallback(
    (event: MessageEvent) => {
      const data = JSON.parse(event.data);
      if (onMessage) onMessage(data);
    },
    [onMessage],
  );

  useEffect(() => {
    socket.onopen = () => console.log('WebSocket connected');
    socket.onmessage = handleMessage;

    return () => {
      socket.close();
    };
  }, [socket, handleMessage]);

  return <div className="board">{children}</div>;
};
