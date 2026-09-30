const Mailjet = require('node-mailjet');

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

const sendEmail = async (eventTitle) => {
  try {
    const response = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: "lucasrecoba3@gmail.com",
            Name: "Lucas 1",
          },
          To: [
            {
              Email: "lucasrecoba3@gmail.com",
              Name: "Lucas 2",
            },
          ],
          Subject: "Nuevo Evento Creadao - " + eventTitle,
          TextPart: "Tienes un nuevo evento en tu lista de eventos",
          HTMLPart: "Tienes un nuevo evento en tu lista de eventos",
        },
      ],
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = sendEmail;