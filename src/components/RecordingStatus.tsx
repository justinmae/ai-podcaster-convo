
import { motion } from "framer-motion";

interface RecordingStatusProps {
  isRecording: boolean;
}

const RecordingStatus = ({ isRecording }: RecordingStatusProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center gap-2"
    >
      {isRecording && (
        <>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="h-3 w-3 rounded-full bg-red-500"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            Recording in progress...
          </span>
        </>
      )}
    </motion.div>
  );
};

export default RecordingStatus;
