# Homework #3 #
## **Andrew Pickner** ##

---

# ---------------------------------------- Question 1 ---------------------------------------- #

### Query ###

~~~~sql
SELECT last_name,
	   first_name
FROM employees
WHERE country!='UK'
  AND hire_date::date < '2019-11-15'::date - INTERVAL '5 years'
ORDER BY last_name, first_name ASC;
~~~~

### Results ###

```
last_name | first_name
----------+------------
Callahan  | Laura
Davolio   | Nancy
Fuller    | Andrew
Leverling | Janet
Peacock   | Margaret

(5 rows)
```

---

# ---------------------------------------- Question 2  ---------------------------------------- #

### Query ###

~~~sql
SELECT product_id,
	   product_name,
	   units_in_stock,
	   unit_price
FROM products
WHERE units_in_stock > 0
  AND units_in_stock < reorder_level;
~~~

### Results ###

```
product_id |       product_name        | units_in_stock | unit_price
-----------+---------------------------+----------------+------------
		 2 | Chang                     |             17 |         19
		 3 | Aniseed Syrup             |             13 |         10
		11 | Queso Cabrales            |             22 |         21
		21 | Sir Rodney's Scones       |              3 |         10
		30 | Nord-Ost Matjeshering     |             10 |      25.89
		32 | Mascarpone Fabioli        |              9 |         32
		37 | Gravad lax                |             11 |         26
		43 | Ipoh Coffee               |             17 |         46
		45 | Rogede sild               |              5 |        9.5
		48 | Chocolade                 |             15 |      12.75
		49 | Maxilaku                  |             10 |         20
		56 | Gnocchi di nonna Alice    |             21 |         38
		64 | Wimmers gute Semmelknödel |             22 |      33.25
		66 | Louisiana Hot Spiced Okra |              4 |         17
		68 | Scottish Longbreads       |              6 |       12.5
		70 | Outback Lager             |             15 |         15
		74 | Longlife Tofu             |              4 |         10

(17 rows)
```

---

# ---------------------------------------- Question 3 ---------------------------------------- #

### Query ###

~~~sql
SELECT product_name,
	   unit_price
FROM products
WHERE unit_price IN ( SELECT MIN(unit_price)
					  FROM products );
~~~

### Results ###

```
product_name | unit_price
-------------+------------
Geitost      |        2.5

(1 row)
```

---

# ---------------------------------------- Question 4 ---------------------------------------- #

### Query ###

~~~sql
SELECT product_name,
	   unit_price,
	   (unit_price * units_in_stock) AS "inventory total value"
FROM products
WHERE (unit_price * units_in_stock) < 200
ORDER BY "inventory total value" ASC;
~~~

### Results ###

```
product_name              | unit_price | inventory total value
--------------------------+------------+----------------------
Thüringer Rostbratwurst   |     123.79 |                0
Chef Anton's Gumbo Mix    |      21.35 |                0
Perth Pasties             |       32.8 |                0
Alice Mutton              |         39 |                0
Gorgonzola Telino         |       12.5 |                0
Sir Rodney's Scones       |         10 |               30
Longlife Tofu             |         10 |               40
Rogede sild               |        9.5 |             47.5
Louisiana Hot Spiced Okra |         17 |               68
Scottish Longbreads       |       12.5 |               75
Guaraná Fantástica        |        4.5 |               90
Aniseed Syrup             |         10 |              130
Konbu                     |          6 |              144
Tourtière                 |       7.45 | 156.449995994568
Chocolade                 |      12.75 |           191.25

(15 rows)
```

---

# ---------------------------------------- Question 5 ---------------------------------------- #

### Query ###

~~~sql
SELECT ship_country,
	   COUNT(ship_country)
FROM orders
WHERE ship_country
   IN ( SELECT ship_country
	    FROM orders
		WHERE ship_country != 'USA'
		  AND date_part('year', shipped_date::date) = 1996
		  AND date_part('month', shipped_date::date) = 8 )
GROUP BY ship_country;
~~~

### Results ###

```
ship_country | count
-------------+-------
 Spain       |    23
 Italy       |    28
 Venezuela   |    46
 Sweden      |    37
 France      |    77
 Mexico      |    28
 Brazil      |    83
 UK          |    56
 Germany     |   122
 Finland     |    22

(10 rows)
```
---

# ---------------------------------------- Question 6 ---------------------------------------- #

### Query ###

~~~sql
SELECT customer_id
FROM orders
GROUP BY customer_id
HAVING COUNT(customer_id) < 4
ORDER BY customer_id DESC;
~~~

### Results ###

