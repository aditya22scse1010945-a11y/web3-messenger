import { getContract } from "../utils/contract";
import { useState } from "react";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Install MetaMask");
      return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const sendMessage = async () => {
    const contract = await getContract();
    if (!contract) return;

    const tx = await contract.sendMessage(message);
    await tx.wait();

    console.log("Message sent ✅");
    setMessage("");
    loadMessages();
  };

  const loadMessages = async () => {
    const contract = await getContract();
    if (!contract) return;

    const data = await contract.getMessages();
    setMessages(data);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Web3 Messenger</h1>

      <button onClick={connectWallet}>Connect Wallet</button>
      <br /><br />

      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message"
      />
      <button onClick={sendMessage}>Send</button>

      <br /><br />

      <button onClick={loadMessages}>Load Messages</button>

      <div>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.sender.slice(0, 6)}:</b> {m.content}
          </p>
        ))}
      </div>
    </div>
  );
}