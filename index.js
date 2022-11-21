// import the necessary libraries
const puppeteer = require('puppeteer');
const fs = require('fs');
const csvWriter = require('csv-write-stream');

// create a CSV writer to write the scraped data to a file
const writer = csvWriter();
writer.pipe(fs.createWriteStream('zillow_results.csv'));

// function to scrape the necessary information of a single search result
async function scrapeResult(result) {
  const title = await result.$eval('a.list-card-link', el => el.textContent.trim());
  const address = await result.$eval('address.list-card-addr', el => el.textContent.trim());
  const price = await result.$eval('div.list-card-price', el => el.textContent.trim());
  const details = await result.$eval('ul.list-card-details', el => el.textContent.trim());
  const type = await result.$eval('div.list-card-type', el => el.textContent.trim());
  const daysOnZillow = await result.$eval('div.list-card-top > div.list-card-top > div.list-card-top > div > div', el => el.textContent.trim());

  return {
    title,
    address,
    price,
    details,
    type,
    daysOnZillow,
  };
}

// function to search for a keyword on Zillow and scrape all the information of the results
async function searchAndScrape(keyword) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // navigate to the Zillow website and search for the keyword
  await page.goto('https://www.zillow.com/');
  await page.waitForSelector('input#search-box-input');
  await page.type('input#search-box-input', keyword);
  await page.click('button#search-icon');
  await page.waitForNavigation();

  // wait for the search results to load completely
  await page.waitForSelector('ul.photo-cards > li > article');

  // loop through all the search results and scrape the necessary information
  const results = await page.$$('ul.photo-cards > li > article');
  for (const result of results) {
    const data = await scrapeResult(result);
    writer.write(data);
  }

  // close the browser and CSV writer
  await browser.close();
  writer.end();
}

// call the searchAndScrape function with your desired keyword
searchAndScrape('keyword');
