const request = require('request');
const cheerio = require('cheerio');
const encodeUrl = require('encodeurl')

const getHtml = async(word) => {
    console.log('getHtml ', word);
    const url = encodeUrl(`http://www.morfix.co.il/${word}`);
    console.log(url);
    let resultHebrew = [];
    let resultEnglish = [];
    let promise = new Promise((resolve, reject) => {
        request(url, (error, response, html) => {
            if (!error & response.statusCode == 200) {
                const $ = cheerio.load(html);

                $('.translate_box').each((i, el) => {
                    resultHebrew.push($(el).find('.word').text());
                    resultEnglish.push($(el).find('.default_trans').text());
                });
                let result = {
                    resultHebrew,
                    resultEnglish
                }
                resolve(JSON.stringify(result));
            }
        });
    });
    result = await promise;
    return result;
};

module.exports = getHtml;