const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const Payment = require('./models/Payment');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Database sync
sequelize.sync()
    .then(() => console.log('Database synchronized'))
    .catch(err => console.error('Error syncing database:', err));

// Routes
app.post('/api/payments', async (req, res) => {
    try {
        const payment = await Payment.create(req.body);
        res.status(201).json(payment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

app.get('/api/payments', async (req, res) => {
    try {
        const payments = await Payment.findAll({
            order: [['paymentDate', 'DESC']]
        });
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