```
customer_id
------------
TRAIH
THECR
NORTS
LAZYK
LAUGB
GROSR
FRANR
CONSH
CENTC
BOLID

(10 rows)

```

---

# ---------------------------------------- Question 7 ---------------------------------------- #

### Query ###

~~~sql
SELECT SUM(units_in_stock * unit_price)
FROM products
GROUP BY supplier_id
HAVING COUNT(product_id) > 3;
~~~

### Results ###

```
sum
------------------
4409.65005874634
3301.84996032715
2833.7999420166
4276.99999523163

(4 rows)
```

---

# ---------------------------------------- Question 8 ---------------------------------------- #

### Query ###

~~~sql
SELECT suppliers.company_name,
	   products.product_name,
	   products.unit_price
FROM ( suppliers JOIN products
	   ON suppliers.supplier_id = products.supplier_id )
WHERE suppliers.country = 'France';
~~~

### Results ###

```
company_name               |      product_name      | unit_price
---------------------------+------------------------+----------------
Aux joyeux ecclésiastiques | Côte de Blaye          |  263.5
Aux joyeux ecclésiastiques | Chartreuse verte       |     18
Escargots Nouveaux         | Escargots de Bourgogne |  13.25
Gai pâturage               | Raclette Courdavault   |     55
Gai pâturage               | Camembert Pierrot      |     34

(5 rows)
```

---

# ---------------------------------------- Question 9 ---------------------------------------- #

### Query ###

~~~sql
SELECT employees.last_name,
	   employees.first_name,
	   employees.title,
	   employees.extension,
	   COUNT(orders.employee_id) AS num_orders
 FROM ( employees JOIN orders
	    ON employees.employee_id = orders.employee_id )
 GROUP BY employees.last_name,
		  employees.first_name,
		  employees.title,
		  employees.extension
HAVING COUNT(orders.employee_id) < 75;
~~~

### Results ###

```
last_name  | first_name |        title         | extension | num_orders
-----------+------------+----------------------+-----------+------------
Suyama     | Michael    | Sales Representative | 428       |         67
Buchanan   | Steven     | Sales Manager        | 3453      |         42
King       | Robert     | Sales Representative | 465       |         72
Dodsworth  | Anne       | Sales Representative | 452       |         43

(4 rows)
```

---

# ---------------------------------------- Question 10 ---------------------------------------- #

### Query ###

~~~sql
-- just in case this table already exists, we drop it (this is found within our sql document...)
DROP TABLE IF EXISTS top_items;
CREATE TABLE top_items (
		item_id int NOT NULL PRIMARY KEY,
		item_code int NOT NULL,
		item_name character varying(40) NOT NULL,
		inventory_date date NOT NULL,
		supplier_id integer NOT NULL,
		item_quantity integer NOT NULL,
		item_price decimal(9,2) NOT NULL
);
~~~

### Results ###

```
CREATE TABLE
```

---

# ---------------------------------------- Question 11 ---------------------------------------- #

### Query ###

~~~sql
INSERT INTO top_items( item_id,
				   	item_code,
				   	item_name,
				   	inventory_date,
				   	supplier_id,
				   	item_quantity,
				   	item_price )
SELECT product_id,
	   category_id,
	   product_name,
	   current_date,
	   supplier_id,
	   units_in_stock,
	   unit_price
FROM products
WHERE (units_in_stock * unit_price) > 2500;
~~~

### Results ###

```
INSERT 0 9
```

---

# ---------------------------------------- Question 12 ---------------------------------------- #

### Query ###

~~~sql
DELETE FROM top_items
WHERE item_quantity < 50;
~~~

### Results ###

```
DELETE 4
```

---

# ---------------------------------------- Question 13 ---------------------------------------- #

### Query ###

~~~sql
ALTER TABLE top_items ADD COLUMN inventory_value decimal(9,2) default 0;
~~~

### Results ###

```
ALTER TABLE
```

---

# ---------------------------------------- Question 14 ---------------------------------------- #

### Query ###

~~~sql
UPDATE top_items
SET inventory_value = item_quantity * item_price;
~~~

### Results ###

```
UPDATE 5
```

---

# ---------------------------------------- Question 15 ---------------------------------------- #

### Query ###

~~~sql
DROP TABLE IF EXISTS top_items;
~~~

### Results ###

```
DROP TABLE
```

---

# ---------------------------------------- Question 16 ---------------------------------------- #

### Query ###

~~~sql
SELECT employees.last_name,
       employees.first_name,
       COUNT(distinct orders.customer_id) as num_clients
