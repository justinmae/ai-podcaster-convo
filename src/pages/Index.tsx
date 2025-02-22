
import { useState } from "react";
import { motion } from "framer-motion";
import VideoPreview from "@/components/VideoPreview";
import ElevenLabsConversation from "@/components/ElevenLabsConversation";

const Index = () => {
  const [isRecording, setIsRecording] = useState(true);

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

          <div className="grid grid-cols-1 gap-6">
            <div className="w-full flex justify-center">
              <div className="w-full">
                <ElevenLabsConversation isRecording={isRecording} />
              </div>
            </div>
            
            <div className="w-full max-w-lg mx-auto">
              <VideoPreview isRecording={isRecording} />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
