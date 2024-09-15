import React, { useState, useEffect } from "react";
import { addDoc, serverTimestamp, collection, onSnapshot, query, where } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../styles/Chat.css";  // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { format } from 'date-fns';  // Import date-fns

export const Chat = (props) => {
    const { chat } = props;
    const [newMessage, setNewMessage] = useState("");
    const messageRef = collection(db, "Demo");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessage = query(messageRef, where("chat", "==", chat));
        const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
            const clientMessages = [];
            snapshot.forEach((doc) => {
                clientMessages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(clientMessages);
        });
    
        return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chat]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newMessage === "") return;

        try {
            await addDoc(messageRef, {
                text: newMessage,
                createdAt: serverTimestamp(),
                user: auth.currentUser.displayName,
                chat,
            });

            setNewMessage("");

            toast.success("Message sent successfully!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        } catch (error) {
            console.error("Error sending message: ", error);

            toast.error("Failed to send message. Please try again.", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored"
            });
        }
    };

    return (
        <div className="chat-container">
            <div><h1>Welcome To: {chat.toUpperCase()}</h1></div>
            <div className="messages">
                {messages.map((message) => (
                    <div className="message" key={message.id}>
                        <span><strong>{message.user}</strong>: </span>
                        <span>{message.text}</span>
                        <span className="timestamp">
                            {message.createdAt ? format(message.createdAt.toDate(), 'p, MMM dd') : 'Sending...'}
                        </span> {/* Display the formatted timestamp */}
                    </div>
                ))}
            </div>
            <form className="new-message-form" onSubmit={handleSubmit}>
                <input
                    className="new-message-input"
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message"
                    value={newMessage}
                />
                <button className="send-button" type="submit">Send</button>
            </form>
            <ToastContainer />
        </div>
    );
};
