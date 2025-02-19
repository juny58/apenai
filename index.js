const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const saveToFile = require('./save-data-to-file');
const uploadFile = require('./upload-file');
const fineTuneModel = require('./start-fine-tuning');
const checkStatus = require('./check-model-status');
const chatWithModel = require('./chat-reponse');
const app = express();
const port = process.env.OPENAI_PORT || 8000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the OpenAI API Chatbot!');
})

app.post('/create-model', async (req, res) => {
    // Steps:
    // 1. Save training data to a file
    // 2. Upload the file to the OpenAI
    // 3. Start fine-tuning the model
    try {
        saveToFile();
        const fileId = await uploadFile('training.jsonl');
        const result = await fineTuneModel(fileId);
        res.status(200).json({ message: 'Training started.', data: result });
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Error occurred.', error: err });
    }
});

app.get('/check-status/:fineTuneId', async (req, res) => {
    const fineTuneObject = await checkStatus(req.params.fineTuneId);
    res.status(200).json({ message: 'Fine-tune status.', data: fineTuneObject });
});

app.post('/chat', async (req, res) => {
    try {
        const { model, messages } = req.body;
        const response = await chatWithModel(model, messages);
        const message = response.choices[0].message.content
        res.status(200).json({ message, data: response });
    } catch (err) {
        res.status(500).json({ message: 'Error occurred.', error: err });
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});