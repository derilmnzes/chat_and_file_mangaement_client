import { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material";
import Layout from "../layout/Layout";
import ChatBubble from "../components/chatBubble";
import ChatIcon from "@mui/icons-material/ChatSharp";
import socket from "../socket/socket";

interface Message {
  name: string;
  message: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [toggleState, setToggleState] = useState(false);

  useEffect(() => {
    // Listen for incoming chat messages
    const chatMessageListener = (msg: Message) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    };
    socket.on("chat message", chatMessageListener);

    // Listen for stored messages
    const storedMessageListener = (storedMessages: Message[]) => {
      console.log(storedMessages);
      // Update the messages state with stored messages
      setMessages((prevMessages) => [...prevMessages, ...storedMessages]);
    };

    socket.on("Stored message", storedMessageListener);

    // Clean up event listeners
    return () => {
      socket.off("chat message", chatMessageListener);
      socket.off("Stored message", storedMessageListener);
    };
  }, []);

  const handleSendMessage = () => {
    socket.emit("chat message", newMessage);
    setNewMessage("");
  };

  return (
    <Layout>
      <div className="h-[90vh] flex flex-row items-center justify-center">
        {toggleState ? (
          <div className="w-full flex flex-row justify-between items-end  h-[100%]">
            <div className="md:w-[50%] w-[80%] ml-[18%] md:m-auto h-[100%]">
              <div className="w-full h-[90%]   flex-col flex justify-end">
                {messages?.length < 1 && (
                  <div className="text-center">
                    <h1>Welcome to the Group Chat</h1>
                  </div>
                )}
                <div className="overflow-y-scroll">
                  {messages?.map((messages, index) => (
                    <ChatBubble
                      key={index}
                      messages={messages}
                      isUser={index % 2 === 0}
                    />
                  ))}
                </div>
              </div>
              <div className="w-[100%] h-[10%] flex flex-row items-center">
                <TextField
                  label="Type your message"
                  variant="outlined"
                  fullWidth
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyUp={(e) => {
                    if (e.key === "Enter") {
                      handleSendMessage();
                    }
                  }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSendMessage}
                  style={{
                    marginLeft: 5,
                    padding: 12,
                  }}
                >
                  <ChatIcon className="mr-2" /> Send
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h1 className="md:text-4xl mb-2 font-bold">Join the Group Chat</h1>
            <Button
              variant="contained"
              onClick={() => {
                socket.emit("get messages");
                setToggleState(true);
              }}
            >
              Join
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
