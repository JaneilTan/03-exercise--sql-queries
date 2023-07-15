const fs = require("fs");
const path = require("path");
const utilities = require("../../utilities/test-helpers");

describe("11 Combine", () => {
  const jsonPath = path.join(__dirname, "..", "11-combine.json");
  const queryPath = path.join(__dirname, "..", "11-combine.sql");

  test("Query SQL file has been updated", () => {
    const query = fs.readFileSync(queryPath, { encoding: "utf8" });
    expect(query).not.toBe(
      `-- Task: Get the title, year, and Rotten Tomatoes rating for any movies that are on Netflix, are a comedy, released before 2000, and have an IMDB rating over 8, and a valid/non-null Rotten Tomatoes rating. Order the results by Rotten Tomatoes rating in descending order. Limit the results to the top row only. --`
    );
  });

  test("Query returned all the rows", () => {
    const results = require(jsonPath);
    expect(results.length).toBe(1);
  });

  test("Query returned all columns", () => {
    const results = require(jsonPath);
    expect(results).not.toStrictEqual([]);
    // only check the columns on the first element
    // otherwise this test takes way too long!
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
  });

  test("Correct Movie! 😈✝️", () => {
    const results = require(jsonPath);
    expect(results).not.toStrictEqual([]);
    const normalised = utilities.normaliseObject(results[0]);
    results[0] = normalised;
    expect(results[0].title).toBe("Life of Brian");
    expect(results[0].year).toBe("1979");
    expect(results[0].rotten_tomatoes_rating).toBe("95.0");
  });
});
