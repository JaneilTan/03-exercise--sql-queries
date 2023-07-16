-- Task: Select title, age and year columns for all movies directed by 'Quentin Tarantino' and are rated for ages 18 only. Order the results by IMDB rating in descending order. --


SELECT title, age, year FROM movies WHERE directors LIKE '%Quentin Tarantino%' AND age = '18' ORDER BY imdb_rating DESC;