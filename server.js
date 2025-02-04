    const express = require('express');
    const SerialPort = require('serialport');
    const app = express();
    const port = 3000;

    // Replace with your Arduino's serial port
    const serialPort = new SerialPort('/dev/ttyACM0', { baudRate: 115200 });

    app.use(express.json());

    app.post('/control', (req, res) => {
      const { x, y, z } = req.body;
      // Translate slider values to GRBL commands (example)
      const gcode = `G1 X${x} Y${y} Z${z}\n`;
      serialPort.write(gcode, (err) => {
        if (err) {
          console.error('Error writing to serial port:', err);
          res.status(500).send('Error sending command');
        } else {
          res.send('Command sent');
        }
      });
    });

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });

    serialPort.on('open', () => {
      console.log('Serial port opened');
    });

    serialPort.on('error', (err) => {
      console.error('Serial port error:', err);
    });
