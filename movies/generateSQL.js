/**
 * Note about using the `MoviesOnStreamingPlatforms_updated.csv` file
 * 
 * The header row is missing the first header title, it's simply blank,
 * so the row starts with a `,` which oviously breaks papaparse because
 * it rightfully expects the header row to start with an actual value!
 * (shame on you Kaggle!!!)
 * 
 * So, before running the script to generate SQL from the CSV data,
 * update the CSV file so the first header value is `index`.
 * 
 * Also, the dataset is originally from Kaggle (🙄):
 * https://www.kaggle.com/ruchi798/movies-on-netflix-prime-video-hulu-and-disney
 */

const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

const transformHeader = (header, index) => {
  let newHeader;

  switch (header) {
    case 'Rotten Tomatoes':
    case 'IMDb':
      newHeader = `${header.replace(' ', '_').toLowerCase()}_rating`;
      break;
    case 'Netflix':
    case 'Hulu':
    case 'Prime Video':
    case 'Disney+':
      const txHeader = header
        .replace(' ', '_')
        .replace('+', '_plus')
        .toLowerCase();
      newHeader = `on_${txHeader}`
      break;
    default:
      newHeader = header.toLowerCase();
      break;
  }

  return newHeader;
};

// escape single quotes!!
const escapeQuote = (s) => {
  return s.replace(/'/g, `''`);
};

// return float or null
const intNull = (i) => {
  return parseInt(i) || null;
};

// return int or null
const floatNull = (f) => {
  return parseFloat(f) || null;
};

const bool = (val /** string */) => {
  return Boolean(parseInt(val));
};

const csvPath = path.join(__dirname, 'MoviesOnStreamingPlatforms_updated.csv');

if (!fs.existsSync(csvPath)) {
  throw new Error(`CSV file not found - ${csvPath}`);
}

const csv = fs.readFileSync(csvPath, { encoding: 'utf8' });
const parseResults = Papa.parse(csv, { header: true, transformHeader });

if (parseResults.errors.length > 0) {
  throw new Error(`Parse errors ${JSON.stringify(parseResults.errors)}`);
}

console.log(parseResults.meta);

// filter out `index` and `type`
const fields = parseResults.meta.fields
  .filter(f => !['index', 'type'].includes(f))
  .join(', ');

console.log(fields);

let insertRows = ``;

for (let [index, row] of parseResults.data.entries()) {
  // use the correct value/row delimiter
  const valueDelmiter = index + 1 === parseResults.data.length
    ? ';'
    : ',';

  // {
  //   -- index: '1485',
  //   id: '1486',
  //   title: 'Vincent N Roxxy',
  //   year: '2016',
  //   age: '18+',
  //   imdb_rating: '5.5',
  //   rotten_tomatoes_rating: '41%',
  //   on_netflix: '1',
  //   on_hulu: '0',
  //   on_prime_video: '0',
  //   on_disney_plus: '0',
  //   -- type: '0',
  //   directors: 'Gary Michael Schultz',
  //   genres: 'Crime,Drama,Thriller',
  //   country: 'U^CMehra',
  //   genres: 'Action,Comedy,Drama',
  //   country: 'India',
  //   language: 'Hindi',
  //   runtime: '171'
  // }
  const { 
    id, title, year, age, imdb_rating, rotten_tomatoes_rating, 
    on_netflix, on_hulu, on_prime_video, on_disney_plus,
    directors, genres, country, language, runtime
  } = row;

  const value = `(${parseInt(id)}, '${escapeQuote(title)}', ${parseInt(year)}, ${intNull(age)}, ${floatNull(imdb_rating)}, ${floatNull(rotten_tomatoes_rating)}, ${bool(on_netflix)}, ${bool(on_hulu)}, ${bool(on_prime_video)}, ${bool(on_disney_plus)}, '${escapeQuote(directors)}', '${genres}', '${escapeQuote(country)}', '${language}', ${intNull(runtime)})${valueDelmiter}\n`;
  // console.log(value);
  insertRows += value;
}

let insertStatment = `INSERT INTO movies (${fields})
VALUES
${insertRows}
`;

console.log(insertStatment);

const sqlFilePath = path.join(__dirname, 'movies.sql');

fs.writeFileSync(sqlFilePath, insertStatment, { encoding: 'utf8' });