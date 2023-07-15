const fs = require("fs");
const path = require("path");
const utilities = require("../../utilities/test-helpers");

const QTMovies = [
  { title: "Django Unchained", age: "18", year: "2012" },
  { title: "Inglourious Basterds", age: "18", year: "2009" },
  { title: "Kill Bill: Vol. 1", age: "18", year: "2003" },
  { title: "Sin City", age: "18", year: "2005" },
  { title: "Kill Bill: Vol. 2", age: "18", year: "2004" },
  { title: "The Hateful Eight", age: "18", year: "2015" },
];

describe("7 Where And", () => {
  const jsonPath = path.join(__dirname, "..", "7-where-and.json");
  const queryPath = path.join(__dirname, "..", "7-where-and.sql");

  test("Query SQL file has been updated", () => {
    const query = fs.readFileSync(queryPath, { encoding: "utf8" });
    expect(query).not.toBe(
      `-- Task: Select title, age and year columns for all movies directed by 'Quentin Tarantino' and are rated for ages 18 only. Order the results by IMDB rating in descending order. --`
    );
  });

  test("Query returned all the rows", () => {
    const results = require(jsonPath);
    expect(results.length).toBe(6);
  });

  test("Query returned all columns", () => {
    const results = require(jsonPath);

    expect(results).not.toStrictEqual([]);
    // only check the columns on the first element
    // otherwise this test takes way too long!
    const normalised = utilities.normaliseObject(results[0]);
    results[0] = normalised;
    expect(results[0].hasOwnProperty("id")).toBe(false);
    expect(results[0].hasOwnProperty("title")).toBe(true);
    expect(results[0].hasOwnProperty("year")).toBe(true);
    expect(results[0].hasOwnProperty("age")).toBe(true);
    expect(results[0].hasOwnProperty("imdb_rating")).toBe(false);
    expect(results[0].hasOwnProperty("rotten_tomatoes_rating")).toBe(false);
    expect(results[0].hasOwnProperty("on_netflix")).toBe(false);
    expect(results[0].hasOwnProperty("on_hulu")).toBe(false);
    expect(results[0].hasOwnProperty("on_prime_video")).toBe(false);
    expect(results[0].hasOwnProperty("on_disney_plus")).toBe(false);
    expect(results[0].hasOwnProperty("directors")).toBe(false);
    expect(results[0].hasOwnProperty("genres")).toBe(false);
    expect(results[0].hasOwnProperty("country")).toBe(false);
    expect(results[0].hasOwnProperty("language")).toBe(false);
    expect(results[0].hasOwnProperty("runtime")).toBe(false);
  });

  test("Correct movie age rating", () => {
    const results = require(jsonPath);
    expect(results).not.toStrictEqual([]);
    results.map((row) => {
      const normalised = utilities.normaliseObject(row);
      row = normalised;
      expect(row.age).toBe("18");
    });
  });

  test("Correct movies", () => {
    let results = require(jsonPath);
    const normalised = utilities.normaliseArray(results);
    results = normalised;
    expect(results).toEqual(QTMovies);
  });
});
