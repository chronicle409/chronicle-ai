import { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

      const sendMessage = async () => {
          if(!input.trim()) return
              const newMsgs = [...messages, { role: 'user', content: input }]
                  setMessages(newMsgs)
                      setInput('')
                          try {
                                const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                                        method: 'POST',
                                                headers: {
                                                          'Content-Type': 'application/json',
                                                                    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
                                                                            },
                                                                                    body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: newMsgs })
                                                                                          })
                                                                                                const data = await res.json()
                                                                                                      const reply = data.choices?.[0]?.message?.content || 'No reply'
                                                                                                            setMessages([...newMsgs, { role: 'assistant', content: reply }])
                                                                                                                } catch(e) {
                                                                                                                      setMessages([...newMsgs, { role: 'assistant', content: 'Error: '+e.message }])
                                                                                                                          }
                                                                                                                            }

                                                                                                                              return (
                                                                                                                                  <div className="bg-black text-white min-h-screen flex flex-col">
                                                                                                                                        <div className="flex-1 p-4 overflow-y-auto">
                                                                                                                                                {messages.map((m,i) => <div key={i} className="mb-2 p-2 bg-gray-800 rounded">{m.content}</div>)}
                                                                                                                                                      </div>
                                                                                                                                                            <div className="p-4 flex gap-2">
                                                                                                                                                                    <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Ask Chronicle..." className="flex-1 p-3 rounded bg-gray-900 text-white" />
                                                                                                                                                                            <button onClick={sendMessage} className="bg-white text-black px-6 py-3 rounded-full font-bold">Send</button>
                                                                                                                                                                                  </div>
                                                                                                                                                                                      </div>
                                                                                                                                                                                        )
                                                                                                                                                                                        }
                                                                                                                                                                                        export default Appimport { useState } from 'react'

function App() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])

  const sendMessage = async () => {
    if(!input.trim()) return
    const newMsgs = [...messages, { role: 'user', content: input }]
    setMessages(newMsgs)
    setInput('')
    try {
      const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`
        },
        body: JSON.stringify({ model: 'llama-3.1-8b-instant', messages: newMsgs })
      })
      const data = await res.json()
      const reply = data.choices?.[0]?.message?.content || 'No reply'
      setMessages([...newMsgs, { role: 'assistant', content: reply }])
    } catch(e) {
      setMessages([...newMsgs, { role: 'assistant', content: 'Error: '+e.message }])
    }
  }

  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((m,i) => <div key={i} className="mb-2 p-2 bg-gray-800 rounded">{m.content}</div>)}
      </div>
      <div className="p-4 flex gap-2">
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&sendMessage()} placeholder="Ask Chronicle..." className="flex-1 p-3 rounded bg-gray-900 text-white" />
        <button onClick={sendMessage} className="bg-white text-black px-6 py-3 rounded-full font-bold">Send</button>
      </div>
    </div>
  )
}
export default App