'use client';
import { IoChatboxEllipsesOutline as IconChat } from "react-icons/io5";
import { MdOutlineTipsAndUpdates as IconTip } from "react-icons/md";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { SiMongodb as IconMongo } from "react-icons/si";
import { FaUserAlt as IconUser } from "react-icons/fa";
import { IoSend as IconSend } from "react-icons/io5";
import Message from "@/components/message";
import { socket } from "@/services/socket";

export default function Home() {

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [form, setForm] = useState<BankStructure>({

    id_sessao: '',
    data_hora: '',
    usuario: '',
    message: ''

  });

  const [messages, setMessages] = useState<BankStructure[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

    setForm(prev => ({

      ...prev,

      [e.target.name]: e.target.value

    }));

  };

  const sendMessage = () => {

    if (!form.message.trim() || !form.usuario.trim()) return;

    const data = new Date().toLocaleString("pt-BR", {

      timeZone: "America/Sao_Paulo"

    });

    const formUpt = { ...form, data_hora: data, id_sessao: String(socket.id) };

    setForm(prev => ({ ...prev, message: "" }));

    socket.emit('sendMessage', formUpt);

  };

  useEffect(() => {

    socket.on("connect", () => {
      console.log("socket conectado");
    });

    socket.on("previousMessage", data => {

      setMessages(data);

    });

    socket.on("receivedMessage", message => {

      setMessages(prev => [...prev, message]);

    });

    return () => {

      socket.off("connect");
      socket.off("previousMessage");
      socket.off("receivedMessage");

    };

  }, []);

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });

  }, [messages]);

  return (

    <div className="h-screen w-full flex justify-center items-center">

      <div className="m-auto h-150 w-250 rounded-2xl bg-linear-to-b from-[#01291f] to-[#064e3b] flex flex-col 
           justify-center items-center ">

        <header className="w-full flex items-center justify-between p-4">

          <div className="flex gap-2 items-center">

            <div className="p-2 rounded-full bg-green-500/10">

              <IconMongo className="text-green-500 text-4xl" />

            </div>
            <div className="flex flex-col gap-1 text-white rounded-2xl">

              <p className="font-bold text-2xl">Chat do <span className="text-green-500">MongoDB</span></p>
              <p className="text-sm">Converse e interaje com os demais usuários</p>

            </div>

          </div>
          <div className="px-4 py-2 bg-green-500/10 rounded-2xl flex items-center gap-2">

            <div className="bg-green-500 animate-pulse w-3 h-3 rounded-full"></div>
            <p className="text-white font-semibold">Online</p>

          </div>

        </header>
        <main className="h-full w-full p-2 flex gap-2">

          <div className="bg-gray-100 h-full w-150 rounded-2xl flex pt-20 justify-center p-4">

            <div className="flex flex-col items-center gap-4 w-full">

              <div className="p-8 bg-white rounded-full shadow-2xl text-[#064e3b] text-5xl">

                <IconUser />

              </div>
              <div className="flex gap-2 flex-col w-full">

                <p className="font-semibold text-[#064e3b]">Usuário</p>
                <input
                  name="usuario"
                  onChange={handleChange}
                  value={form.usuario}
                  placeholder="Digite seu nome..."
                  className="bg-white p-2 rounded-[10px] border-2 border-gray-200"
                />

              </div>
              <div className="bg-white p-2 rounded-[10px] border-2 border-gray-200 
                   w-full h-30 flex gap-2 flex-col">

                <div className="flex gap-2">

                  <IconTip className="text-xl text-[#064e3b]" />
                  <p className="text-sm text-[#064e3b] uppercase font-bold">Info</p>

                </div>
                <p className="text-sm text-gray-500">O nome de usuario escolhido será exibido para todos no chat.</p>

              </div>

            </div>

          </div>
          <div className="bg-gray-100 h-125 w-full rounded-2xl flex flex-col">

            <div className="border-b border-gray-300 p-4 flex items-center gap-2 text-gray-500">

              <IconChat className="text-xl" />
              <p className="font-semibold text-md">Conversas</p>

            </div>
            {messages.length > 0 ? (

              <div className="h-full flex flex-col gap-2 overflow-auto">

                {messages?.map((msg, index) => (

                  <Message
                    key={index}
                    User={msg}
                    MessageUser={msg.id_sessao == socket.id}
                  />

                ))}

                <div ref={bottomRef} />

              </div>

            ) : (

              <div className="h-full flex flex-col justify-center items-center gap-2 text-[#01291f] opacity-70">

                <div className="p-4 bg-gray-400/30 text-5xl rounded-full">

                  <IconChat />

                </div>
                <p className="uppercase font-semibold text-sm">Seja o primeiro a contar as novidades!</p>

              </div>

            )}
            <div className="flex gap-2 p-4">

              <input
                name="message"
                onChange={handleChange}
                value={form.message}
                onKeyDown={e => { 

                  if (e.key === "Enter" && !e.shiftKey) {

                    e.preventDefault();

                    sendMessage();

                  }

                }}
                placeholder="Digite sua mensagem..."
                className="bg-white p-2 rounded-[10px] border-2 border-gray-200 w-full"
              />
              <div
                onClick={sendMessage}
                className="flex items-center gap-2 px-4 py-2 text-white bg-green-600 rounded-[10px]
                hover:scale-105 cursor-pointer transition-all duration-300"
              >

                <p className="font-semibold">Enviar</p>
                <IconSend />

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>

  );

}

