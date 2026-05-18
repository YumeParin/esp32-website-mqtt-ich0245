
import express from 'express';
import mqtt from 'mqtt';
import cors from 'cors';
const app = express();
const port = 80;
app.use(cors())
// Connect to Mosquitto. Since we're in Docker, 'mosquitto' resolves to the container automatically.
const client = mqtt.connect('mqtt://mosquitto:1883');

client.on('connect', () => {
    console.log('Low cortisol mode: Connected to the MQTT broker.');
});

app.use(express.static('public'));
app.use(express.json());

// This endpoint receives the signal from the web page and pushes it to the broker
app.post('/api/toggle', (req, res) => {
    const { state } = req.body;
    
    // Convert ON/OFF to 1/0, or keep it as a string depending on your IoT device's needs
    const payload = state === 'ON' ? '1' : '0';

    client.publish('home/device/switch', payload, () => {
        console.log(`Signal published to topic: ${payload}`);
        res.json({ success: true, message: `Sent ${state} to broker` });
    });
});

app.get('/start/toggle', (req, res) => {
    res.json({ success: true, message: `Sent start to esp32` });
    // const { state } = req.body;
    
    // // Convert ON/OFF to 1/0, or keep it as a string depending on your IoT device's needs
    // const payload = state === 'ON' ? '1' : '0';

    // client.publish('home/device/switch', payload, () => {
    //     console.log(`Signal published to topic: ${payload}`);
    //     res.json({ success: true, message: `Sent ${state} to broker` });
    // });
});
app.get('/stop/toggle', (req, res) => {
    res.json({ success: true, message: `Sent stop to esp32` });
    // const { state } = req.body;
    
    // // Convert ON/OFF to 1/0, or keep it as a string depending on your IoT device's needs
    // const payload = state === 'ON' ? '1' : '0';

    // client.publish('home/device/switch', payload, () => {
    //     console.log(`Signal published to topic: ${payload}`);
    //     res.json({ success: true, message: `Sent ${state} to broker` });
    // });
});

app.listen(port, () => {
    console.log(`Web interface chilling at http://localhost:${port}`);
});