const checkURL = (err, req, res, next) => {
    console.log(err.stack);
    res.status(404).json({ error: 'Invalid endpoint. Not found.' });
  };

module.exports = {checkURL}