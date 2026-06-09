/*import { getContract } from "../utils/getContract";

export default function Home() {

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask");
      return;
    }
    await window.ethereum.request({ method: "eth_requestAccounts" });
  };

  const sendMessage = async () => {
    const contract = await getContract();
    const tx = await contract.sendMessage("Hello Web3!");
    await tx.wait();
    console.log("Message sent");
  };

  const getMessages = async () => {
    const contract = await getContract();
    const msgs = await contract.getMessages();
    console.log(msgs);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Web3 Messenger</h1>

      <button onClick={connectWallet}>Connect Wallet</button>
      <br /><br />

      <button onClick={sendMessage}>Send Message</button>
      <br /><br />

      <button onClick={getMessages}>Get Messages</button>
    </div>
  );
}
  */



import { useState } from "react";
import { getContract } from "../utils/getContract";

export default function Home() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        showToast("Please install MetaMask");
        return;
      }

      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      setWallet(accounts[0]);
      showToast("Wallet Connected");
    } catch (err) {
      console.error(err);
      showToast("Connection Failed");
    }
  };

  const getMessages = async () => {
    try {
      setLoading(true);

      const contract = await getContract();

      if (!contract) {
        showToast("Connect wallet first");
        return;
      }

      const msgs = await contract.getMessages();

      setMessages(msgs);

      showToast(`Loaded ${msgs.length} messages`);
    } catch (err) {
      console.error(err);
      showToast("Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async () => {
    try {
      if (!message.trim()) {
        showToast("Enter a message");
        return;
      }

      setLoading(true);

      const contract = await getContract();

      if (!contract) {
        showToast("Connect wallet first");
        return;
      }

      const tx = await contract.sendMessage(message);

      showToast("Waiting for confirmation...");

      await tx.wait();

      setMessage("");

      showToast("Message Sent!");

      await getMessages();
    } catch (err) {
      console.error(err);

      if (
        err.code === "ACTION_REJECTED" ||
        err.code === 4001
      ) {
        showToast("Transaction Rejected");
      } else {
        showToast("Transaction Failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(135deg,#0f172a,#111827,#1e293b)",
        color: "white",
        padding: "30px",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Toast */}
      {toast && (
        <div
          style={{
            position: "fixed",
            top: 20,
            right: 20,
            background: "#22c55e",
            color: "white",
            padding: "12px 20px",
            borderRadius: "12px",
            zIndex: 1000,
          }}
        >
          {toast}
        </div>
      )}

      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "3rem",
            marginBottom: "30px",
          }}
        >
          🚀 Web3 Messenger
        </h1>

        {/* Wallet Card */}
        <div
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "20px",
            marginBottom: "20px",
          }}
        >
          {!wallet ? (
            <button
              onClick={connectWallet}
              style={{
                width: "100%",
                padding: "15px",
                borderRadius: "12px",
                border: "none",
                background: "#3b82f6",
                color: "white",
                cursor: "pointer",
                fontSize: "16px",
              }}
            >
              Connect Wallet
            </button>
          ) : (
            <>
              <h3>🟢 Wallet Connected</h3>
              <p>{wallet}</p>
            </>
          )}
        </div>

        {/* Chat Area */}
        <div
          style={{
            backdropFilter: "blur(20px)",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "20px",
            padding: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "20px",
            }}
          >
            <h2>Messages</h2>

            <button
              onClick={getMessages}
              style={{
                background: "#6366f1",
                color: "white",
                border: "none",
                padding: "10px 16px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              Refresh
            </button>
          </div>

          <div
            style={{
              height: "400px",
              overflowY: "auto",
              marginBottom: "20px",
            }}
          >
            {messages.length === 0 ? (
              <p style={{ opacity: 0.7 }}>
                No messages loaded yet.
              </p>
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    padding: "15px",
                    borderRadius: "16px",
                    marginBottom: "12px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      opacity: 0.7,
                    }}
                  >
                    {msg.sender}
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "16px",
                    }}
                  >
                    {msg.content}
                  </div>

                  <div
                    style={{
                      marginTop: "8px",
                      fontSize: "11px",
                      opacity: 0.6,
                    }}
                  >
                    {new Date(
                      Number(msg.timestamp) * 1000
                    ).toLocaleString()}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Input Area */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              style={{
                flex: 1,
                minWidth: "250px",
                padding: "15px",
                borderRadius: "12px",
                border: "none",
                outline: "none",
                background: "rgba(255,255,255,0.1)",
                color: "white",
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading}
              style={{
                padding: "15px 25px",
                borderRadius: "12px",
                border: "none",
                background: loading
                  ? "#6b7280"
                  : "#10b981",
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
