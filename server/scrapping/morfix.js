const request = require('request');
const cheerio = require('cheerio');
const encodeUrl = require('encodeurl');

// const getHtml = async(word) => {
//     console.log('getHtml ', word);
//     const url = encodeUrl(`http://www.morfix.co.il/${word}`);
//     console.log(url);
//     let resultHebrew = [];
//     let resultEnglish = [];
//     let promise = new Promise((resolve, reject) => {
//         request(url, (error, response, html) => {
//             if (!error & response.statusCode == 200) {
//                 const $ = cheerio.load(html);

//                 $('.translate_box').each((i, el) => {
//                     resultHebrew.push($(el).find('.word').text());
//                     resultEnglish.push($(el).find('.default_trans').text());
//                 });
//                 let result = {
//                     resultHebrew,
//                     resultEnglish
//                 }
//                 resolve(JSON.stringify(result));
//             }
//         });
//     });
//     result = await promise;
//     return result;
// };

const getHtml = async word => {
  console.log('getHtml ', word);
  const url = encodeUrl(
    `https://context.reverso.net/translation/hebrew-french/${word}`
  );
  console.log(url);
  let resultHebrew = [];
  //   let resultEnglish = [];
  let promise = new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      if (!error & (response.statusCode == 200)) {
        const $ = cheerio.load(html);

        $('#translations-content .translation').each((i, el) => {
          let translation = $(el)
            // .find('.translation')
            .text();
          translation = translation.trim();
          console.log('translation:', translation);
          if (translation) {
            resultHebrew.push(translation);
          }
          //   resultEnglish.push(
          //     $(el)
          //       .find('.default_trans')
          //       .text()
          //   );
        });
        // let result = {
        //   resultHebrew,
        //   resultEnglish
        // };
        resolve({ data: resultHebrew });
      }
    });
  });
  result = await promise;
  return result;
};

module.exports = getHtml;
