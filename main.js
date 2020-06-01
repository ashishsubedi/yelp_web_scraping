const request = require('request-promise');
const cheerio = require('cheerio');
const { Parser } = require('json2csv');
const fs = require('fs');

const fields = ['id', 'name', 'phone number', 'street address', 'locality']
const opts = { fields };

const URL = "https://www.yellowpages.com/brooklyn-ny/property-management-companies?page=";


(async () => {
    try {
        data = [];
        for (let i = 19; i <= 82; i++) {
            const newUrl = URL.concat(i.toString())
            var options = {
                uri: newUrl,
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0'
                },
                json: true // Automatically parses the JSON string in the response
            };
            
            let response = await request(options);
            let $ = cheerio.load(response);
            let result = $('.srp-listing');
            result.each((index, el) => {
                data.push({
                    "id": (index+1)+((i-1)*result.length),
                    "name": $('.business-name', el).children().first().text()||'',
                    "phone number": $('.phones.phone.primary', el).text()||'',
                    "street address": $('.street-address', el).text()||'',
                    "locality": $('.locality', el).text()||''
                });
            });

            

        }
        const parser = new Parser(opts);
        const csv = parser.parse(data);
        console.log(csv);
        fs.writeFile('yellowpages.csv',csv,{encoding:'utf-8'},(err)=>{
            if(err) throw err;
            console.log("File was saved")
        });
    } catch (error) {
        console.log('My Error:', error)

    }


})();