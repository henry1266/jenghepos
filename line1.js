const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 7000;

// 配置 LINE Bot 的存取權杖
const accessToken = 'exoanGGQhg1U2w5LDl4RJwHYAKezrU1MY9BUTTFuVVyu9srVXbJoV6HiF3t3Nm9q72myd6cHjsoSMqx3vf8D/M/J5PopwJFsgMJy3qYvoyG/icHwWVIUsZkbyWhUUyW0/CK4hVnqXR/Vjsa3IP8COAdB04t89/1O/w1cDnyilFU=';

// 配置 MongoDB
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

// 初始化 MongoDB 連線
let patientsCollection;

client.connect().then(() => {
  const db = client.db("pharmacy");
  patientsCollection = db.collection("patients");
  console.log("已成功連接到 MongoDB");
}).catch((err) => {
  console.error("連接到 MongoDB 時出錯：", err);
});

// 設置 EJS 作為模板引擎
app.set("view engine", "ejs");

// 解析 POST 表單
app.use(express.urlencoded({ extended: true }));

// 主頁面路由
app.get("/", (req, res) => {
  res.render("index"); // 渲染 index.ejs
});



// 發送訊息路由
app.post('/send_message', async (req, res) => {
	const { plineField, message } = req.body;
  if (!plineField || !message) {
    res.send('<p>聊天室ID或訊息內容不得為空！</p><a href="/">回到首頁</a>');
    return;
  }

const bubbleMessage = {
  type: 'flex',
  altText: '竹文健檢通知',
  contents: {
    type: 'bubble',
"body": {
    "type": "box",
    "layout": "vertical",
    "contents": [
      {
        "type": "text",
        "text": "健檢報告通知",
        "weight": "bold",
        "size": "xl",
        "align": "center"
      },
      {
        "type": "text",
        "text": "通知XXX先生/女士，︁您的健檢報告已經送到，歡迎使用網路系統查詢數據或至現場查看報告，︁謝謝。",
        "size": "sm",
        "wrap": true,
        "margin": "sm"
      },
      {
        "type": "box",
        "layout": "baseline",
        "contents": [
          {
            "type": "icon",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
            "offsetStart": "20%"
          },
           {
            "type": "text",
            "text": "網路系統操作步驟",
            "align": "center",
            "margin": "md",
            "size": "md"
          }
        ],
        "margin": "lg"
      },
            {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "text": "步驟一",
                "color": "#aaaaaa",
                "size": "sm",
                "wrap": true,
                "align": "center"
              },
              {
                "type": "text",
                "text": "點擊取得金鑰獲得一組金鑰",
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ],
            "margin": "sm"
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "color": "#aaaaaa",
                "size": "sm",
                "text": "步驟二",
                "wrap": true
              },
              {
                "type": "text",
                "text": "點擊查詢報告並輸入金鑰",
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ],
            "margin": "sm"
          },
          {
            "type": "box",
            "layout": "baseline",
            "spacing": "sm",
            "contents": [
              {
                "type": "text",
                "color": "#aaaaaa",
                "size": "sm",
                "text": "步驟三",
                "wrap": true
              },
              {
                "type": "text",
                "text": "點擊臨時連結查看報告",
                "wrap": true,
                "color": "#666666",
                "size": "sm",
                "flex": 5
              }
            ],
            "margin": "sm"
          }
        ],
        "offsetStart": "10%"
      },
      {
        "type": "separator",
        "margin": "md"
      },
      {
        "type": "box",
        "layout": "baseline",
        "contents": [
          {
            "type": "icon",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
            "offsetStart": "33%"
          },
          {
            "type": "text",
            "text": "操作須知",
            "align": "center",
            "margin": "md",
            "size": "md"
          }
        ],
        "margin": "lg"
      },
      {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": "為求資訊安全,臨時連結僅保留一小時",
            "wrap": true,
            "size": "sm",
            "align": "center",
            "margin": "md"
          },
          {
            "type": "text",
            "text": "逾期可用金鑰生重新生成",
            "size": "sm",
            "wrap": true,
            "align": "center"
          },
          {
            "type": "separator",
            "margin": "md",
            "color": "#85746575"
          },
          {
            "type": "text",
            "text": "此報告為系統自動產生,僅供參考",
            "size": "sm",
            "wrap": true,
            "align": "center",
            "margin": "md"
          },
          {
            "type": "text",
            "text": "請以實際紙本數據為準",
            "size": "sm",
            "align": "center"
          },
          {
            "type": "text",
            "text": "若須紙本報告或醫師問診",
            "size": "sm",
            "wrap": true,
            "align": "center"
          },
          {
            "type": "text",
            "text": "請至現場櫃檯詢問",
            "size": "sm",
            "align": "center"
          }
        ]
      }
    ]
  },
    footer: {
      type: 'box',
      layout: 'vertical',
      spacing: 'sm',
      contents: [
        {
          type: 'button',
          style: 'primary',
          height: 'md',
          action: {
            type: 'postback',
            label: '取得金鑰',
            data: 'hello',
            displayText: 'd6a3d2ef43f4',
          },
          color: '#85746569',
        },
         {
        "type": "button",
        "style": "primary",
        "height": "md",
        "action": {
          "type": "uri",
          "label": "查詢報告",
          "uri": "https://zhuwen.com.tw/testhtml.php"
        },
        "color": "#85746575"
      }
      ],
      flex: 0,
      backgroundColor: '#85746569',
    },
  },
};


    // 設定推送訊息的數據
    const data = {
        to: plineField,
        messages: [bubbleMessage],
    };

  try {
    const response = await axios.post('https://api.line.me/v2/bot/message/push', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.send('<p>推送訊息成功！</p><a href="/">回到首頁</a>');
  } catch (error) {
    console.error('推送訊息失敗:', error.response?.data || error.message);
    res.send('<p>推送訊息失敗</p><a href="/">回到首頁</a>');
  }
});

