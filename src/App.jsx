import React, { useState, useRef } from "react";
import "./App.css";
import Auth from "./Components/Auth.jsx";
import { Chat } from "./Components/Chat.jsx";
import Cookies from "universal-cookie";
import { ToastContainer } from 'react-toastify'; // Import ToastContainer

const cookies = new Cookies();

function App() {
    const [isAuth, setAuth] = useState(cookies.get("auth-token"));
    const [Room, Setroom] = useState(null);
    const roominpref = useRef();

    if (!isAuth) {
        return (
            <div className="app-container">
                <Auth setISAuth={setAuth} />
            </div>
        );
    }

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>Welcome to My Chat Application!</h1>
                <p>Your go-to platform for real-time chat. Connect with others in various chat rooms.</p>
            </header>
            <div className="main-content">
                <aside className="sidebar">
                    <h2>Chat Rooms</h2>
                    <p>Select a chat room from the list below:</p>
                    <ul>
                        <li><button onClick={() => Setroom("General")}>General</button></li>
                        <li><button onClick={() => Setroom("Tech")}>Tech</button></li>
                        <li><button onClick={() => Setroom("Random")}>Random</button></li>
                    </ul>
                </aside>
                <div className="chat-area">
                    {Room ? (
                        <div className="chat-container">
                            <Chat chat={Room} />
                        </div>
                    ) : (
                        <div className="room-container">
                            <h2>Join a Chat Room</h2>
                            <p>Select or enter a room to start chatting. It's easy and quick!</p>
                            <label htmlFor="room">Enter Room Name:</label>
                            <input type="text" id="room" ref={roominpref} />
                            <button
                                onClick={() => {
                                    Setroom(roominpref.current.value);
                                }}
                            >
                                Enter Chat
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <footer className="app-footer">
                <p>© 2024 My Chat Application. All rights reserved.</p>
            </footer>
            <ToastContainer /> {/* Add ToastContainer */}
        </div>
    );
}

export default App;
 