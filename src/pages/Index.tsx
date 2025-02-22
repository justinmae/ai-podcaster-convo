
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Camera, StopCircle, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import TranscriptPanel from "@/components/TranscriptPanel";
import VideoPreview from "@/components/VideoPreview";
import RecordingStatus from "@/components/RecordingStatus";
import ElevenLabsConversation from "@/components/ElevenLabsConversation";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);
  const { toast } = useToast();

  const requestPermissions = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setHasPermissions(true);
      return stream;
    } catch (error) {
      toast({
        title: "Permission Error",
        description: "Please enable camera and microphone access to record.",
        variant: "destructive",
      });
      return null;
    }
  };

  const startRecording = async () => {
    const stream = await requestPermissions();
    if (stream) {
      setIsRecording(true);
      toast({
        title: "Recording Started",
        description: "Your podcast recording is now in progress.",
      });
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording Stopped",
      description: "Your podcast recording has been saved.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <header className="text-center mb-8">
            <motion.h1 
              className="text-4xl font-bold mb-2 text-gray-900 dark:text-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Podcast Studio
            </motion.h1>
            <motion.p 
              className="text-gray-600 dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Create amazing conversations with AI
            </motion.p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <VideoPreview isRecording={isRecording} />
              <div className="mt-4">
                <ElevenLabsConversation isRecording={isRecording} />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <TranscriptPanel isRecording={isRecording} />
            </div>
          </div>

          <motion.div 
            className="mt-8 flex justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <RecordingStatus isRecording={isRecording} />
            
            <AnimatePresence mode="wait">
              {!isRecording ? (
                <motion.div
                  key="start"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Button
                    onClick={startRecording}
                    className="bg-green-500 hover:bg-green-600 text-white"
                    size="lg"
                  >
                    <Mic className="w-5 h-5 mr-2" />
                    Start Recording
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="stop"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Button
                    onClick={stopRecording}
                    variant="destructive"
                    size="lg"
                  >
                    <StopCircle className="w-5 h-5 mr-2" />
                    Stop Recording
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
