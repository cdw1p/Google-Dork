const axios = require('axios')
const cheerio = require('cheerio')
const randomUseragent = require('random-useragent')

/**
 * Get Google Result
 */
const getGoogleResult = async (query, index) => {
  try {
    const getResult = await axios.get(`https://www.google.com/search?q=${query}&start=${index}`, {
      headers: { 'User-Agent': await randomUseragent.getRandom() }
    })
    const $ = await cheerio.load(getResult.data)
    $('#rso > div > div > div > a').each((index, value) => {
      const regexLink = ($(value).attr('href')).match(/url\?q=(.*?)&/gi)
      if (regexLink !== null && regexLink.length > 0) {
        console.log(regexLink[0].replace(/url\?q=|&/gi, ''))
      }
    })
  } catch (err) {
    console.log(`Error: ${err.message}`)
  }
}

/**
 * Main Function
 */
;(async () => {
  try {
    const querySearch = 'whoami' 
    await getGoogleResult(querySearch, 0)
  } catch (err) {
    console.log(`Error: ${err.message}`)
  }
})()