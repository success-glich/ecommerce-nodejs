const express = require('express');

const app =express();
const authRouter = require('./routes/auth.routes');

app.use(express.json())
const PORT =process.env.PORT || 8000;


app.get('/health-check', (req, res) => {
        res.status(200).json({ status: 'OK' });
});

app.use('/auth',authRouter);



app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));