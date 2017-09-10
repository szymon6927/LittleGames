class BitMarket {
  constructor() {
    console.log("bit market");
  }

  cronRun() {
    const schedule = require('node-schedule');
    var j = schedule.scheduleJob('0 */5 * * * *', () => {
      let time = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      console.log("CRON: ", time);
      this.askAPI()
        .then(info => this.checkAPI(info));
    });
  }

  checkAPI(data) {
    let high = data.high;
    if(high > 270) {
      console.log('wieksze niz 270');
      this.sendMail();
    }
  }

  sendMail() {
    const nodemailer = require('nodemailer');
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'miks.szymon@gmail.com',
        pass: 'Szymon12@'
      },
      tls: {
        rejectUnauthorized: false
      }
    });
    
    let mailOptions = {
      from: 'test-bitmarket@gmail.com',
      to: 'miks.szymon@gmail.com',
      subject: 'Sending Email using Node.js',
      text: 'That was easy!'
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });
  }

  askAPI() {
    const request = require('request');
    return new Promise((resolve, reject) => {
      request('https://www.bitmarket.pl/json/LTCPLN/ticker.json', function (error, response, body) {
        if (error) {
          console.log('error:', error); // Print the error if one occurred 
        }
        console.log('https://www.bitmarket.pl/json/LTCPLN/ticker.json -> statusCode:', response && response.statusCode); // Print the response status code if a response was received 
        if (body) {
          let info = JSON.parse(body)
          resolve(info);
        }
      });
    });
  }
}

module.exports = BitMarket;