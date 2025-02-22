
import { useRef } from "react";

interface ElevenLabsConversationProps {
  isRecording: boolean;
}

const ElevenLabsConversation = ({ isRecording }: ElevenLabsConversationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <div 
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center ${!isRecording ? 'hidden' : ''}`}
    >
      <iframe 
        src="https://elevenlabs.io/app/talk-to?agent_id=1eG0z3CytOswsQrWQyx8"
        className="w-full border-none"
        style={{ minHeight: 'calc(100vh - 300px)' }}
        allow="microphone"
      />
    </div>
  );
};

export default ElevenLabsConversation;
