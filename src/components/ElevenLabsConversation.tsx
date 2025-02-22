
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mic, MicOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ElevenLabsConversationProps {
  isRecording: boolean;
}

const ElevenLabsConversation = ({ isRecording }: ElevenLabsConversationProps) => {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const audioContext = useRef<AudioContext | null>(null);
  const { toast } = useToast();
  
  const startConversation = async () => {
    try {
      setIsConnecting(true);
      
      // Get the API key from Supabase
      const { data, error } = await supabase.functions.invoke('get-secret', {
        body: { name: 'ELEVENLABS_API_KEY' }
      });

      if (error) {
        throw new Error(`Failed to get API key: ${error.message}`);
      }

      if (!data?.key) {
        throw new Error('ElevenLabs API key not found');
      }

      // Initialize WebSocket connection with API key in the URL
      const socket = new WebSocket(`wss://api.elevenlabs.io/v1/agent?xi-api-key=${data.key}`);
      
      socket.onopen = () => {
        console.log('WebSocket connection established');
        setIsConnecting(false);
        
        // Send initial configuration
        socket.send(JSON.stringify({
          type: 'session.create',
          session: {
            modalities: ['text', 'audio'],
            input_audio_format: 'pcm16',
            output_audio_format: 'pcm16',
            input_audio_transcription: {
              model: 'whisper-1'
            },
            turn_detection: {
              type: 'server_vad',
              threshold: 0.5,
              prefix_padding_ms: 300,
              silence_duration_ms: 1000
            }
          }
        }));
      };

      socket.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        console.log('Received message:', data);

        if (data.type === 'session.created') {
          // Session created successfully, update settings
          socket.send(JSON.stringify({
            type: 'session.update',
            session: {
              instructions: "You are a helpful assistant. You will help the user with their questions.",
              voice: "alloy",
              language: "en"
            }
          }));
        }
        else if (data.type === 'response.audio.delta') {
          // Handle incoming audio data
          if (!audioContext.current) {
            audioContext.current = new AudioContext();
          }
          
          // Convert base64 to audio data and play it
          const audioData = atob(data.delta);
          const arrayBuffer = new ArrayBuffer(audioData.length);
          const view = new Uint8Array(arrayBuffer);
          for (let i = 0; i < audioData.length; i++) {
            view[i] = audioData.charCodeAt(i);
          }
          
          try {
            const audioBuffer = await audioContext.current.decodeAudioData(arrayBuffer);
            const source = audioContext.current.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(audioContext.current.destination);
            source.start(0);
            setIsSpeaking(true);
            
            source.onended = () => {
              setIsSpeaking(false);
            };
          } catch (error) {
            console.error('Error playing audio:', error);
          }
        }
      };

      socket.onerror = (error) => {
        console.error('WebSocket error:', error);
        toast({
          title: "Connection Error",
          description: "Failed to connect to ElevenLabs. Please try again.",
          variant: "destructive",
        });
        setIsConnecting(false);
      };

      socket.onclose = () => {
        console.log('WebSocket connection closed');
        setIsConnecting(false);
        setWs(null);
      };

      setWs(socket);
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to start conversation. Please try again.",
        variant: "destructive",
      });
      setIsConnecting(false);
    }
  };

  useEffect(() => {
    if (isRecording && !ws) {
      startConversation();
    }
    
    return () => {
      if (ws) {
        ws.close();
      }
      if (audioContext.current) {
        audioContext.current.close();
      }
    };
  }, [isRecording]);

  return (
    <div className={`w-full h-full flex flex-col items-center justify-center gap-4 ${!isRecording ? 'hidden' : ''}`}>
      <div className="flex items-center gap-2">
        {isConnecting ? (
          <div className="text-gray-600 dark:text-gray-400">
            Connecting...
          </div>
        ) : isSpeaking ? (
          <Mic className="w-6 h-6 text-green-500 animate-pulse" />
        ) : (
          <MicOff className="w-6 h-6 text-gray-500" />
        )}
      </div>
      
      {ws && (
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {isSpeaking ? "Assistant is speaking..." : "Listening..."}
        </div>
      )}
      
      {!ws && !isConnecting && (
        <Button onClick={startConversation} disabled={isConnecting}>
          Start Conversation
        </Button>
      )}
    </div>
  );
};

export default ElevenLabsConversation;
