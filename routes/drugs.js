const express = require("express");
const router = express.Router();
const Drug = require("../models/Drug");

// GET 頁面：新增藥品表單
router.get("/new", (req, res) => {
  res.render("add-drug"); // 這會找 views/add-drug.ejs
});

// GET 所有藥品 (API)
router.get("/", async (req, res) => {
  try {
    const drugs = await Drug.find();
    res.json(drugs);
  } catch (error) {
    console.error("Error fetching drugs:", error);
    res.status(500).json({ message: "Error fetching drugs", error: error.message });
  }
});

// GET 指定藥品 (API)
router.get("/:code", async (req, res) => {
  try {
    const drug = await Drug.findOne({ code: req.params.code });
    if (!drug) return res.status(404).send("Drug not found");
    res.json(drug);
  } catch (error) {
    console.error(`Error fetching drug ${req.params.code}:`, error);
    res.status(500).json({ message: `Error fetching drug ${req.params.code}`, error: error.message });
  }
});

// POST 新增藥品 (處理表單提交)
router.post("/", async (req, res) => {
  try {
    // 將 deductFromStock 從字串轉換為布林值
    if (req.body.deductFromStock === "true") {
      req.body.deductFromStock = true;
    } else {
      req.body.deductFromStock = false;
    }
    const drug = new Drug(req.body);
    await drug.save();
    res.redirect("/"); // 成功後重定向到首頁 (顯示藥品清單的頁面)
  } catch (error) {
    console.error("Error saving drug:", error);
    // 理想情況下，這裡應該重新渲染表單並顯示錯誤訊息
    // 例如: res.render("add-drug", { error: error.message, formData: req.body });
    res.status(500).send("儲存藥品時發生錯誤: " + error.message + "<br><a href=\"/drugs/new\">返回新增頁面</a>");
  }
});

// PUT 更新藥品 (API)
router.put("/:code", async (req, res) => {
  try {
    const drug = await Drug.findOneAndUpdate({ code: req.params.code }, req.body, { new: true, runValidators: true });
    if (!drug) return res.status(404).send("Drug not found for update");
    res.json(drug);
  } catch (error) {
    console.error(`Error updating drug ${req.params.code}:`, error);
    res.status(500).json({ message: `Error updating drug ${req.params.code}`, error: error.message });
  }
});

// DELETE 刪除藥品 (API)
router.delete("/:code", async (req, res) => {
  try {
    const drug = await Drug.findOneAndDelete({ code: req.params.code });
    if (!drug) return res.status(404).send("Drug not found for deletion");
    res.json({ message: "Drug deleted successfully" });
  } catch (error) {
    console.error(`Error deleting drug ${req.params.code}:`, error);
    res.status(500).json({ message: `Error deleting drug ${req.params.code}`, error: error.message });
  }
});

module.exports = router;

