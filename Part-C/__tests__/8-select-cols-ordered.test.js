const fs = require("fs");
const path = require("path");
const utilities = require("../../utilities/test-helpers");

describe("8 Select Cols Ordered", () => {
  const jsonPath = path.join(__dirname, "..", "8-select-cols-ordered.json");
  const queryPath = path.join(__dirname, "..", "8-select-cols-ordered.sql");

  test("Query SQL file has been updated", () => {
    const query = fs.readFileSync(queryPath, { encoding: "utf8" });
    expect(query).not.toBe(
      `-- Task: Get the title, year, Rotten Tomatoes rating columns of all movies from the year 1991 ordered by Rotten Tomatoes rating in ascending order! --`
    );
  });

  test("Query returned all the rows", () => {
    const results = require(jsonPath);
    expect(results.length).toBe(81);
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
    expect(results[0].hasOwnProperty("age")).toBe(false);
    expect(results[0].hasOwnProperty("imdb_rating")).toBe(false);
    expect(results[0].hasOwnProperty("rotten_tomatoes_rating")).toBe(true);
    expect(results[0].hasOwnProperty("on_netflix")).toBe(false);
    expect(results[0].hasOwnProperty("on_hulu")).toBe(false);
    expect(results[0].hasOwnProperty("on_prime_video")).toBe(false);
    expect(results[0].hasOwnProperty("on_disney_plus")).toBe(false);
    expect(results[0].hasOwnProperty("directors")).toBe(false);
    expect(results[0].hasOwnProperty("genres")).toBe(false);
    expect(results[0].hasOwnProperty("country")).toBe(false);
    expect(results[0].hasOwnProperty("language")).toBe(false);
    expect(results[0].hasOwnProperty("runtime")).toBe(false);
    expect(results[0].year).toBe("1991");
  });

  test("Query returned lowest rated movie", () => {
    const results = require(jsonPath);
    expect(results).not.toStrictEqual([]);

    const normalised = utilities.normaliseObject(results[0]);
    results[0] = normalised;
    expect(results[0].title).toBe("Rock-A-Doodle");
    expect(results[0].rotten_tomatoes_rating).toBe("20.0");
  });
});