FROM ( employees JOIN orders
	   ON employees.employee_id = orders.employee_id )
GROUP BY employees.last_name,
	     employees.first_name
having count(distinct orders.customer_id) > 50
ORDER BY COUNT(orders.employee_id) DESC;
~~~

### Results ###

```
last_name | first_name | num_clients
----------+------------+-------------
Peacock   | Margaret   |         75
Davolio   | Nancy      |         65
Leverling | Janet      |         63
Fuller    | Andrew     |         59
Callahan  | Laura      |         56

(5 rows)
```

---

---------------------------------------- Question 17 ----------------------------------------

### Query ###

~~~sql
SELECT *
FROM products
WHERE unit_price < ( SELECT avg(unit_price)
					 FROM products );
~~~

### Results ###

```
product_id  |           product_name           | supplier_id | category_id |  quantity_per_unit   | unit_price | units_in_stock | units_on_order | reorder_level | discontinued
------------+----------------------------------+-------------+-------------+----------------------+------------+----------------+----------------+---------------+--------------
          1 | Chai                             |           8 |           1 | 10 boxes x 30 bags   |         18 |             39 |              0 |            10 |            1
          2 | Chang                            |           1 |           1 | 24 - 12 oz bottles   |         19 |             17 |             40 |            25 |            1
          3 | Aniseed Syrup                    |           1 |           2 | 12 - 550 ml bottles  |         10 |             13 |             70 |            25 |            0
          4 | Chef Anton's Cajun Seasoning     |           2 |           2 | 48 - 6 oz jars       |         22 |             53 |              0 |             0 |            0
          5 | Chef Anton's Gumbo Mix           |           2 |           2 | 36 boxes             |      21.35 |              0 |              0 |             0 |            1
          6 | Grandma's Boysenberry Spread     |           3 |           2 | 12 - 8 oz jars       |         25 |            120 |              0 |            25 |            0
         11 | Queso Cabrales                   |           5 |           4 | 1 kg pkg.            |         21 |             22 |             30 |            30 |            0
         13 | Konbu                            |           6 |           8 | 2 kg box             |          6 |             24 |              0 |             5 |            0
         14 | Tofu                             |           6 |           7 | 40 - 100 g pkgs.     |      23.25 |             35 |              0 |             0 |            0
         15 | Genen Shouyu                     |           6 |           2 | 24 - 250 ml bottles  |         13 |             39 |              0 |             5 |            0
         16 | Pavlova                          |           7 |           3 | 32 - 500 g boxes     |      17.45 |             29 |              0 |            10 |            0
         19 | Teatime Chocolate Biscuits       |           8 |           3 | 10 boxes x 12 pieces |        9.2 |             25 |              0 |             5 |            0
         21 | Sir Rodney's Scones              |           8 |           3 | 24 pkgs. x 4 pieces  |         10 |              3 |             40 |             5 |            0
         22 | Gustaf's Knäckebröd              |           9 |           5 | 24 - 500 g pkgs.     |         21 |            104 |              0 |            25 |            0
         23 | Tunnbröd                         |           9 |           5 | 12 - 250 g pkgs.     |          9 |             61 |              0 |            25 |            0
         24 | Guaraná Fantástica               |          10 |           1 | 12 - 355 ml cans     |        4.5 |             20 |              0 |             0 |            1
         25 | NuNuCa Nuß-Nougat-Creme          |          11 |           3 | 20 - 450 g glasses   |         14 |             76 |              0 |            30 |            0
         30 | Nord-Ost Matjeshering            |          13 |           8 | 10 - 200 g glasses   |      25.89 |             10 |              0 |            15 |            0
         31 | Gorgonzola Telino                |          14 |           4 | 12 - 100 g pkgs      |       12.5 |              0 |             70 |            20 |            0
         33 | Geitost                          |          15 |           4 | 500 g                |        2.5 |            112 |              0 |            20 |            0
         34 | Sasquatch Ale                    |          16 |           1 | 24 - 12 oz bottles   |         14 |            111 |              0 |            15 |            0
         35 | Steeleye Stout                   |          16 |           1 | 24 - 12 oz bottles   |         18 |             20 |              0 |            15 |            0
         36 | Inlagd Sill                      |          17 |           8 | 24 - 250 g  jars     |         19 |            112 |              0 |            20 |            0
         37 | Gravad lax                       |          17 |           8 | 12 - 500 g pkgs.     |         26 |             11 |             50 |            25 |            0
         39 | Chartreuse verte                 |          18 |           1 | 750 cc per bottle    |         18 |             69 |              0 |             5 |            0
         40 | Boston Crab Meat                 |          19 |           8 | 24 - 4 oz tins       |       18.4 |            123 |              0 |            30 |            0
         41 | Jack's New England Clam Chowder  |          19 |           8 | 12 - 12 oz cans      |       9.65 |             85 |              0 |            10 |            0
         42 | Singaporean Hokkien Fried Mee    |          20 |           5 | 32 - 1 kg pkgs.      |         14 |             26 |              0 |             0 |            1
         44 | Gula Malacca                     |          20 |           2 | 20 - 2 kg bags       |      19.45 |             27 |              0 |            15 |            0
         45 | Rogede sild                      |          21 |           8 | 1k pkg.              |        9.5 |              5 |             70 |            15 |            0
         46 | Spegesild                        |          21 |           8 | 4 - 450 g glasses    |         12 |             95 |              0 |             0 |            0
         47 | Zaanse koeken                    |          22 |           3 | 10 - 4 oz boxes      |        9.5 |             36 |              0 |             0 |            0
         48 | Chocolade                        |          22 |           3 | 10 pkgs.             |      12.75 |             15 |             70 |            25 |            0
         49 | Maxilaku                         |          23 |           3 | 24 - 50 g pkgs.      |         20 |             10 |             60 |            15 |            0
         50 | Valkoinen suklaa                 |          23 |           3 | 12 - 100 g bars      |      16.25 |             65 |              0 |            30 |            0
         52 | Filo Mix                         |          24 |           5 | 16 - 2 kg boxes      |          7 |             38 |              0 |            25 |            0
         54 | Tourtière                        |          25 |           6 | 16 pies              |       7.45 |             21 |              0 |            10 |            0
         55 | Pâté chinois                     |          25 |           6 | 24 boxes x 2 pies    |         24 |            115 |              0 |            20 |            0
         57 | Ravioli Angelo                   |          26 |           5 | 24 - 250 g pkgs.     |       19.5 |             36 |              0 |            20 |            0
         58 | Escargots de Bourgogne           |          27 |           8 | 24 pieces            |      13.25 |             62 |              0 |            20 |            0
         61 | Sirop d'érable                   |          29 |           2 | 24 - 500 ml bottles  |       28.5 |            113 |              0 |            25 |            0
         65 | Louisiana Fiery Hot Pepper Sauce |           2 |           2 | 32 - 8 oz bottles    |      21.05 |             76 |              0 |             0 |            0
         66 | Louisiana Hot Spiced Okra        |           2 |           2 | 24 - 8 oz jars       |         17 |              4 |            100 |            20 |            0
         67 | Laughing Lumberjack Lager        |          16 |           1 | 24 - 12 oz bottles   |         14 |             52 |              0 |            10 |            0
         68 | Scottish Longbreads              |           8 |           3 | 10 boxes x 8 pieces  |       12.5 |              6 |             10 |            15 |            0
         70 | Outback Lager                    |           7 |           1 | 24 - 355 ml bottles  |         15 |             15 |             10 |            30 |            0
         71 | Flotemysost                      |          15 |           4 | 10 - 500 g pkgs.     |       21.5 |             26 |              0 |             0 |            0
         73 | Röd Kaviar                       |          17 |           8 | 24 - 150 g jars      |         15 |            101 |              0 |             5 |            0
         74 | Longlife Tofu                    |           4 |           7 | 5 kg pkg.            |         10 |              4 |             20 |             5 |            0
         75 | Rhönbräu Klosterbier             |          12 |           1 | 24 - 0.5 l bottles   |       7.75 |            125 |              0 |            25 |            0
         76 | Lakkalikööri                     |          23 |           1 | 500 ml               |         18 |             57 |              0 |            20 |            0
         77 | Original Frankfurter grüne Soße  |          12 |           2 | 12 boxes             |         13 |             32 |              0 |            15 |            0

(52 rows)
```

