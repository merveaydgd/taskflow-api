const express = require("express");

const app = express();

const logger = require("./middleware/logger");
const taskRoutes = require("./routes/taskRoutes");

// Middleware
app.use(express.json());
app.use(logger);

// Ana sayfa
app.get("/", (req, res) => {
    res.send("TaskFlow API çalışıyor!");
});

// Task route bağlantısı
app.use("/tasks", taskRoutes);

// Sunucuyu başlat
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server http://localhost:${PORT} adresinde çalışıyor.`);
    console.log("TASK ROUTES YÜKLENDİ");
});