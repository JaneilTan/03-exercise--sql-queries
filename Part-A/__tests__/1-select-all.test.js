const fs = require("fs");
const path = require("path");

describe("1 Select All", () => {
  const jsonPath = path.join(__dirname, "..", "1-select-all.json");
  const queryPath = path.join(__dirname, "..", "1-select-all.sql");

  test("Query SQL file has been updated", () => {
    const query = fs.readFileSync(queryPath, { encoding: "utf8" });
    expect(query).not.toBe(`-- Task: Select all the columns and rows!! --`);
  });

  test("Query returned all the rows", () => {
    const results = require(jsonPath);
    expect(results.length).toBe(16744);
  });

  test("Query returned all columns", () => {
    const results = require(jsonPath);
    // only check the columns on the first element
    // otherwise this test takes way too long!
    expect(results[0]).toHaveProperty("id");
    expect(results[0]).toHaveProperty("title");
    expect(results[0]).toHaveProperty("year");
    expect(results[0]).toHaveProperty("age");
    expect(results[0]).toHaveProperty("imdb_rating");
    expect(results[0]).toHaveProperty("rotten_tomatoes_rating");
    expect(results[0]).toHaveProperty("on_netflix");
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
