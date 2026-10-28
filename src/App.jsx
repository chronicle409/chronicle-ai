import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<string[]>([])

  const sendMessage = () => {
    if(!input) return
    setMessages([...messages, input])
    setInput('')
  }

  return (
    <div className="bg-black text-white h-screen flex flex-col">
      {/* TOP BAR */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <button className="text-2xl">☰</button>
          <button className="bg-zinc-800 px-4 py-1.5 rounded-full text-sm flex items-center gap-1">
            <span className="text-blue-400">✦</span> Get Plus
          </button>
        </div>
        <button className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center">◯</button>
      </div>

      {/* CENTER EMPTY + QUICK ACTIONS */}
      <div className="flex-1 flex flex-col justify-end px-6 pb-8 gap-6">
        {messages.length === 0 ? (
          <>
            <button className="flex items-center gap-4 text-zinc-300 text-left">
              <span className="text-xl">🖼️</span> Create an image
            </button>
            <button className="flex items-center gap-4 text-zinc-300 text-left">
              <span className="text-xl">✏️</span> Write or edit
            </button>
            <button className="flex items-center gap-4 text-zinc-300 text-left">
              <span className="text-xl">🌐</span> Search the web
            </button>
          </>
        ) : (
          messages.map((m,i) => <div key={i} className="bg-zinc-900 p-3 rounded-xl">{m}</div>)
        )}
      </div>

      {/* BOTTOM INPUT - Exactly like your picture */}
      <div className="p-4">
        <div className="bg-zinc-900 rounded-full flex items-center px-4 py-3 gap-3">
          <button className="text-2xl text-zinc-400">+</button>
          <input 
            value={input}
            onChange={e=>setInput(e.target.value)}
            placeholder="Ask Chronicle"
            className="flex-1 bg-transparent outline-none text-white"
            onKeyDown={e=> e.key==='Enter' && sendMessage()}
          />
          <button className="text-zinc-400">🎤</button>
          <button onClick={sendMessage} className="bg-blue-600 w-9 h-9 rounded-full flex items-center justify-center">◉</button>
        </div>
      </div>
    </div>
  )
}
export default App