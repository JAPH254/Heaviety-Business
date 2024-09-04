import React, { useEffect, useState } from 'react';

const Chat = () => {
    const [messages, setMessages] = useState([]);
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const ws = new WebSocket('ws://localhost:8000/api/ws/chat/');
        ws.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setMessages((prevMessages) => [...prevMessages, data.message]);
        };
        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = (message) => {
        if (socket) {
            socket.send(JSON.stringify({ message }));
        }
    };

    return (
        <div>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <button onClick={() => sendMessage('Hello World!')}>Send Message</button>
        </div>
    );
};

export default Chat;
