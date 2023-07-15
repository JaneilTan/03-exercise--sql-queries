module.exports = {
  normaliseObject: (value) => {
    if (value == undefined) {
      return;
    } else {
      let normalisedObject = { ...value };

      Object.keys(normalisedObject).forEach((key, index) => {
        if (
          typeof normalisedObject[key] === "number" &&
          key == "rotten_tomatoes_rating"
        ) {
          normalisedObject[key] = normalisedObject[key].toFixed(1).toString();
        }
        if (typeof normalisedObject[key] === "number" && key == "imdb_rating") {
          normalisedObject[key] = normalisedObject[key].toFixed(1).toString();
        }
        if (typeof normalisedObject[key] === "number") {
          normalisedObject[key] = normalisedObject[key].toString();
        }
        // test for null value
        if (typeof normalisedObject["runtime"] == "object") {
          normalisedObject["runtime"] = "NULL";
        }
        if (normalisedObject["on_netflix"]) {
          normalisedObject["on_netflix"] = normalisedObject["on_netflix"]
            .toString()
            .toLowerCase();
        }
        if (normalisedObject["on_hulu"]) {
          normalisedObject["on_hulu"] = normalisedObject["on_hulu"]
            .toString()
            .toLowerCase();
        }
        if (normalisedObject["on_prime_video"]) {
          normalisedObject["on_prime_video"] = normalisedObject[
            "on_prime_video"
          ]
            .toString()
            .toLowerCase();
        }
        if (normalisedObject["on_disney_plus"]) {
          normalisedObject["on_disney_plus"] = normalisedObject[
            "on_disney_plus"
          ]
            .toString()
            .toLowerCase();
        }
      });
      return normalisedObject;
    }
  },
  normaliseArray: (array) => {
    const normalisedArray = array.map((item) =>
      module.exports.normaliseObject(item)
    );
    return normalisedArray;
  },
};
