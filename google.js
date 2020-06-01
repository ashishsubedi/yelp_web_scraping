
const request = require('request-promise');
const cheerio = require('cheerio');
const { Parser } = require('json2csv');
const fs = require('fs');

const fields = ['id', 'name', 'phone number', 'street address', 'locality']
const opts = { fields };

const URL = 'https://www.google.com/search?sa=X&rlz=1C1CHBF_enUS858US858&biw=1600&bih=1040&q=property+management+brooklyn&npsic=0&rflfq=1&rlha=0&rllag=40684912,-73986461,1566&tbm=lcl&ved=2ahUKEwjP89O6iIbnAhUnnOAKHWTUC3YQjGp6BAgLEFY&tbs=lrf:!1m5!1u8!2m3!8m2!1u402!3e1!1m4!1u17!2m2!17m1!1e2!1m4!1u3!2m2!3m1!1e1!1m4!1u2!2m2!2m1!1e1!2m4!1e17!4m2!17m1!1e2!2m1!1e2!2m1!1e3!3sIAE,lf:1,lf_ui:2&rldoc=1#rldoc=1&rlfi=hd:;si:;mv:[[40.75336221129449,-73.76524574765625],[40.52018641743225,-74.17036659726563]];start:';//0,20,40...


(async () => {
    try {
        data = [];
        for (let i = 0; i < 11*20; i += 20) {
            


            const newUrl = URL.concat(i.toString())
            var options = {
                uri: newUrl,

                headers: {
                    'Connection': 'keep-alive',
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:72.0) Gecko/20100101 Firefox/72.0'
                },
                // proxy: "173.162.43.195:80"
                json: true // Automatically parses the JSON string in the response
            };


            let response = await request(options);
            let $ = cheerio.load(response);
            let names = $('[role="heading"]');
            let info = $(".rllt__details.lqhpac");
            for (let index = 0; index < names.length; index++) {
                // console.log(info.eq(1).children().eq(1).text())
                const street = info.eq(index).children().eq(1).text() || '';
                // const locality = info.eq(index).children().eq(1).text().split(',')[0] || '';
                const phone = info.eq(index).children().eq(2).children().last().text() || '';

                data.push({
                    "id": (index + 1) + (i * names.length),
                    "name": names.eq(index).children().first().text() || '',
                    "phone number": phone,
                    "street address": street,
                    // "locality":locality
                })
            }
        }

        console.log("Extraction Complete, saving")
        const parser = new Parser(opts);
        const csv = parser.parse(data);
        fs.writeFile('google.csv', csv, { encoding: 'utf-8' }, (err) => {
            if (err) throw err;
            console.log("File was saved")
        });
    } catch (error) {
        console.log('My Error:', error)

    }


})();