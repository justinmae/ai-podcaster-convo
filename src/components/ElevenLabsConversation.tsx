
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
    widget.setAttribute("call-to-action", "Start podcast"); // Customize the call to action text
    widget.setAttribute("mode", "full"); // Use full mode for centered experience
    widget.setAttribute("title", "AI Podcast Host"); // Custom title
    
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
      className={`w-full h-full min-h-[600px] flex items-center justify-center ${!isRecording ? 'hidden' : ''}`}
    />
  );
};

export default ElevenLabsConversation;
