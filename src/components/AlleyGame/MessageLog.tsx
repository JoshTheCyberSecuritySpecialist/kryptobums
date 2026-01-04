import { useEffect, useRef } from 'react';

interface MessageLogProps {
  messages: string[];
}

export const MessageLog = ({ messages }: MessageLogProps) => {
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (logRef.current) {
      logRef.current.scrollTop = logRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="bg-[#0B0D10] border-2 border-[#00FF9C] p-4 overflow-y-auto font-mono text-xs"
         style={{ height: '180px' }}
         ref={logRef}>
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className="text-[#00FF9C] mb-1"
          style={{
            textShadow: msg.includes('⚡') ? '0 0 8px #00FF9C' : 'none',
            transform: msg.includes('!') ? 'translateX(1px)' : 'none',
          }}
        >
          <span className="text-[#3B82F6] mr-2">&gt;</span>
          {msg}
        </div>
      ))}
    </div>
  );
};
