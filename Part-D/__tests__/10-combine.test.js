const fs = require("fs");
const path = require("path");
const utilities = require("../../utilities/test-helpers");

const movies = [
  {
    title: "My Next Guest with David Letterman and Shah Rukh Khan",
    imdb_rating: "9.3",
    runtime: "61",
  },
  { title: "Natsamrat", imdb_rating: "9.1", runtime: "166" },
  {
    title: "The Good, the Bad and the Ugly",
    imdb_rating: "8.8",
    runtime: "161",
  },
  { title: "Inception", imdb_rating: "8.8", runtime: "148" },
  { title: "The Matrix", imdb_rating: "8.7", runtime: "136" },
  {
    title: "One Heart: The A.R. Rahman Concert Film",
    imdb_rating: "8.7",
    runtime: "87",
  },
  { title: "Bill Hicks: Relentless", imdb_rating: "8.7", runtime: "61" },
  { title: "Untamed Romania", imdb_rating: "8.7", runtime: "92" },
  { title: "Eh Janam Tumhare Lekhe", imdb_rating: "8.7", runtime: "135" },
  { title: "Gol Maal", imdb_rating: "8.6", runtime: "120" },
  { title: "True: Happy Hearts Day", imdb_rating: "8.6", runtime: "NULL" },
  { title: "Luciano Mellera: Infantiloide", imdb_rating: "8.6", runtime: "66" },
  { title: "K. D.", imdb_rating: "8.6", runtime: "NULL" },
  { title: "Merku Thodarchi Malai", imdb_rating: "8.6", runtime: "122" },
  { title: "Bill Hicks: Revelations", imdb_rating: "8.6", runtime: "57" },
  {
    title: "Hikaru Utada Laughter in the Dark Tour 2018",
    imdb_rating: "8.6",
    runtime: "141",
  },
  {
    title: "Dave Chappelle: Sticks & Stones",
    imdb_rating: "8.5",
    runtime: "65",
  },
  { title: "The Pianist", imdb_rating: "8.5", runtime: "150" },
  { title: "Avengers: Infinity War", imdb_rating: "8.5", runtime: "149" },
  { title: "Springsteen On Broadway", imdb_rating: "8.5", runtime: "153" },
];

describe("10 Combine", () => {
  const jsonPath = path.join(__dirname, "..", "10-combine.json");
  const queryPath = path.join(__dirname, "..", "10-combine.sql");

  test("Query SQL file has been updated", () => {
    const query = fs.readFileSync(queryPath, { encoding: "utf8" });
    expect(query).not.toBe(
      `-- Task: Get movie title, IMDB rating and runtime for movies on Netflix that have a IMDB rating equal to or greater than 8. Order the results by IMDB rating in descending order and only return the top 20 rows. --`
    );
  });

  test("Query returned all the rows", () => {
    const results = require(jsonPath);
    expect(results.length).toBe(20);
  });

  test("Query returned all columns", () => {
    const results = require(jsonPath);
    expect(results).not.toStrictEqual([]);
    // only check the columns on the first element
    // otherwise this test takes way too long!
    expect(results[0].hasOwnProperty("id")).toBe(false);
    expect(results[0].hasOwnProperty("title")).toBe(true);
    expect(results[0].hasOwnProperty("year")).toBe(false);
    expect(results[0].hasOwnProperty("age")).toBe(false);
    expect(results[0].hasOwnProperty("imdb_rating")).toBe(true);
    expect(results[0].hasOwnProperty("rotten_tomatoes_rating")).toBe(false);
    expect(results[0].hasOwnProperty("on_netflix")).toBe(false);
    expect(results[0].hasOwnProperty("on_hulu")).toBe(false);
    expect(results[0].hasOwnProperty("on_prime_video")).toBe(false);
    expect(results[0].hasOwnProperty("on_disney_plus")).toBe(false);
    expect(results[0].hasOwnProperty("directors")).toBe(false);
    expect(results[0].hasOwnProperty("genres")).toBe(false);
    expect(results[0].hasOwnProperty("country")).toBe(false);
    expect(results[0].hasOwnProperty("language")).toBe(false);
    expect(results[0].hasOwnProperty("runtime")).toBe(true);
  });

  test("Correct IMDB rating order", () => {
    const results = require(jsonPath);
    expect(results).not.toStrictEqual([]);
    let ratingCounter = 10;

    results.map((row) => {
      let ratingValue = parseFloat(row.imdb_rating);
      expect(row.imdb_rating).not.toStrictEqual([]);
      expect(ratingValue).toBeLessThanOrEqual(ratingCounter);
      ratingCounter = ratingValue;
    });
  });

  test("Correct movies", () => {
    let results = require(jsonPath);
    const normalised = utilities.normaliseArray(results);
    results = normalised;
    expect(results).toEqual(movies);
  });
});
