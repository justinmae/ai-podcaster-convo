
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: number;
  speaker: "user" | "ai";
  text: string;
}

interface TranscriptPanelProps {
  isRecording: boolean;
}

const TranscriptPanel = ({ isRecording }: TranscriptPanelProps) => {
  // Placeholder messages for demo
  const messages: Message[] = [
    { id: 1, speaker: "ai", text: "Welcome! I'm your AI podcast host. What would you like to discuss today?" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 h-[400px] flex flex-col"
    >
      <div className="font-medium text-sm text-gray-500 dark:text-gray-400 mb-4">
        Transcript
      </div>
      <ScrollArea className="flex-1">
        <div className="space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, x: message.speaker === "user" ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${message.speaker === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.speaker === "user"
                    ? "bg-green-500 text-white"
                    : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                }`}
              >
                <p className="text-sm">{message.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
      {isRecording && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm text-gray-500 dark:text-gray-400 text-center"
        >
          Listening...
        </motion.div>
      )}
    </motion.div>
  );
};

export default TranscriptPanel;
