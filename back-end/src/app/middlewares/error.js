// eslint-disable-next-line no-unused-vars
module.exports = (err, _req, res, _next) => {
  const { message, code } = err;

  if (code) {
    return res.status(code).json({ message });
  }

  return res.status(500).json({ message });
};