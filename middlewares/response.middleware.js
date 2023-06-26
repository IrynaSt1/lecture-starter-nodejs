const responseMiddleware = (req, res, next) => {
  // TODO: Implement middleware that returns result of the query
  if (res.err) {
    const { message } = res.err;
    console.log("message", message);
    return res.json({
      error: true,
      message,
    });
  }
  return res.json(res.data);
};

export { responseMiddleware };