// API 取得所有患者的姓名 (pname) 和對應的 pline
app.get("/patients", async (req, res) => {
  try {
    const patients = await patientsCollection
      .find({ pline: { $exists: true, $type: "string", $regex: /^.{6,}$/ },}, { projection: { pname: 1, pline: 1, _id: 0 } })
      .toArray();
    res.json(patients);
  } catch (error) {
    res.status(500).send("Error retrieving patients data");
  }
});

// 列出患者資料路由
app.get('/list_patients', async (req, res) => {
  if (!patientsCollection) {
    res.send('<p>資料庫尚未連接成功</p><a href="/">回到首頁</a>');
    return;
  }

  try {
    const patients = await patientsCollection.find({
      pline: { $exists: true, $type: "string", $regex: /^.{6,}$/ },
    }).toArray();

    if (patients.length > 0) {
      res.send(`
        <h2>符合條件的患者資料</h2>
        <ul>
          ${patients.map(patient => `
            <li>
              <strong>PID:</strong> ${patient.pid || 'N/A'},
              <strong>PName:</strong> ${patient.pname || 'N/A'},
              <strong>PDate:</strong> ${patient.pdate || 'N/A'},
              <strong>PPhone:</strong> ${patient.pphone || 'N/A'},
              <strong>PVIP:</strong> ${patient.pvip || 'N/A'},
              <strong>PLine:</strong> ${patient.pline || 'N/A'}
            </li>
          `).join('')}
        </ul>
        <a href="/">回到首頁</a>
      `);
    } else {
      res.send('<p>沒有符合條件的患者資料</p><a href="/">回到首頁</a>');
    }
  } catch (err) {
    console.error("查詢資料時發生錯誤：", err);
    res.send('<p>查詢資料時發生錯誤</p><a href="/">回到首頁</a>');
  }
});

