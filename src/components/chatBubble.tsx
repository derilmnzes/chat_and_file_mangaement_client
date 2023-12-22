import React from "react";
import { ChatBubbleOutline } from "@mui/icons-material";

import PersonIcon from "@mui/icons-material/Person";
import { useAppSelector } from "../redux/hooks";

interface ChatBubbleProps {
  messages: {
    name: string;
    message: string;
  };
  isUser: boolean;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ messages, isUser }) => {
  const userName = useAppSelector((v) => v.user.user);

  return (
    <div
      className={`w-[100%]  my-2 flex flex-row items-center ${
        userName !== messages.name ? "justify-start " : "justify-end"
      }  `}
    >
      <div
        className={`${
          userName === messages.name ? "bg-gray-100" : "bg-gray-300"
        } flex flex-row items-center ${
          isUser ? "justify-start " : "justify-end"
        } p-4 rounded-lg`}
      >
        <div className="flex flex-row items-center justify-start">
          <div>
            <div className="text-left mb-5 flex-row items-center justify-start">
              <PersonIcon /> <span className="">{messages.name}</span>
            </div>
            <div className="flex flex-row items-center justify-start">
              <ChatBubbleOutline fontSize="small" />
              <span className="ml-2">{messages.message}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
