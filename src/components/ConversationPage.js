import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../css/ConversationPage.css';
import '../css/message.css';

function ConversationPage() {
    // Assuming you have a way to fetch the current user's ID
    const userID = 'yourUserId'; // Replace with the actual user's ID
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        // Fetch conversations when the component mounts
        Axios.get(`/messages/${userID}/conversations`)
            .then(response => {
                setConversations(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching conversations:', error);
            });
    }, [userID]);

    const sendMessage = () => {
        if (currentMessage.trim() !== "" && currentConversation) {
            // Assuming your backend API expects senderId, recipientId, and content
            Axios.post('/messages/send', {
                senderId: userID,
                recipientId: currentConversation.id, // Replace with the correct recipient ID
                content: currentMessage
            })
            .then(response => {
                // Update the conversation with the new message
                const updatedMessages = [...messages, { message: currentMessage, userID: userID }];
                setMessages(updatedMessages);
                setCurrentMessage("");
            })
            .catch(error => {
                console.error('Error sending message:', error);
            });
        }
    };

    const loadMessages = (conversationID) => {
        // Find the conversation and set it as the current conversation
        const conversation = conversations.find(conv => conv.id === conversationID);
        if (conversation) {
            setMessages(conversation.messages);
            setCurrentConversation(conversation);
        }
    };

    const handleInputChange = (e) => {
        setCurrentMessage(e.target.value);
    };

    const handleKeyPress = (e) => {
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
                <div className="view-conversation-container">
                    <div className="recipient-name">
                        {currentConversation ? currentConversation.tutorName : "Select a Conversation"}
                    </div>
                    <div className="messages-container">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.userID === userID ? "right" : "left"}`}>
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
