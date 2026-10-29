import { useState } from "react"

export default function Chat() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessages = [...messages, { role: "user", content: input }]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: newMessages
        })
      })

      const data = await res.json()
      console.log("Groq response:", data)
      const reply = data.choices?.[0]?.message?.content || "No reply from AI"

      setMessages([...newMessages, { role: "assistant", content: reply }])
    } catch (err) {
      setMessages([...newMessages, { role: "assistant", content: "Error: " + err.message }])
    }

    setLoading(false)
  }

  return (
    <div className="bg-black text-white h-screen flex flex-col">
      <div className="flex-1 overflow-auto p-4">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
            <p className="mb-2">{m.content}</p>
          </div>
        ))}
        {loading && <p>Thinking...</p>}
      </div>
      <div className="p-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask something..."
          className="flex-1 p-2 text-black rounded"
        />
        <button onClick={sendMessage} className="bg-white text-black px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  )
}
