const express = require('express');
const { applySecurity } = require('./middlewares/security');
const authRouter = require('./routes/auth');
const testsRouter = require('./routes/tests');
const bannersRouter = require('./routes/banners');
const usersRouter = require('./routes/users');
const paymentsRouter = require('./routes/payments');
const suggestionsRouter = require('./routes/suggestions');
const healthRouter = require('./routes/health');
const { notFound, errorHandler } = require('./middlewares/error');

const app = express();

// Security and core middlewares
applySecurity(app);

// Routes (mounting at root keeps paths identical)
app.use(authRouter);
app.use(testsRouter);
app.use(bannersRouter);
app.use(usersRouter);
app.use(paymentsRouter);
app.use(suggestionsRouter);
app.use(healthRouter);

// Fallbacks
app.use(notFound);
app.use(errorHandler);

module.exports = app;
