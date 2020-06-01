const puppeteer = require('puppeteer');
const { Parser } = require('json2csv');
const fs = require('fs');

const fields = ['id', 'name', 'phone number', 'street address', 'locality']
const opts = { fields };

const URL = "https://www.yelp.com/search?find_desc=Property%20Management&find_loc=Brooklyn%2C%20NY&ns=1&l=p%3ANY%3ANew_York%3ABrooklyn%3A%5BBath_Beach%2CBay_Ridge%2CBedford_Stuyvesant%2CBensonhurst%2CBergen_Beach%2CBoerum_Hill%2CBorough_Park%2CBrighton_Beach%2CBrooklyn_Heights%2CBrownsville%2CBushwick%2CCanarsie%2CCarroll_Gardens%2CCity_Line%2CClinton_Hill%2CCobble_Hill%2CColumbia_Street_Waterfront_District%2CConey_Island%2CCrown_Heights%2CCypress_Hills%2CDUMBO%2CDitmas_Park%2CDowntown_Brooklyn%2CDyker_Heights%2CEast_Flatbush%2CEast_New_York%2CEast_Williamsburg%2CFlatbush%2CFlatlands%2CFort_Greene%2CFort_Hamilton%2CGeorgetown%2CGerritson_Beach%2CGowanus%2CGravesend%2CGreenpoint%2CHighland_Park%2CKensington%2CManhattan_Beach%2CMarine_Park%2CMidwood%2CMill_Basin%2CMill_Island%2CNew_Lots%2COcean_Hill%2COcean_Parkway%2CPaedergat_Basin%2CPark_Slope%2CProspect_Heights%2CProspect_Lefferts_Gardens%2CProspect_Park%2CRed_Hook%2CRemsen_Village%2CSea_Gate%2CSheepshead_Bay%2CSouth_Slope%2CSouth_Williamsburg%2CSpring_Creek%2CStarret_City%2CSunset_Park%2CVinegar_Hill%2CWeeksville%2CWilliamsburg_-North_Side%2CWilliamsburg-_South_Side%2CWindsor_Terrace%2CWingate%5D&start=";


(async () => {
    //78*80
    try {
        for (let i = 0; i < 1; i++) {

            const browser = await puppeteer.launch({ headless: true });
            const page = await browser.newPage();
            await page.goto(URL+i.toString());
            await page.waitForSelector('.lemon--div__373c0__1mboc');
            let names = await page.$$('.lemon--div__373c0__1mboc.mainAttributes__373c0__1r0QA')
            for(let el of names){
                const name = await el.$$('.lemon--a__373c0__IEZFH');
                for(const n of name){
                    if(n.)
                }
                console.log(name.filter(n=>n.getAttribute('name' != '')).map(n=>n.textContent))
            }
            
            // console.log(main_attr[0])
  

                 // await browser.close();
        }

    } catch (error) {
        console.log("our error",error)
    }

})();