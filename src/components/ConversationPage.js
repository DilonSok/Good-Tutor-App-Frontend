import React, { useState } from "react";
import '../css/ConversationPage.css'
import '../css/message.css'


function ConversationPage() {


    //conversations will be added here with this array format to and from the database
    //array that 
    const [conversations, setConversations] = useState([
        {
            id: 1,
            tutorName: "Tutor One",
            messages: [
                { message: "Hey, I noticed you have availability Monday's to help out with my CS3354 class!", userID: 1 },
                { message: "Do you think we could do schedule something?", userID: 1 },
                { message: "Sounds awesome I would love to!", userID: 2 }
            ]
        },
        {
            id: 2,
            tutorName: "Tutor Two",
            messages: [
                { message: "This is convo two!" , id: 1},
                { message: "awesome" , id: 2}
            ]
        }
    ]);

    const [currentConversation, setCurrentConversation] = useState(null);
    // State to manage the list of messages
    const [messages, setMessages] = useState([]);

    // State to manage the current input value
    const [currentMessage, setCurrentMessage] = useState("");

    // Function to handle sending a message
    const sendMessage = () => {
        if (currentMessage.trim() !== "") {
            // Add the new message to the conversation
            const newMessage = {
                message: currentMessage,
                userID: 1 // Change this to the appropriate user ID
            };
            setMessages([...messages, newMessage]);

            // Clear the input field
            setCurrentMessage("");
        }
    };

    const loadMessages = (conversationID) => {
        const conversation = conversations.find(conv => conv.id === conversationID);
        if (conversation) {
            setMessages(conversation.messages);
            setCurrentConversation(conversation)
        }
    };

    // Function to handle input field changes
    const handleInputChange = (e) => {
        setCurrentMessage(e.target.value);
    };

    // Function to handle input field key press
    const handleKeyPress = (e) => {
        // Check if the key pressed is 'Enter'
        if (e.key === 'Enter') {
            sendMessage();
        }
    };
    return (
        <div className="conversations-page">
            <div className="conversations-page-container">
                <div className="conversations-container">
                    <div className="conversations-title">
                        Conversations
                    </div>
                    <div className="conversations-list-container">
                        {conversations.map((conversation, index) => (
                            <div
                                key={index}
                                className="conversation"
                                onClick={() => loadMessages(conversation.id)}
                            >
                                <div>{conversation.tutorName}</div>
                                <div>...</div>
                            </div>
                        ))}
                    </div>
                </div>
                {/*rendering of messages will populate here */}
                <div className="view-conversation-container">
                    <div className="recipient-name">
                        {currentConversation ? currentConversation.tutorName : "Select a Conversation"}
                    </div>
                    <div className="messages-container">
                        {/* Iterate over conversation array and render messages */}
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.userID === 1 ? "right" : "left"}`}>
                                {msg.message}
                            </div>
                        ))}
                    </div>
                    <input
                        type="text"
                        placeholder="Your message"
                        value={currentMessage}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={!currentConversation}
                    />
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;