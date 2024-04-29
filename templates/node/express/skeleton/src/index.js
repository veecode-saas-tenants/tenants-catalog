const express = require('express');
const healthCheckRouter = require('./routes/healthCheck');
const app = express();
const port = process.env.PORT || ${{ values.port }};

app.use(healthCheckRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});