
import { useEffect, useRef } from "react";

interface ElevenLabsConversationProps {
  isRecording: boolean;
}

const ElevenLabsConversation = ({ isRecording }: ElevenLabsConversationProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Create and load the script
    const script = document.createElement("script");
    script.src = "https://elevenlabs.io/convai-widget/index.js";
    script.async = true;
    script.type = "text/javascript";
    
    // Create the widget element
    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", "1eG0z3CytOswsQrWQyx8");
    
    // Add the elements to the container
    if (containerRef.current) {
      containerRef.current.appendChild(widget);
      document.body.appendChild(script);
    }
    
    return () => {
      // Cleanup
      script.remove();
      if (containerRef.current?.firstChild) {
        containerRef.current.removeChild(containerRef.current.firstChild);
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`w-full h-full ${!isRecording ? 'hidden' : ''}`}
    />
  );
};

export default ElevenLabsConversation;
