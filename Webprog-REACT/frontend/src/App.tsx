import { useEffect, useState } from "react";

const API_URL =
  "https://fuzzy-umbrella-x575v9g9q7gcpq45-3000.app.github.dev/guestbook";

function App() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [entries, setEntries] = useState<any[]>([]);

  // 🔹 Fetch all guestbook entries
  const fetchEntries = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEntries(data);
    } catch (err) {
      console.error("Failed to fetch entries", err);
    }
  };

  useEffect(() => {
    fetchEntries();
  }, []);

  // 🔹 Submit new guestbook entry
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, message }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setName("");
      setMessage("");
      fetchEntries(); // refresh list after submit
    } catch (error) {
      console.error("Error submitting:", error);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Guestbook</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
        />

        <button type="submit">Submit</button>
      </form>

      <hr />

      {entries.map((entry) => (
        <div key={entry.id}>
          <strong>{entry.name}</strong>: {entry.message}
        </div>
      ))}
    </div>
  );
}

export default App;