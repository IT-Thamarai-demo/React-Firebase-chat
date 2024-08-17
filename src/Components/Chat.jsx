import React, { useState, useEffect } from "react";
import { addDoc, serverTimestamp, collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import "../styles/Chat.css";  // Import the CSS file


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Chat = (props) => {
    const { chat } = props;
    const [newMessage, setNewMessage] = useState("");
    const messageRef = collection(db, "demo");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const queryMessage = query(messageRef, where("chat", "==", chat),orderBy("createdAt"));
        const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
            const clientMessages = [];
            snapshot.forEach((doc) => {
                clientMessages.push({ ...doc.data(), id: doc.id });
            });
            setMessages(clientMessages);
            orderBy("createdAt")
        });

        return () => unsubscribe();
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

            // Show success notification
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

            // Show error notification
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
                        <span><strong>{message.user}</strong>: </span>  {/* Display the user */}
                        <span>{message.text}</span>
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
                <button className="chat-send-button" type="submit" >Send</button>
            </form>
            <ToastContainer /> {/* Add ToastContainer */}
        </div>
    );
};
