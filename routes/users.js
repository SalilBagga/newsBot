var express = require('express');
var router = express.Router();
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('f1802092cc24448e81d30ca45a37483f');
//Using this function to fetch news from News API node liberary using parameters from dialogbot
function fetchNews(param) {
  var result = [];
  newsapi.v2
    .topHeadlines({
      category: `${param}`,
      language: 'en',
      country: 'in',
    })
    .then((response) => {
      const res = response.articles.slice(0, 5);
      console.log(res.length);
      for (i = 0; i < res.length; i++) {
        result.push(response.articles[i].title);
      }
      console.log(result);
    });
  return result;
}
/* POST users . */
router.post('/', async function (req, res, next) {
  try {
    var dataToSend;
    /*Getting parameters from Dialogflow and Sending data from API*/
    // var parameter = req.body.queryResult.parameters['getnews'];
    console.log(parameter);
    /*Checking which data to send based on the parameter*/
    // if (!parameter) {
    //   console.log('no news');
    //   dataToSend = 'Sorry no data available on what you requested ';
    // } else {
    //   console.log('parameter news');
    //   dataToSend = fetchNews(parameter);
    // }
    dataToSend = 'sending data';
    console.log(`show(${dataToSend})`);

    return res.json({
      fulfillmentText: dataToSend,
      fulfillmentMessage: [{ text: { text: dataToSend } }],
      source: '',
    });
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
