const supertest = require("supertest");

module.exports = (payload) => {
  return new Promise((resolve, reject) => {
    supertest(process.env.NOTIFICATION_API_HOST)
      .post("/notification/sendEmail")
      .send({ payload })
      .end((err, res) => {
        if (err) {
          reject(
            new Error("An error occured with the payment service, err: " + err)
          );
        }
        console.log("SHIPA: Sucessfully called notifications!");
        resolve(res.body);
      });
  });
};
