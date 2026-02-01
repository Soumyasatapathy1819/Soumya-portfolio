import React, { useState, useRef, useEffect } from "react";
import { contactsData } from "./contactsData";
import { projectsData } from "./projectsData";
import { userData } from "./userData";

// Render message text with clickable links and preserved newlines
function MessageContent({ text }) {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const lines = text.split("\n");
  return (
    <div className="msg-text">
      {lines.map((line, idx) => {
        const parts = line.split(urlRegex);
        return (
          <span key={idx}>
            {parts.map((part, i) => (
              urlRegex.test(part) 
                ? <a key={i} href={part} target="_blank" rel="noreferrer" className="wt-link">{part}</a>
                : <span key={i}>{part}</span>
            ))}
            {idx < lines.length - 1 && <br />}
          </span>
        );
      })}
    </div>
  );
}

export default function WeTalk() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hey! 👋 I'm WeTalk, Soumya's AI assistant. I'm specifically trained on Soumya's portfolio. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [botTyping, setBotTyping] = useState(false);
  const boxRef = useRef(null);

  useEffect(() => {
    if (open && boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight;
  }, [messages, open, botTyping]);

  // IMPROVISED: Knowledge Base for "Training"
  const knowledgeBase = [
    {
      intent: "identity",
      keywords: ["who are you", "what is wetalk", "name", "created by", "your boss"],
      reply: () => `I am WeTalk, a specialized AI designed to represent ${userData.name}. I can tell you about his expertise in ${userData.skills.slice(0,3).join(", ")} and his latest projects!`
    },
    {
      intent: "projects",
      keywords: ["project", "work", "portfolio", "build", "developed", "show me", "demo"],
      reply: () => {
        const list = projectsData.map(p => `• **${p.title}**: ${p.category}`).join("\n");
        return `Soumya has developed several projects including:\n${list}\n\nWhich one would you like more details on?`;
      }
    },
    {
      intent: "skills",
      keywords: ["skill", "tech", "coding", "language", "python", "react", "sql", "expert"],
      reply: () => `Soumya is highly proficient in:\n💻 ${userData.skills.join(", ")}\n\nHe specializes in bridging the gap between Data Analysis and Web Development.`
    },
    {
      intent: "contact",
      keywords: ["contact", "email", "reach", "hire", "linkedin", "github", "connect", "whatsapp"],
      reply: () => {
        const links = contactsData.map(c => `${c.id.toUpperCase()}: ${c.url}`).join("\n");
        return `You can connect with Soumya here:\n${links}\n\nHe's always open to new opportunities!`;
      }
    }
  ];

  const streamReply = (replyText) => {
    setBotTyping(true);
    setMessages((m) => [...m, { from: "bot", text: "" }]);
    let i = 0;
    const speed = 12;
    const t = setInterval(() => {
      i++;
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy.length - 1;
        copy[last] = { ...copy[last], text: replyText.slice(0, i) };
        return copy;
      });
      if (i >= replyText.length) {
        clearInterval(t);
        setBotTyping(false);
      }
    }, speed);
  };

  const send = (text) => {
    if (!text.trim() || botTyping) return;
    const userMsg = { from: "user", text };
    setMessages((m) => [...m, userMsg]);
    setInput("");

    const lower = text.toLowerCase();

    // TRAINING LOGIC: Find the best matching intent
    let bestMatch = null;
    let highestScore = 0;

    knowledgeBase.forEach(item => {
      let score = 0;
      item.keywords.forEach(key => {
        if (lower.includes(key)) score++;
      });
      if (score > highestScore) {
        highestScore = score;
        bestMatch = item;
      }
    });

    // Generate Response based on training
    setTimeout(() => {
      if (bestMatch && highestScore > 0) {
        streamReply(bestMatch.reply());
      } else if (/\b(hi|hello|hey)\b/.test(lower)) {
        streamReply("Hello Everyone! 😊 Ready to explore Soumya's work? Ask me about his projects or skills!");
      } else {
        streamReply("That's an interesting question!!! While I'm still learning, I'm best at answering questions about Soumya's professional background, coding skills, and projects. What would you like to see?");
      }
    }, 500); // Artificial delay to feel more like "AI"
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send(input);
    }
  };

  return (
    <div className={`wetalk ${open ? "open" : ""}`} aria-live="polite">
      <div className="wetalk-button" onClick={() => setOpen((s) => !s)}>
        <div className="wetalk-badge" aria-label="Open WeTalk" role="button">
          <span className="badge-icon">{open ? "✕" : "💬"}</span>
          <span className="badge-text">{open ? "Close" : "Chat"}</span>
        </div>
      </div>

      <div className="wetalk-panel" role="dialog" aria-hidden={!open}>
        <div className="wetalk-header">
          <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
            <div className="wetalk-logo-container"><span className="logo-icon">✨</span></div>
            <div>
              <h3 style={{margin: 0, fontSize: '1.05rem', fontWeight: '700'}}>WeTalk</h3>
              <p style={{margin: 0, fontSize: '0.75rem', opacity: 0.6}}>Soumya's Portfolio AI</p>
            </div>
          </div>
          <button className="close-btn" onClick={() => setOpen(false)}>✕</button>
        </div>

        <div className="wetalk-body" ref={boxRef}>
          {messages.map((m, i) => (
            <div key={i} className={`wt-msg ${m.from}`}>
              {m.from === 'bot' && <span className="msg-icon">🤖</span>}
              <div className="msg-wrapper">
                <MessageContent text={m.text} />
              </div>
            </div>
          ))}
          {botTyping && (
            <div className="wt-msg bot typing">
              <span className="msg-icon">🤖</span>
              <div className="typing-indicator"><span className="dot"/><span className="dot"/><span className="dot"/></div>
            </div>
          )}
        </div>

        <div className="wetalk-input">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about projects, skills..."
            rows={1}
          />
          <button className="send-btn" onClick={() => send(input)}>→</button>
        </div>
      </div>
    </div>
  );
}