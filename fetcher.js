const args = process.argv.splice(2);
const fs = require("fs");
const request = require("request");
const domain = args[0];
const localPath = args[1];
let fileSize;

request(domain, (error, response, body) => {
  fs.writeFile(localPath, body, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    // console.log(response.statusCode);
    // if (response.statusCode === 400) {
    //   console.log("Returned status code 400 URL is invalid.");
    //   process.exit();
    // }
    fs.stat(localPath, (error, stats) => {
      if (error) {
        console.log(error);
      }

      fileSize = stats.size;
      console.log(`Downloaded and saved  ${fileSize} bytes to ${localPath}`);
    });
  });
});
