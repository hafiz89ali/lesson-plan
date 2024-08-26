function getHealth(req, res) {
  const data = {
    message: "OK",
  };
  res.status(200).json(data);
}

function postHealth(req, res) {
  const body = req.body;
  const data = {
    message: "OK",
    data: body,
  };
  res.status(200).json(data);
}

const healtController = {
  getHealth,
  postHealth,
};

export default healtController;
