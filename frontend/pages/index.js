/*import { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/getContract";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWallet(accounts[0]);
      alert("Wallet Connected");
    } catch (err) {
      console.error(err);
    }
  };

  const loadConversation = async () => {
    try {
      if (!receiver || !ethers.isAddress(receiver)) {
        alert("Please enter a valid receiver address");
        return;
      }

      const contract = await getContract();
      if (!contract) return;

      const msgs = await contract.getConversation(receiver);

      const formatted = msgs.map((m) => ({
        sender: m.sender ?? m[0],
        receiver: m.receiver ?? m[1],
        content: m.content ?? m[2],
        timestamp: m.timestamp ?? m[3],
      }));

      setMessages(formatted);
    } catch (err) {
      console.error("FULL ERROR:", err);
      alert(err.reason || err.message);
    }
  };

  const sendMessage = async () => {
    try {
      if (!receiver || !ethers.isAddress(receiver)) {
        alert("Please enter a valid receiver address");
        return;
      }
      if (!message.trim()) {
        alert("Message cannot be empty");
        return;
      }

      setLoading(true);
      const contract = await getContract();
      if (!contract) {
        setLoading(false);
        return;
      }

      const tx = await contract.sendMessage(receiver, message);
      await tx.wait();

      setMessage("");
      await loadConversation();
    } catch (err) {
      console.error("FULL ERROR:", err);
      alert(err.reason || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#111827,#1e293b)",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          💬 Web3 Messenger V2
        </h1>

        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            padding: "20px",
            borderRadius: "20px",
            marginBottom: "20px",
          }}
        >
          {!wallet ? (
            <button
              onClick={connectWallet}
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "none",
                background: "#3b82f6",
                color: "white",
                cursor: "pointer",
              }}
            >
              Connect Wallet
            </button>
          ) : (
            <>
              <h3>🟢 Connected</h3>
              <p>{wallet}</p>
            </>
          )}
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Receiver Wallet Address"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "15px",
              color: "black",
              background: "white",
            }}
          />

          <button
            onClick={loadConversation}
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#6366f1",
              color: "white",
              cursor: "pointer",
            }}
          >
            Load Conversation
          </button>

          <div
            style={{
              height: "400px",
              overflowY: "auto",
              marginBottom: "20px",
              padding: "10px",
            }}
          >
            {messages.map((msg, index) => {
              const mine =
                wallet &&
                msg.sender &&
                msg.sender.toLowerCase() === wallet.toLowerCase();

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: mine ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "70%",
                      background: mine ? "#10b981" : "#374151",
                      padding: "12px",
                      borderRadius: "16px",
                    }}
                  >
                    <div>{msg.content}</div>
                    <small>
                      {new Date(Number(msg.timestamp) * 1000).toLocaleString()}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                color: "black",
                background: "white",
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "none",
                background: "#10b981",
                color: "white",
                cursor: "pointer",
              }}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
*/

import { useState } from "react";
import { ethers } from "ethers";
import { getContract } from "../utils/getContract";

export default function Home() {
  const [wallet, setWallet] = useState("");
  const [receiver, setReceiver] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWallet(accounts[0]);
      alert("Wallet Connected");
    } catch (err) {
      console.error(err);
    }
  };

  const loadConversation = async () => {
    try {
      if (!receiver || !ethers.isAddress(receiver)) {
        alert("Please enter a valid receiver address");
        return;
      }

      const contract = await getContract();
      if (!contract) return;

      const msgs = await contract.getConversation(receiver);

      const formatted = msgs.map((m) => ({
        sender: m.sender ?? m[0],
        receiver: m.receiver ?? m[1],
        content: m.content ?? m[2],
        timestamp: m.timestamp ?? m[3],
      }));

      setMessages(formatted);
    } catch (err) {
      console.error("FULL ERROR:", err);
      alert(err.reason || err.message);
    }
  };

  const sendMessage = async () => {
    try {
      if (!receiver || !ethers.isAddress(receiver)) {
        alert("Please enter a valid receiver address");
        return;
      }
      if (!message.trim()) {
        alert("Message cannot be empty");
        return;
      }

      setLoading(true);
      const contract = await getContract();
      if (!contract) {
        setLoading(false);
        return;
      }

      const tx = await contract.sendMessage(receiver, message, {
        maxPriorityFeePerGas: ethers.parseUnits("30", "gwei"),
        maxFeePerGas: ethers.parseUnits("60", "gwei"),
      });
      await tx.wait();

      setMessage("");
      await loadConversation();
    } catch (err) {
      console.error("FULL ERROR:", err);
      alert(err.reason || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#0f172a,#111827,#1e293b)",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "20px",
          }}
        >
          💬 Web3 Messenger V2
        </h1>

        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            padding: "20px",
            borderRadius: "20px",
            marginBottom: "20px",
          }}
        >
          {!wallet ? (
            <button
              onClick={connectWallet}
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "none",
                background: "#3b82f6",
                color: "white",
                cursor: "pointer",
              }}
            >
              Connect Wallet
            </button>
          ) : (
            <>
              <h3>🟢 Connected</h3>
              <p>{wallet}</p>
              <button
                onClick={() => setReceiver(wallet)}
                style={{
                  marginTop: "10px",
                  padding: "8px 16px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#f59e0b",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                📝 Message Myself
              </button>
            </>
          )}
        </div>

        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            padding: "20px",
            borderRadius: "20px",
          }}
        >
          <input
            type="text"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            placeholder="Receiver Wallet Address"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "10px",
              marginBottom: "15px",
              color: "black",
              background: "white",
            }}
          />

          <button
            onClick={loadConversation}
            style={{
              marginBottom: "20px",
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: "#6366f1",
              color: "white",
              cursor: "pointer",
            }}
          >
            Load Conversation
          </button>

          <div
            style={{
              height: "400px",
              overflowY: "auto",
              marginBottom: "20px",
              padding: "10px",
            }}
          >
            {messages.map((msg, index) => {
              const mine =
                wallet &&
                msg.sender &&
                msg.sender.toLowerCase() === wallet.toLowerCase();

              return (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    justifyContent: mine ? "flex-end" : "flex-start",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "70%",
                      background: mine ? "#10b981" : "#374151",
                      padding: "12px",
                      borderRadius: "16px",
                    }}
                  >
                    <div>{msg.content}</div>
                    <small>
                      {new Date(Number(msg.timestamp) * 1000).toLocaleString()}
                    </small>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              gap: "10px",
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                padding: "12px",
                borderRadius: "10px",
                color: "black",
                background: "white",
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                padding: "12px 20px",
                borderRadius: "10px",
                border: "none",
                background: "#10b981",
                color: "white",
                cursor: "pointer",
              }}
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}