const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res) => {
  res.send('This app is strictly an API. Please use the API routes. See <a href="https://github.com/mjamesd/store-back-end" target="_blank">the repo</a>\'s README for more information.')
});

module.exports = router;