// 發送領藥通知
app.post('/send_premessage', async (req, res) => {
	const { plineField, panme, startdate, enddate, precount, pretotal  } = req.body;
  if (!plineField || !panme) {
    res.send('<p>聊天室ID或訊息內容不得為空！</p><a href="/">回到首頁</a>');
    return;
  }

const bubbleMessage = {
  type: 'flex',
  altText: '竹文領藥通知',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '處方領藥通知',
          weight: 'bold',
          size: 'xl',
          align: 'center',
        },
        {
          type: 'text',
          text: '通知' + panme + '先生/女士，︁您的慢性處方箋藥已經準備好。',
          wrap: true,
        },
        {
          type: 'text',
          text: '可持健保卡至興安藥局領藥，︁謝謝。',
        },
        {
			type: 'box',
			layout: 'baseline',
			"contents": [
          {
            "type": "icon",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
            "offsetStart": "25%"
          },
          {
            "type": "text",
            "text": "建議領藥區間",
            "align": "center",
            "margin": "md",
            "size": "md"
          }
        ],
          margin: 'lg',
        },
        {
          type: 'text',
          text: startdate + '-' + enddate,
          wrap: true,
          color: '#666666',
          size: 'md',
          flex: 5,
          align: 'center',
          margin: 'md',
        },
		{
        "type": "box",
        "layout": "baseline",
        "contents": [
          {
            "type": "icon",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
            "offsetStart": "33%"
          },
          {
            "type": "text",
            "text": "處方資訊",
            "align": "center",
            "margin": "md",
            "size": "md"
          }
        ],
        "margin": "lg"
      },
      {
        "type": "text",
        "text": "第" + precount + "次 / 共" + pretotal + "次",
        "wrap": true,
        "color": "#666666",
        "size": "md",
        "flex": 5,
        "align": "center",
        "margin": "md"
      },
      ],
    },
  },
};
   
   
   

    // 設定推送訊息的數據
    const data = {
        to: plineField,
        messages: [bubbleMessage],
    };

  try {
    const response = await axios.post('https://api.line.me/v2/bot/message/push', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.send('<p>推送訊息成功！</p><a href="/">回到首頁</a>');
  } catch (error) {
    console.error('推送訊息失敗:', error.response?.data || error.message);
    res.send('<p>推送訊息失敗</p><a href="/">回到首頁</a>');
  }
});


// 發送回診通知
app.post('/send_endmessage', async (req, res) => {
	const { plineField1, panme1, enddate1} = req.body;
  if (!plineField1 || !panme1) {
    res.send('<p>聊天室ID或訊息內容不得為空！</p><a href="/">回到首頁</a>');
    return;
  }

const bubbleMessage = {
  type: 'flex',
  altText: '竹文回診通知',
  contents: {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      contents: [
        {
          type: 'text',
          text: '慢箋結束通知',
          weight: 'bold',
          size: 'xl',
          align: 'center',
        },
        {
          type: 'text',
          text: '通知' + panme1 + '先生/女士，︁您的慢性處方箋即將結束。',
          wrap: true,
        },
        {
          type: 'text',
          text: '建議可在回診前一個禮拜抽血追蹤健康狀況，︁感謝您。',
		  wrap: true,
        },
		{
			"type": "box",
			"layout": "baseline",
			"contents": [
			{
            "type": "icon",
            "url": "https://scdn.line-apps.com/n/channel_devcenter/img/fx/review_gold_star_28.png",
            "offsetStart": "33%"
			},
			{
				"type": "text",
				"text": "回診日",
				"align": "center",
				"margin": "md",
				"size": "md"
			}
			],
			"margin": "lg"
		},
		{
			"type": "text",
			"text": enddate1,
			"wrap": true,
			"color": "#666666",
			"size": "md",
			"flex": 5,
			"align": "center",
			"margin": "md"
		},
      ],
    },
  },
};
   

    // 設定推送訊息的數據
    const data = {
        to: plineField1,
        messages: [bubbleMessage],
    };

  try {
    const response = await axios.post('https://api.line.me/v2/bot/message/push', data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    res.send('<p>推送訊息成功！</p><a href="/">回到首頁</a>');
  } catch (error) {
    console.error('推送訊息失敗:', error.response?.data || error.message);
    res.send('<p>推送訊息失敗</p><a href="/">回到首頁</a>');
  }
});


// 啟動伺服器
app.listen(port, () => {
  console.log(`伺服器正在運行於 http://localhost:${port}`);
});