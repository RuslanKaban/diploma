import React, { useState } from "react";
import { FaRegComment } from "react-icons/fa";
import styles from "./Support.module.css";

const Support = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;

    setMessages([...messages, { text: input }]);
    setInput("");
  };

  return (
    <div className={styles.support}>
      {open && (
        <div className={styles.chat}>
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={styles.message}>
                {msg.text}
              </div>
            ))}
          </div>

          <div className={styles.inputArea}>
            <input
              type="text"
              placeholder="Введите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}

      <button
        className={styles.button}
        onClick={() => setOpen(!open)}
      >
        <FaRegComment size={32} />
      </button>
    </div>
  );
};

export default Support;