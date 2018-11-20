import lxml.html
import requests
import json

# currently this works with the Bon Appetit Basically recipes, not their main site
#TODO convert unicode fractions to decimal

class Recipe:
    def __init__(self,
                 url,
                 title,
                 image_src,
                 ingredients,
                 equipment_dict,
                 steps):
                    self.url = url
                    self.title = title
                    self.image_src = image_src
                    self.ingredients = ingredients
                    self.equipment_dict = equipment_dict
                    self.steps = steps
    # converts object to JSON string
    def toJSON(self):
        return json.dumps(self,
                          default=lambda o: o.__dict__,
                          sort_keys=True,
                          indent=4)


def stringUTF8(string):
    return str(string.text_content())


recipe_urls_json = ''

# load the harvested hrefs from scrapping into a string
with open('recipe_urls.json', 'r') as file:
    recipe_urls_json = file.read()

# convert into a list using json.loads
recipe_urls_list = json.loads(recipe_urls_json)

# use list comprehension to load all hrefs into an array
recipe_hrefs = [recipe['href'] for recipe in recipe_urls_list]

root_url = 'https://www.bonappetit.com'

# combine hrefs with the base urls generate array of urls to parse
urls = [root_url + recipe_href for recipe_href in recipe_hrefs]

recipes = []

for url in urls:
    print(url)

    r = requests.get(url)
    html = lxml.html.fromstring(r.content)

    title = html.xpath('/html/body/div[4]/div/div[2]/div[1]/div/div/h1/a')
    if len(title) == 0:
        title = html.xpath('/html/body/div[4]/div/div[2]/header/div/h1/a')

    title = title[0].text.strip()

    # get main image
    image_src = html.xpath('//figure/div/picture/img[@class="ba-picture--fit"]/@srcset')
    # grab only first link (split at the space, get first element)
    image_src = image_src[0].split(' ')[0]

    # get ingredients
    ingredients = html.xpath('//li[@class="ingredient"]/label/div')

    # grab text from HTML elements
    ingredients = [stringUTF8(ingredient) for ingredient in ingredients]

    # get equipment necessary
    equip_links = html.xpath('//div[@class="image-grid-item-image"]/div/a/@href')
    equip_names = html.xpath('//div[@class="image-grid-item-text"]/text()')

    # create dictionary of equipment, key is name of equipment, value is link to it
    equipment = dict(zip(equip_names, equip_links))

    # get steps
    steps = html.xpath('//li[@class="step"]/div/p')

    # use list comprehension to run text_content on all steps
    steps = [stringUTF8(step) for step in steps]

    recipe = Recipe(url, title, image_src, ingredients, equipment, steps)

    recipes.append(recipe.toJSON() + ',')

recipe_json_string = ''.join(recipes)

with open('recipes.json', 'w') as file:
    file.write('[{}]'.format(recipe_json_string))
