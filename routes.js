const fs = require("fs");

const requestHandler = (req, res) => {
  // console.log(req.headers, req.method, req.url);

  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Send message</title></head>");
    res.write("<body>");
    res.write(
      "<form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button>'"
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }
  if (url === "/message" && method === "POST") {
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
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>First page</title></head>");
  res.write("<body>");
  res.write("<h1>hi there from node js server</h1>");
  res.write("<h3>This is server is made by Ehsan Yasar");
  res.write("</body>");
  res.write("</html>");
  res.end();
};

// module.exports= requestHandler;

// these are three (3) ways that we can export multiple function or classes from same file

// module.exports = {
//   handler: requestHandler,
//   text: "some hard codded text",
// };

// module.exports.handler = requestHandler;
// module.exports.text = "some hard codded text";

// we can omit the module keyword
exports.handler = requestHandler;
exports.text = "some hard codded text";