---

# ---------------------------------------- Question 18 ---------------------------------------- #

### Query ###

~~~sql
SELECT last_name,
	   first_name,
	   COUNT(o.employee_id) AS num_orders,
	   COUNT(distinct o.customer_id) AS num_clients
FROM employees e FULL JOIN orders o
ON e.employee_id = o.employee_id
WHERE date_part('year', o.order_date::date) = 1998
GROUP BY e.last_name,
		 e.first_name;
~~~

### Results ###

```
last_name | first_name | num_orders | num_clients
-----------+------------+------------+-------------
Buchanan  | Steven     |         13 |          11
Callahan  | Laura      |         31 |          23
Davolio   | Nancy      |         42 |          32
Dodsworth | Anne       |         19 |          16
Fuller    | Andrew     |         39 |          34
King      | Robert     |         25 |          21
Leverling | Janet      |         38 |          30
Peacock   | Margaret   |         44 |          33
Suyama    | Michael    |         19 |          17

(9 rows)
```

---

# ---------------------------------------- Question 19 ---------------------------------------- #

### Query ###

~~~sql
SELECT COUNT(DISTINCT employee_id)
FROM orders
WHERE ship_address != ( SELECT address
					    FROM employees
						WHERE orders.employee_id = employees.employee_id );

--- --- proof that it's 9
--- SELECT employees.employee_id,
--- 	   employees.address,
--- 	   orders.ship_address
--- FROM ( employees JOIN orders
---        ON employees.employee_id = orders.employee_id )
--- GROUP BY employees.employee_id,
---      	employees.address,
--- 	 	orders.ship_address;
~~~

