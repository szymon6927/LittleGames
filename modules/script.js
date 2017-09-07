class BitMarket {
  constructor() {
    console.log("bit market");
  }

  cronRun() {
    const schedule = require('node-schedule');
    let test = this.askAPI(function(info){
      console.log(info);
    });
    // var j = schedule.scheduleJob('0 */5 * * * *', () => {
    //   console.log('New render api function');
    // });
    console.log("test");
  }

  askAPI(callback) {
    const request = require('request');
    let info;
    request('https://www.bitmarket.pl/json/LTCPLN/ticker.json', function (error, response, body) {
      if (error) {
        console.log('error:', error); // Print the error if one occurred 
      }
      console.log('https://www.bitmarket.pl/json/LTCPLN/ticker.json -> statusCode:', response && response.statusCode); // Print the response status code if a response was received 
      if (body) {
        info = JSON.parse(body)
        callback(info);
      }
    });
  }
}

module.exports = BitMarket;