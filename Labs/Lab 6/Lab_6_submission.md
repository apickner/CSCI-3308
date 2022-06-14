# Homework #3 #
## **Andrew Pickner** ##

---

	For the Lab Re-Do assignment because I missed this lab.

**Partner:** None

**Date:** 11/23/2019

---

# ---------------------------------------- Question 1 ---------------------------------------- #

	Tutorial: nothing to do here, just read up on some Postgres topics.
# ---------------------------------------- Question 2 ---------------------------------------- #

	Creating the database and the DB’s individual tables: copy and paste INSERT statements.

~~~~sql
CREATE TABLE IF NOT EXISTS football_games (
  visitor_name VARCHAR(30),       /* Name of the visiting team                     */
  home_score SMALLINT NOT NULL,   /* Final score of the game for the Buffs         */
  visitor_score SMALLINT NOT NULL,/* Final score of the game for the visiting team */
  game_date DATE NOT NULL,        /* Date of the game                              */
  players INT[] NOT NULL,         /* This array consists of the football player ids (basically a foreign key to the football_player.id) */
  PRIMARY KEY(visitor_name, game_date) /* A game's unique primary key consists of the visitor_name & the game date (this assumes you can't have multiple games against the same team in a single day) */
);

CREATE TABLE IF NOT EXISTS football_players(
  id SERIAL PRIMARY KEY,       /* Unique identifier for each player (it's possible multiple players have the same name/similiar information) */
  name VARCHAR(50) NOT NULL,   /* The player's first & last name */
  year VARCHAR(3),             /* FSH - Freshman, SPH - Sophomore, JNR - Junior, SNR - Senior */
  major VARCHAR(4),            /* The unique 4 character code used by CU Boulder to identify student majors (ex. CSCI, ATLS) */
  passing_yards SMALLINT,      /* The number of passing yards in the players entire football career  */
  rushing_yards SMALLINT,      /* The number of rushing yards in the players entire football career  */
  receiving_yards SMALLINT,    /* The number of receiving yards in the players entire football career*/
  img_src VARCHAR(200)         /* This is a file path (absolute or relative), that locates the player's profile image */
);

INSERT INTO football_games(visitor_name, home_score, visitor_score, game_date, players)
VALUES('Colorado State', 45, 13, '20180831', ARRAY [1,2,3,4,5]),
	  ('Nebraska', 33, 28, '20180908', ARRAY [2,3,4,5,6]),
	  ('New Hampshire', 45, 14, '20180915', ARRAY [3,4,5,6,7]),
	  ('UCLA', 38, 16, '20180928', ARRAY [4,5,6,7,8]),
	  ('Arizona State', 28, 21, '20181006', ARRAY [5,6,7,8,9]),
	  ('Southern California', 20, 31, '20181013', ARRAY [6,7,8,9,10]),
	  ('Washington', 13, 27, '20181020', ARRAY [7,8,9,10,1]),
	  ('Oregon State', 34, 41, '20181027', ARRAY [8,9,10,1,2]),
	  ('Arizona', 34, 42, '20181102', ARRAY [9,10,1,2,3]),
	  ('Washington State', 7, 31, '20181110', ARRAY [10,1,2,3,4]),
	  ('Utah', 7, 30, '20181117', ARRAY [1,2,3,4,5]),
	  ('California', 21, 33, '20181124', ARRAY [2,3,4,5,6])
;

INSERT INTO football_players(name, year, major, passing_yards, rushing_yards, receiving_yards)
VALUES('Cedric Vega', 'FSH', 'ARTS', 15, 25, 33),
      ('Myron Walters', 'SPH', 'CSCI', 32, 43, 52),
      ('Javier Washington', 'JNR', 'MATH', 1, 61, 45),
      ('Wade Farmer', 'SNR', 'ARTS', 14, 55, 12),
      ('Doyle Huff', 'FSH', 'CSCI', 23, 44, 92),
      ('Melba Pope', 'SPH', 'MATH', 13, 22, 45),
      ('Erick Graves', 'JNR', 'ARTS', 45, 78, 98 ),
      ('Charles Porter', 'SNR', 'CSCI', 92, 102, 125),
      ('Rafael Boreous', 'JNR', 'MATH', 102, 111, 105),
      ('Jared Castillo', 'SNR', 'ARTS', 112, 113, 114);
~~~~

# ---------------------------------------- Question 3 ---------------------------------------- #

	DB Fiddle: use if Postgres is not installed correctly on your system.

- It is correctly set-up on my system

# ---------------------------------------- Question 4 ---------------------------------------- #
**DOES NOT WORK CURRENTLY...**

1. **check!**
~~~sql
CREATE TABLE IF NOT EXISTS universities (
	university_name VARCHAR(45) PRIMARY KEY,
	date_est INT,
	street_address VARCHAR(45),
	student_pop INT,
	acceptance_rate DECIMAL
);
~~~


2.
~~~sql
INSERT INTO universities( university_name,
					  	date_est,
						  street_address,
						  student_pop,
						  acceptance_rate )
VALUES('CU Boulder',
	   1876,
	   '1100 28th St, Boulder, CO 80303',
	   35000,
	   0.8);
~~~

# ---------------------------------------- Question 5 ---------------------------------------- #
	Query Basics

1. **check!**
~~~sql
SELECT name,
          major
FROM football_players
ORDER BY major ASC;
~~~

2. **check!**
~~~sql
SELECT name,
		  rushing_yards
FROM football_players
WHERE rushing_yards > 70;
~~~

3. **check!**
~~~sql
SELECT *
FROM football_games
WHERE visitor_name = 'Nebraska';
~~~

4. **check!**
~~~sql
SELECT *
FROM football_games
WHERE home_score > visitor_score;
~~~

5. **check!**
~~~sql
SELECT visitor_name,
		  game_date
FROM football_games;
~~~

6. **check!**
~~~sql
SELECT AVG(home_score)
FROM football_games;
~~~

7. **check!**
~~~sql
SELECT major,
		  COUNT(major) AS number_of_players
FROM football_players
GROUP BY major;
~~~

8. **check!**
~~~sql
SELECT major,
      	COUNT(major) AS number_of_players
FROM football_players
WHERE major = 'CSCI'  
GROUP BY major;
~~~

# ---------------------------------------- Question 6 ---------------------------------------- #
	Views & Subqueries

1. **check!**
~~~sql
SELECT COUNT(*) AS number_of_wins
FROM football_games
WHERE home_score > visitor_score;
~~~

2. **check!**
~~~sql
SELECT COUNT(*) AS number_of_games
FROM football_games;
~~~

3. **check!**

~~~sql
SELECT (
(SELECT COUNT(*)
 FROM football_games
 WHERE home_score > visitor_score)::decimal
 /
(SELECT COUNT(*)
 FROM football_games)::decimal)
 * 100.0;
~~~

# ---------------------------------------- Question 7 ---------------------------------------- #
	Handling Joins

1. **check!**
~~~sql
SELECT COUNT(*)
FROM (football_games JOIN football_players
	 ON football_players.id=ANY(football_games.players))
WHERE football_players.name = 'Cedric Vega';
~~~

2. **check!**
~~~sql
SELECT ((football_players.rushing_yards)::decimal / (COUNT(*))::decimal)
FROM (football_games JOIN football_players ON football_players.id=ANY(football_games.players))
WHERE football_players.name = 'Cedric Vega'
GROUP BY football_players.rushing_yards;
~~~
