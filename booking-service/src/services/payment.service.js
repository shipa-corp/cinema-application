const supertest = require("supertest");

module.exports = (paymentOrder) => {
  return new Promise((resolve, reject) => {
    supertest(process.env.PAYMENT_API_HOST)
      .post("/payment/makePurchase")
      .send({ paymentOrder })
      .end((err, res) => {
        if (err) {
          reject(
            new Error("An error occured with the payment service, err: " + err)
          );
        }
        console.log("SHIPA: Sucessfully called payment endpoint!");

        resolve(res.body.paid);
      });
  });
};
