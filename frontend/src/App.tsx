import { useEffect, useState } from "react";

type Message = {
  id: number;
  name: string;
  message: string;
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/guestbook")
      .then(res => res.json())
      .then(data => setMessages(data));
  }, []);

  const submitMessage = async () => {
    await fetch("http://localhost:3000/guestbook", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, message })
    });

    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Guestbook</h1>

      <input
        placeholder="Your name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Message"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />

      <button onClick={submitMessage}>Submit</button>

      <hr />

      {messages.map(msg => (
        <p key={msg.id}>
          <strong>{msg.name}</strong>: {msg.message}
        </p>
      ))}
    </div>
  );
}

export default App;