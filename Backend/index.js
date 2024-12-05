const express = require('express');
const { sendEmail } = require('./EmailService');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:5173', // Allow requests only from your frontend origin
    methods: 'GET,POST,PUT,DELETE', // Allowed HTTP methods
    credentials: true // Allow cookies and credentials if needed
  }));

app.get('/', (req, res) => {
    res.send('Email server running');
});

app.post('/send-appointment-emails', async (req, res) => {
  const { userEmail, vetEmail, date, time, appointmentType } = req.body;

  try {
    // Email to the user
    await sendEmail(userEmail, 'Appointment Confirmation', `Your appointment is scheduled for ${date} at ${time} (${appointmentType}).`);
    
    // Email to the veterinary
    await sendEmail(vetEmail, 'New Appointment Request', `You have a new appointment scheduled for ${date} at ${time} (${appointmentType}).`);

    res.status(200).send({ message: 'Emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send({ message: 'Error sending emails' });
  }
});

app.listen(3001, () => {
  console.log('Email server running on http://localhost:3001');
});
