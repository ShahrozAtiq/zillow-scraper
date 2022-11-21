# Zillow Scraper

This is a Node.js script that uses Puppeteer to search for a keyword on Zillow and scrape all the information of the results and store them in a CSV file.

## Requirements

- Node.js
- npm (Node.js package manager)
- Puppeteer package (`npm install puppeteer`)
- csv-write-stream package (`npm install csv-write-stream`)

## Usage

1. Install the necessary packages by running the following command:


2. Open the `index.js` file and replace "keyword" with the keyword you want to search on Zillow.

3. Run the following command to execute the code:


4. The code will scrape the title, address, price, details, type, and days on Zillow of all the search results and store them in a CSV file named "zillow_results.csv" in your working directory.

## License

This code is licensed under the MIT License.
