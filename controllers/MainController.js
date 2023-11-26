const fs = require("fs");

const mainController = (req, res) => {
  const mymessage = "this is the first message from controller function";
  const body = [];
  req.on("data", (chunk) => {
    console.log(chunk);
    body.push(chunk);
  });
  return req.on("end", () => {
    const parsedBody = Buffer.concat(body).toString();
    const message = parsedBody.split("=")[1];
    fs.writeFile("message.txt", message, (Err) => {
      res.statusCode = 302;
      res.setHeader("Location", "/");
      return res.end();
    });
  });
};

exports.mainController = mainController;
