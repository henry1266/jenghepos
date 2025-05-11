require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Drug = require("./models/Drug");
const path = require("path");
const drugRoutes = require("./routes/drugs"); // 引入 drug 路由

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // 新增：處理 URL 編碼的表單數據
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // 指定 EJS 檔案夾

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch(err => console.error("MongoDB connection error:", err));

// 預設首頁顯示
app.get("/", async (req, res) => {
  const drugs = await Drug.find();
  res.render("index", { drugs }); // 這會找 views/index.ejs
});

// 使用 drug 路由
app.use("/drugs", drugRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

