import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return
    
    const userMsg = { role: 'user', content: input }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: newMessages
        })
      })

      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || "No reply from AI"
      
      setMessages([...newMessages, { role: 'assistant', content: reply }])
    } catch (err) {
      setMessages([...newMessages, { role: 'assistant', content: "Error: " + err.message }])
    }
    setLoading(false)
  }

  return (
    <div className="bg-black text-white h-screen flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <h1 className="text-xl font-bold">Chronicle AI</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={m.role === 'user' ? "text-right" : "text-left"}>
            <div className={m.role === 'user' ? "inline-block bg-blue-600 p-2 rounded" : "inline-block bg-zinc-800 p-2 rounded"}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <div className="text-zinc-400">Thinking...</div>}
      </div>

      <div className="p-4 flex gap-2 border-t border-zinc-800">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Chronicle"
          className="flex-1 bg-transparent outline-none border border-zinc-700 rounded p-2"
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage} className="bg-blue-600 px-4 py-2 rounded">
          Send
        </button>
      </div>
    </div>
  )
}

export default App