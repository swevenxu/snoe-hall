import React, { useState } from "react";
import "./Script.css";
import botAvatar from "../assets/bot-avatar.jpeg";

const formatCode = (code) => {
  let result = code;
  // Order matters - do strings last to avoid replacing inside other spans
  result = result.replace(
    /\bloadstring\b/g,
    '<span class="code-func">loadstring</span>',
  );
  result = result.replace(/\bgame\b/g, '<span class="code-global">game</span>');
  result = result.replace(
    /:HttpGet/g,
    ':<span class="code-method">HttpGet</span>',
  );
  result = result.replace(
    /\bscript_key\b/g,
    '<span class="code-var">script_key</span>',
  );
  result = result.replace(
    /"([^"]*)"/g,
    '<span class="code-string">"$1"</span>',
  );
  return result;
};

const Script = () => {
  const [messages, setMessages] = useState([
    {
      type: "bot",
      text: "Hey! What would you like me to call you?",
      options: [],
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [waitingForKey, setWaitingForKey] = useState(false);
  const [waitingForName, setWaitingForName] = useState(true);
  const [userName, setUserName] = useState("You");
  const [userKey, setUserKey] = useState("YOUR_KEY_HERE");

  const hasActiveOptions = () => {
    const lastBotMsg = [...messages]
      .reverse()
      .find((msg) => msg.type === "bot");
    return lastBotMsg && lastBotMsg.options && lastBotMsg.options.length > 0;
  };

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (hasActiveOptions()) {
      // Add user message
      setMessages((prev) => [...prev, { type: "user", text: inputValue }]);
      setInputValue("");

      // Bot responds asking to choose options
      setTimeout(() => {
        const lastBotMsg = [...messages]
          .reverse()
          .find((msg) => msg.type === "bot");
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Please choose between the options above.",
            options: lastBotMsg.options,
          },
        ]);
      }, 500);
    } else if (waitingForName) {
      // User entered their name
      const name = inputValue.trim();
      setMessages((prev) => [...prev, { type: "user", text: name }]);
      setInputValue("");
      setWaitingForName(false);
      setUserName(name);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: `Nice to meet you, ${name}! Why are you here?`,
            options: ["Get Keys"],
          },
        ]);
      }, 500);
    } else if (waitingForKey) {
      // User pasted their key
      const pastedKey = inputValue.trim();
      setMessages((prev) => [...prev, { type: "user", text: pastedKey }]);
      setInputValue("");
      setWaitingForKey(false);
      setUserKey(pastedKey);

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Your key has been added to the script on the left. Copy and use it!",
            options: [],
          },
        ]);
      }, 500);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Thanks! Hope you make more profit.",
            options: [],
          },
        ]);
      }, 1000);
    } else {
      // Handle free text input when no options
      setMessages((prev) => [...prev, { type: "user", text: inputValue }]);
      setInputValue("");
    }
  };

  const handleOptionClick = (option) => {
    // Remove options from the last bot message
    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 && msg.type === "bot"
          ? { ...msg, options: [] }
          : msg,
      ),
    );

    // Add user's choice as a message
    setMessages((prev) => [...prev, { type: "user", text: option }]);

    // Handle different paths
    if (option === "Get Keys") {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Please finish the checkpoints in this link to get your key:",
            link: "https://ads.luarmor.net/get_key?for=Snoe_WorkInk-cjViWiJhgKSF",
            options: [],
          },
        ]);
      }, 500);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Come back here when you get the key and paste it to me!",
            options: [],
          },
        ]);
        setWaitingForKey(true);
      }, 1000);
    } else if (option === "Script Loader") {
      setTimeout(() => {
        const script = `script_key="Get Key";\nloadstring(game:HttpGet("https://api.luarmor.net/files/v4/loaders/898c2943fbdf9ed7365ca51d27a961a6.lua"))()`;
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: "Here is the script loader! Copy and use it:",
            code: script,
            options: [],
          },
        ]);
      }, 500);
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            type: "bot",
            text: 'Restart the page and select "Get Keys" to get your key.',
            options: [],
          },
        ]);
      }, 1000);
    }
  };

  return (
    <section className="script-page">
      <div className="left-section">
        <div className="status-badge">
          <span className="status-dot"></span>
          <span className="status-text">Undetected</span>
        </div>
        <div className="code-editor">
          <div className="editor-header">
            <div className="editor-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="editor-title">snoe.lua</span>
            <button
              className="editor-copy-btn"
              onClick={() => {
                const code = `script_key="${userKey}";\nloadstring(game:HttpGet("https://api.luarmor.net/files/v4/loaders/898c2943fbdf9ed7365ca51d27a961a6.lua"))()`;
                navigator.clipboard.writeText(code);
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            </button>
          </div>
          <div className="editor-body">
            <div className="line-numbers">
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <div className="editor-code">
              <div className="code-line">
                script_key = <span className="string">{`"${userKey}"`}</span>
              </div>
              <div className="code-line"></div>
              <div className="code-line">
                <span className="function">loadstring</span>(
                <span className="global">game</span>:
                <span className="method">HttpGet</span>(
                <span className="string">
                  "https://api.luarmor.net/files/v4/loaders/898c2943fbdf9ed7365ca51d27a961a6.lua"
                </span>
                ))()
              </div>
            </div>
          </div>
        </div>

        <div className="supported-games">
          <span className="supported-title">Supported Games</span>
          <ul className="games-list">
            <li>The Forge [BETA]</li>
            <li>Nights in the Forest</li>
            <li>Deadly Delivery</li>
          </ul>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-header">
          <span className="chat-title">Snoe Assistant</span>
        </div>

        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.type === "bot" && (
                <img src={botAvatar} alt="Bot" className="avatar bot-avatar" />
              )}
              <div
                className="message-content"
                data-username={msg.type === "user" ? userName : "Snoe Bot"}
              >
                <div className="message-bubble">
                  {msg.text}
                  {msg.link && (
                    <a
                      href={msg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="chat-link"
                    >
                      {msg.link}
                    </a>
                  )}
                  {msg.code && (
                    <div className="code-block">
                      <pre
                        dangerouslySetInnerHTML={{
                          __html: formatCode(msg.code),
                        }}
                      />
                      <button
                        className="copy-btn"
                        onClick={() => navigator.clipboard.writeText(msg.code)}
                      >
                        Copy
                      </button>
                    </div>
                  )}
                </div>
                {msg.type === "bot" &&
                  msg.options &&
                  msg.options.length > 0 && (
                    <div className="quick-replies">
                      {msg.options.map((option, optIndex) => (
                        <button
                          key={optIndex}
                          className="quick-reply-btn"
                          onClick={() => handleOptionClick(option)}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
              </div>
              {msg.type === "user" && (
                <div className="avatar user-avatar">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        <form className="chat-input" onSubmit={handleTextSubmit}>
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button type="submit" className="send-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </form>
      </div>
    </section>
  );
};

export default Script;
