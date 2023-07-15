const fs = require("fs");
const path = require("path");
const utilities = require("../../utilities/test-helpers");

describe("5 Select Cols Where", () => {
  const jsonPath = path.join(__dirname, "..", "5-select-cols-where.json");
  const queryPath = path.join(__dirname, "..", "5-select-cols-where.sql");

  test("Query SQL file has been updated", () => {
    const query = fs.readFileSync(queryPath, { encoding: "utf8" });
    expect(query).not.toBe(
      `-- Task: Get the title, year, and IMDB rating columns of all movies from the year 1984. --`
    );
  });

  test("Query returned all the rows", () => {
    const results = require(jsonPath);
    expect(results.length).toBe(62);
  });

  test("Query returned all columns", () => {
    const results = require(jsonPath);
    expect(results).not.toStrictEqual([]);
    const normalised = utilities.normaliseObject(results[0]);
    results[0] = normalised;
    // only check the columns on the first element
    // otherwise this test takes way too long!
    expect(results[0].hasOwnProperty("id")).toBe(false);
    expect(results[0].hasOwnProperty("title")).toBe(true);
    expect(results[0].hasOwnProperty("year")).toBe(true);
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
    expect(results[0].hasOwnProperty("runtime")).toBe(false);
    expect(results[0].year).toBe("1984");
  });
});
