require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const { createServer } = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"]
  }
});

function connectDB() {
  const dbURL = process.env.MONGO_URL;

  mongoose.connect(dbURL);

  mongoose.connection.on("error", console.error.bind(console, "connection error:"));

  mongoose.connection.once("open", () => {
    console.log("Atlas MongoDB conectado com sucesso");
  });
}

connectDB();

const Message = mongoose.model("Message", { id_sessao: String, usuario: String, data_hora: String, message: String });

io.on("connection", async socket => {
  console.log("Usuário conectado:", socket.id);

  const messages = await Message.find({});

  socket.emit("previousMessage", messages);

  socket.on("sendMessage", async data => {
    try {
      const message = new Message(data);

      await message.save();

      io.emit("receivedMessage", data);
    } catch (error) {
      console.log(error);
    }
  });
});

httpServer.listen(3001, () => {
  console.log("Socket Online");
});
