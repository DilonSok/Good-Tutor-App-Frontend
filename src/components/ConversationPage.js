import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../css/ConversationPage.css';
import '../css/message.css';

function ConversationPage() {
    const userID = localStorage.getItem('userID');
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const username = user.username || 'default';
    
    useEffect(() => {
        Axios.get(`http://localhost:3500/messages/${userID}/conversations`)
            .then(response => {
                console.log(response);
                setConversations(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching conversations:', error);
            });
    }, [userID]);

    const sendMessage = () => {
        if (currentMessage.trim() !== "" && currentConversation) {
            Axios.post('http://localhost:3500/messages/send', {
                senderId: userID,
                conversationId: currentConversation._id,
                content: currentMessage
            })
                .then(() => {
                    // Re-fetch the conversation to get updated messages
                    return Axios.get(`http://localhost:3500/messages/${userID}/conversations`);
                })
                .then(response => {
                    // Update conversations and reset the current conversation
                    setConversations(response.data.data);
                    const updatedCurrentConversation = response.data.data.find(conv => conv._id === currentConversation._id);
                    setCurrentConversation(updatedCurrentConversation);
                    setMessages(updatedCurrentConversation ? updatedCurrentConversation.messages : []);
                    setCurrentMessage("");
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }
    };

    const loadMessages = (conversationID) => {
        const conversation = conversations.find(conv => conv._id === conversationID);
        if (conversation) {
            console.log(conversation.conversationTitle)
            setCurrentConversation(conversation);
            setMessages(conversation.messages);
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
                    {conversations.map((conversation, index) => {
                        // Define profilePic here so it has access to the current `conversation`
                        let profilePic = `https://robohash.org/${conversation.conversationTitle}.png?set=set4`;

                        return (
                            <div
                                key={index}
                                className="conversation"
                                onClick={() => loadMessages(conversation._id)}
                            >
                                <img className='profile-picture' src={profilePic} alt={`${conversation.conversationTitle}`} />
                                <div>{conversation.conversationTitle}</div>
                            </div>
                        );
                    })}
                </div>
                </div>
                <div className="view-conversation-container">
                    <div className="recipient-name">
                        {currentConversation ? currentConversation.conversationTitle : "Select a Conversation"}
                    </div>
                    <div className="messages-container">
                        {messages.map((msg, index) => (
                            <div key={index} className={`message ${msg.sender._id === userID ? "right" : "left"}`}>
                            {msg.sender._id === userID && ( // Only for user's messages
                                <span className="delivery-status">
                                    {msg.deliveryStatus ? '✓' : '✗'} {/* Checkmark or X symbol */}
                                </span>
                            )}
                            {msg.content}
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
