const fs = require("fs");
const path = require("path");
const utilities = require("../../utilities/test-helpers");

describe("2 Select All Where", () => {
  const jsonPath = path.join(__dirname, "..", "2-select-all-where.json");
  const queryPath = path.join(__dirname, "..", "2-select-all-where.sql");

  test("Query SQL file has been updated", () => {
    const query = fs.readFileSync(queryPath, { encoding: "utf8" });
    expect(query).not.toBe(
      `-- Task:  Select all the columns for movies that are on Netflix. --`
    );
  });

  test("Query returned all the rows", () => {
    const results = require(jsonPath);
    expect(results.length).toBe(3560);
  });

  test("Query returned all columns", () => {
    const results = require(jsonPath);

    // only check the columns on the first element
    // otherwise this test takes way too long!
    const normalised = utilities.normaliseObject(results[0]);
    results[0] = normalised;
    expect(results[0]).toHaveProperty("id");
    expect(results[0]).toHaveProperty("title");
    expect(results[0]).toHaveProperty("year");
    expect(results[0]).toHaveProperty("age");
    expect(results[0]).toHaveProperty("imdb_rating");
    expect(results[0]).toHaveProperty("rotten_tomatoes_rating");
    expect(results[0]).toHaveProperty("on_netflix", "true");
    expect(results[0]).toHaveProperty("on_hulu");
    expect(results[0]).toHaveProperty("on_prime_video");
    expect(results[0]).toHaveProperty("on_disney_plus");
    expect(results[0]).toHaveProperty("directors");
    expect(results[0]).toHaveProperty("genres");
    expect(results[0]).toHaveProperty("country");
    expect(results[0]).toHaveProperty("language");
    expect(results[0]).toHaveProperty("runtime");
  });
});
