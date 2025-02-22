
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
    
    // Create the widget element with all attributes set
    const widget = document.createElement("elevenlabs-convai");
    widget.setAttribute("agent-id", "1eG0z3CytOswsQrWQyx8");
    widget.setAttribute("call-to-action", "Start podcast");
    widget.setAttribute("title", "AI Podcast Host");
    
    // Add the elements to the container
    if (containerRef.current) {
      containerRef.current.appendChild(script);
      containerRef.current.appendChild(widget);
    }
    
    return () => {
      // Cleanup
      if (containerRef.current) {
        const scripts = containerRef.current.getElementsByTagName('script');
        const widgets = containerRef.current.getElementsByTagName('elevenlabs-convai');
        
        // Remove all instances of the script and widget
        while (scripts.length > 0) scripts[0].remove();
        while (widgets.length > 0) widgets[0].remove();
      }
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className={`w-full h-full flex items-center justify-center ${!isRecording ? 'hidden' : ''}`}
      style={{ minHeight: 'calc(100vh - 300px)' }}
    />
  );
};

export default ElevenLabsConversation;
