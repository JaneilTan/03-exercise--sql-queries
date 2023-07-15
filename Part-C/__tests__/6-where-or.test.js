const fs = require("fs");
const path = require("path");
const utilities = require("../../utilities/test-helpers");

const movies = [
  { title: "Raiders of the Lost Ark" },
  { title: "Indiana Jones and the Last Crusade" },
  { title: "Minority Report" },
  { title: "Indiana Jones and the Temple of Doom" },
  { title: "The Adventures of Tintin" },
  { title: "War Horse" },
  { title: "Indiana Jones and the Kingdom of the Crystal Skull" },
  { title: "Terminal" },
  { title: "Always" },
  { title: "Star Wars: A New Hope" },
  { title: "Star Wars: Episode II - Attack of the Clones" },
  { title: "Star Wars: Episode I - The Phantom Menace" },
  { title: "Star Wars: Episode III - Revenge of the Sith" },
  { title: "The BFG" },
];

describe("6 Where Or", () => {
  const jsonPath = path.join(__dirname, "..", "6-where-or.json");
  const queryPath = path.join(__dirname, "..", "6-where-or.sql");

  test("Query SQL file has been updated", () => {
    const query = fs.readFileSync(queryPath, { encoding: "utf8" });
    expect(query).not.toBe(
      `-- Task: Select the title column only for movies that are directed by 'Steven Spielberg' or 'George Lucas'. --`
    );
  });

  test("Query returned all the rows", () => {
    const results = require(jsonPath);
    expect(results.length).toBe(14);
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
    expect(results[0].hasOwnProperty("runtime")).toBe(false);
  });

  test("Correct movies", () => {
    let results = require(jsonPath);
    const normalised = utilities.normaliseArray(results);
    results = normalised;
    expect(results).toEqual(movies);
  });
});
