import express from 'express';
import dialogflow from '@google-cloud/dialogflow';
import { v4 as uuidv4 } from 'uuid';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const sessionId = uuidv4();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Add this line to parse JSON bodies

app.post('/send-msg', async (req, res) => {
    try {
        const responseMessage = await runSample(req.body.MSG);
        res.send({ Reply: responseMessage });
    } catch (error) {
        console.error('Error in /send-msg:', error);
        res.status(500).send('Internal Server Error');
    }
});

async function runSample(msg, projectId = 'sumitkshetribot-cnsl') {
    const sessionClient = new dialogflow.SessionsClient({
        keyFilename: "/home/yogesh-yg/Desktop/chatbot/backend/dialogFlow.json"
    });

    const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: msg,
                languageCode: 'en-US',
            },
        },
    };

    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;

    return result.fulfillmentText;
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`App is running on port ${port}`);
});
