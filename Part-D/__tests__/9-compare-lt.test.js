const fs = require("fs");
const path = require("path");
const utilities = require("../../utilities/test-helpers");

const movies = [
  {
    title: "Strange Wilderness",
    runtime: "87",
  },
  {
    title: "Zoom",
    runtime: "93",
  },
  {
    title: "Passion Play",
    runtime: "94",
  },
  {
    title: "The Darkness",
    runtime: "101",
  },
  {
    title: "Bless the Child",
    runtime: "107",
  },
  {
    title: "Kickin' It Old Skool",
    runtime: "108",
  },
  {
    title: "Nina",
    runtime: "109",
  },
  {
    title: "Getaway",
    runtime: "123",
  },
];

describe("9 Compare Less Than", () => {
  const jsonPath = path.join(__dirname, "..", "9-compare-lt.json");
  const queryPath = path.join(__dirname, "..", "9-compare-lt.sql");

  test("Query SQL file has been updated", () => {
    const query = fs.readFileSync(queryPath, { encoding: "utf8" });
    expect(query).not.toBe(
      `-- Task: Select title and runtime for all movies that have a Rotten Tomatoes rating less than 4. Order the results by runtime in ascending order. --`
    );
  });

  test("Query returned all the rows", () => {
    const results = require(jsonPath);
    expect(results.length).toBe(8);
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
    expect(results[0].hasOwnProperty("year")).toBe(false);
    expect(results[0].hasOwnProperty("age")).toBe(false);
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
    expect(results[0].hasOwnProperty("runtime")).toBe(true);
  });

  test("Correct movies", () => {
    let results = require(jsonPath);
    const normalised = utilities.normaliseArray(results);
    results = normalised;
    expect(results).toEqual(movies);
  });
});
