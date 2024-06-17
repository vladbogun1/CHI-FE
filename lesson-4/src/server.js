const express = require('express');
const path = require('path');
const { exec } = require('child_process');

const app = express();
const PORT = 8004;

app.use(express.static(__dirname + '/public'));
app.use(express.static(path.normalize(__dirname.replace(path.join('lesson-4', 'src'), ''))));


app.get('/run-script', (req, res) => {
    exec('npm run test', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error}`);
            return res.send(`Error executing script: ${error.message}`);
        }
        if (stderr) {
            console.error(`Script stderr: ${stderr}`);
        }
        res.send(`<pre>${stdout}</pre>`);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
