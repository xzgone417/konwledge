// server1/server.js
const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// 提供静态文件
app.use(express.static(path.join(__dirname)));

// 显式设置路由以提供index.html
app.get('/', (req, res) => {
    res.sendFile('index.html', { root: __dirname });
});

app.listen(port, () => {
    console.log(`Server 1 is running at http://localhost:${port}`);
});
