const express = require('express');
const app = express();
const port = 80;

app.use(express.static(__dirname));

app.get('/', (req, res) => {
    res.send('index.html');
    res.send('modifiedScript.js');
    res.send('oldScript.js');
});

app.listen(port, () => {
    console.log(`App successfully running at http://localhost:${port}`);
});