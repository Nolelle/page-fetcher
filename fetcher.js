const args = process.argv.splice(2);
const fs = require("fs");
const request = require("request");
const domain = args[0];
const localPath = args[1];
let fileSize;

request(domain, (error, response, body) => {
  if (error) {
    console.log("Returned status code 400 URL is invalid.");
    process.exit();
  }
  fs.writeFile(localPath, body, (err) => {
    if (err) {
      console.log(err);
      return;
    }

    fs.stat(localPath, (error, stats) => {
      if (error) {
        console.log("Invalid file path. Please enter a valid one.");
        process.exit();
      }

      fileSize = stats.size;
      console.log(`Downloaded and saved  ${fileSize} bytes to ${localPath}`);
    });
  });
});