### Results ###

```
count
-------
		9

(1 row)
```

# ---------------------------------------- Question 20 ---------------------------------------- #

### Query ###

~~~sql
SELECT COUNT(*)
FROM orders
WHERE ship_country='Sweden'
AND order_date::date > shipped_date::date - INTERVAL '1 week';
~~~

### Results ###

```
count
-------
	 11

(1 row)
```

---

# ---------------------------------------- Question 21 ---------------------------------------- #

### Query ###

~~~sql
SELECT *
FROM products
WHERE supplier_id = ( SELECT supplier_id
				      FROM suppliers
				      WHERE company_name='Leka Trading' );
~~~

### Results ###

```
product_id |         product_name          | supplier_id | category_id | quantity_per_unit | unit_price | units_in_stock | units_on_order | reorder_level | discontinued
-----------+-------------------------------+-------------+-------------+-------------------+------------+----------------+----------------+---------------+--------------
    	42 | Singaporean Hokkien Fried Mee |          20 |           5 | 32 - 1 kg pkgs.   |         14 |             26 |              0 |             0 |          1
    	43 | Ipoh Coffee                   |          20 |           1 | 16 - 500 g tins   |         46 |             17 |             10 |            25 |          0
    	44 | Gula Malacca                  |          20 |           2 | 20 - 2 kg bags    |      19.45 |             27 |              0 |            15 |          0

(3 rows)
```

---

# ---------------------------------------- Bonus Question 1 ---------------------------------------- #

### Query ###

~~~sql
--- using the e and o shorthand
SELECT e.last_name,
			 e.first_name,
			 COUNT(o.employee_id) as order_count,
			 COUNT(distinct o.customer_id) as clients
 FROM ( employees e JOIN orders o
 	   ON e.employee_id = o.employee_id )
 GROUP BY e.last_name,
	  	e.first_name
HAVING COUNT(o.employee_id) > 70
	OR COUNT(distinct o.customer_id) > 50;
~~~

### Result ###

```
last_name | first_name | order_count | clients
----------+------------+-------------+---------
Callahan  | Laura      |        104  |     56
Davolio   | Nancy      |        123  |     65
Fuller    | Andrew     |         96  |     59
King      | Robert     |         72  |     45
Leverling | Janet      |        127  |     63
Peacock   | Margaret   |        156  |     75

(6 rows)
```

---

# ---------------------------------------- Bonus Question 2 ---------------------------------------- #

### Query ###

Respectively:

~~~sql
--- both of these methods work

SELECT ( SELECT company_name
		 FROM suppliers
		 WHERE products.supplier_id = suppliers.supplier_id ),
		AVG(unit_price)
FROM products
WHERE supplier_id IN ( SELECT supplier_id
					   FROM suppliers
					   WHERE country = 'USA')
GROUP BY supplier_id;


SELECT suppliers.company_name,
	   AVG(products.unit_price)
FROM ( products JOIN suppliers
	   ON products.supplier_id = suppliers.supplier_id )
GROUP BY suppliers.company_name,
		 suppliers.country
HAVING suppliers.country = 'USA';
~~~

### Results ###


Respectively:
```
company_name                |       avg
----------------------------+------------------
New Orleans Cajun Delights  | 20.3499999046326
Grandma Kelly's Homestead   | 31.6666666666667
Bigfoot Breweries           | 15.3333333333333
New England Seafood Cannery | 14.0249996185303


company_name                |       avg
----------------------------+------------------
Bigfoot Breweries           | 15.3333333333333
Grandma Kelly's Homestead   | 31.6666666666667
New England Seafood Cannery | 14.0249996185303
New Orleans Cajun Delights  | 20.3499999046326

(4 rows)
```
