"use client"

import { FormEvent, useEffect, useRef, useState } from "react"
import Message from "../Message"
import { BotMessage, Message as MessageType } from "@/types/Translate"
import { sendMessage } from "@/package/api/translate/sendMessage"

type ChatProps = {
  id: number
  dialog: MessageType[]
}

const Chat = ({ id, dialog }: ChatProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const [prompt, setPrompt] = useState("")
  const [messages, setMessages] = useState<MessageType[]>(dialog)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!prompt.trim()) return

    const userMessage = prompt
    setPrompt("")
    setLoading(true)

    // Показываем сообщение пользователя сразу
    setMessages((prev) => [...prev, { text: userMessage, role: "user" }])

    try {
      // Ждём ответа с сервера
      const response: BotMessage = await sendMessage(userMessage, id)

      // Создаём объект типа Message из ответа сервера
      const botMessage: MessageType = { text: response.response, role: "assistant" }

      // Добавляем ответ бота в стейт
      setMessages((prev) => [...prev, botMessage])
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="flex-1 w-full flex flex-col  overflow-auto no-scrollbar gap-[24px] relative items-center ">
        <section className="flex flex-col gap-[48px] xl:w-[55%] py-[5svh]">
          {messages.map((msg, index) => (
            <Message key={index} role={msg.role} text={msg.text} />
          ))}
          <div className="w-full h-[px]" ref={messagesEndRef} />
        </section>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center mb-[80px] xl:mb-[2svh] w-full xl:w-[65%] bg-LightGray rounded-full px-[24px] py-[12px] shadow-md"
      >
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
          placeholder="Ваш текст..."
          className="flex-1 bg-transparent outline-none text-PrimaryBlack placeholder:text-Gray02 text-[16px]"
        />
        <button
          type="submit"
          disabled={loading}
          className="ml-3 p-3 rounded-full bg-PrimaryBlack active:bg-PrimaryBlack/80 transition-all flex items-center justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="#fff"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
          </svg>
        </button>
      </form>
    </>
  )
}

export default Chat
