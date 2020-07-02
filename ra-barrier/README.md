## Requiements

pip install scipy==1.1.0

**Asciidoc (plugin)**

gem install asciidoctor-pdf --pre

asciidoctor-pdf algorithm.adoc 

## Setup
In order to run app properly all the requirements need to be fulfilled.

### Download dependencies
Please use `requirements.txt` file to download all the necessary dependencies. Installing them with different versions 
than specified may cause unwanted behaviour, even errors.

To install all the dependencies create a new environment (which we strongly advise, you can also use default "root" env, 
but we observed that is sometimes causes dependency errors) and then run:

```pip install requirements.txt ```

and for conda:

`conda create --name <env> --file requirements.txt`

### Setup environment variables
You need to set up following variables:

`database-url` - with url of database

`database-secret` - with secret to connect to database

#### Running locally
Create file `.env` in main project folder, that contains pairs of key-values (keys specified above) ex.: `database-url = "https://dummy.url"`



#### Running in container
We used heroku for deploying this app, but the process is similar in any other environment. Simply define pair of key-values in container settings.




## Motivation
Many relationships are easier to be found on vectors


## Finding countours


measure.find_contours(grayscale_img, level)

Findings on usage:
* It is worth to start at 1.0
* Continue with lower values if not countours were found
* It returns 2 boundaries for each polygon "inner and outer"
* Outer boundary alone may be cause as inner and then inner corresponds to inner shapes



## Using shapely.geometry.Polygon

.simplify(level) can be used to reduce complexity of polygon

Findings
* It returns set of ndarray points for complex polygons
* At less complex polygons (high level f.ex 20) it retursn Polygon class



<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/pl/"><img alt="Licencja Creative Commons" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/3.0/pl/88x31.png" /></a><br />Ten utwór jest dostępny na <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/3.0/pl/">licencji Creative Commons Uznanie autorstwa-Użycie niekomercyjne-Na tych samych warunkach 3.0 Polska</a>.
