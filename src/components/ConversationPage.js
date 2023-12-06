import React, { useState, useEffect } from "react";
import Axios from 'axios';
import '../css/ConversationPage.css';
import '../css/message.css';

function ConversationPage() {
    const currUser = JSON.parse(localStorage.getItem('user'));
    const userID = currUser._id;
    const [conversations, setConversations] = useState([]);
    const [currentConversation, setCurrentConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [currentMessage, setCurrentMessage] = useState("");

    useEffect(() => {
        Axios.get(`http://localhost:3500/messages/${userID}/conversations`)
            .then(async (response) => {
                const convs = response.data.data;
                console.log(convs);
                for (let conv of convs) {
                    const otherUserId = conv.participants.find(id => id !== userID);
                    console.log("yours " + userID)
                    console.log("theirs " + otherUserId)
                    const usernameResponse = 
                    await Axios.get(`http://localhost:3500/messages/username/${otherUserId}`);
                    console.log(usernameResponse)
                    conv.otherUsername = usernameResponse.data.username; // Add a new field to store the other user's username
                }
                setConversations(convs);
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
                return Axios.get(`http://localhost:3500/messages/${userID}/conversations`);
            })
            .then(response => {
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
                    <div className="conversations-title">Conversations</div>
                    <div className="conversations-list-container">
                        {conversations.map((conversation, index) => {
                            const otherUserId = conversation.participants.find(id => id !== userID);
                            const profilePic = `https://robohash.org/${otherUserId}.png?set=set4`;
                            const username = conversation.otherUsername;

                            return (
                                <div key={index} className="conversation" onClick={() => loadMessages(conversation._id)}>
                                    <img className='profile-picture' src={profilePic} alt={`${username}`} />
                                    <div>{username}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="view-conversation-container">
                    <div className="recipient-name">
                        {currentConversation ? currentConversation.otherUsername : "Select a Conversation"}
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
                    <input type="text" placeholder="Your message" value={currentMessage} onChange={handleInputChange} onKeyPress={handleKeyPress} disabled={!currentConversation} />
                </div>
            </div>
        </div>
    );
}

export default ConversationPage;
