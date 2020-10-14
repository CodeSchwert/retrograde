const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { parse } = require('node-html-parser');

const planets = [
  { name: 'Mercury', url: '/mercury-retrograde' },
  { name: 'Venus', url: '/venus-retrograde' },
  { name: 'Mars', url: '/mars-retrograde' },
  { name: 'Jupiter', url: '/jupiter-retrograde' },
  { name: 'Saturn', url: '/saturn-retrograde' },
  { name: 'Uranus', url: '/uranus-retrograde' },
  { name: 'Neptune', url: '/neptune-retrograde' },
  { name: 'Pluto', url: '/pluto-retrograde' }
];

const monthInt = (monthString) => {
  let month;
  switch (monthString) {
    case 'January':
      month = 0;
      break;
    case 'February':
      month = 1
      break;
    case 'March':
      month = 2
      break;
    case 'April':
      month = 3
      break;
    case 'May':
      month = 4
      break;
    case 'June':
      month = 5
      break;
    case 'July':
      month = 6
      break;
    case 'August':
      month = 7
      break;
    case 'September':
      month = 8
      break;
    case 'October':
      month = 9
      break;
    case 'November':
      month = 10
      break;
    case 'December':
      month = 11
      break;
    default:
      month = 0
      break;
  }

  return month;
};

const planetScrap = async (planet) => {
  try {
    const site = 'https://www.astrology.com/retrograde';

    console.log(`Scraping ${planet.name}`);
    const response = await fetch(`${site}${planet.url}`);
    if (response.ok) {
      const results = await response.text();

      const retroDates = [];
      const root = parse(results);
      const dates = root.querySelectorAll('.planet-info h3');

      // loop through the list of `h3`'s even if there is 1 element
      for (const el of dates) {
        const dateText = el.innerText;

        let startYear = 2020;
        let endYear = 2020;

        // Typo in the Saturn date text, missing space between dash
        const [startDate, endDate] = planet.name == 'Saturn' 
          ? dateText.split('- ') 
          : dateText.split(' - ');
        const [startDateMonth, startDateDayStr] = startDate.split(' ');
        const [endDateMonth, endDateDayStr] = endDate.split(' ');

        const startDateDay = parseInt(startDateDayStr);
        const endDateDay = parseInt(endDateDayStr);

        let startDateTime = new Date(startYear, monthInt(startDateMonth), startDateDay).getTime();
        let endDateTime = new Date(endYear, monthInt(endDateMonth), endDateDay).getTime();

        // if endDateTime is less than startDateTime 
        // presumably the end date is in the next year
        if (endDateTime < startDateTime) {
          endYear = endYear += 1;
          endDateTime = new Date(endYear, monthInt(endDateMonth), endDateDay).getTime();
        }

        retroDates.push({
          period: dateText,
          startDateTime,
          endDateTime,
          startYear,
          startDate,
          startDateMonth,
          startDateDay,
          endYear,
          endDate,
          endDateMonth,
          endDateDay
        });
      }

      return retroDates;
    }
  } catch (e) {
    console.error(e);
  }
};

const scrap = async (planetsArr) => {
  try {
    const retros = {};

    for (const planet of planetsArr) {
      const retroDates = await planetScrap(planet);
      // console.log('retroDates', retroDates);

      retros[planet.name.toLowerCase()] = retroDates;
    }

    console.log(retros)

    const dataFolder = path.join(__dirname, 'retro.json');
    fs.writeFileSync(dataFolder, JSON.stringify(retros, null, 2));
  } catch (e) {
    console.error(e);
  }
};

// do the scraping
scrap(planets);
