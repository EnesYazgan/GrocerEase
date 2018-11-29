import lxml.html
import requests
import json
import unicodedata
import re

quantity_regex = r'.+?(?=tbsp|tablespoon|tablespoons|oz|ounce|ounces|tsp|teaspoon|teaspoons|cup|cp|lb|pound)'
units = ['tbsp',
         'tablespoon',
         'tablespoons',
         'oz',
         'ounce',
         'ounces',
         'tsp',
         'teaspoon',
         'teaspoons',
         'cup',
         'cp',
         'lb',
         'pound']

class Recipe:
    def __init__(self,
                 url,
                 title,
                 image_src,
                 ingredients,
                 equipment_names,
                 equipment_links,
                 steps):
                    self.url = url
                    self.title = title
                    self.image_src = image_src
                    self.ingredients = ingredients
                    self.equipment_names = equipment_names
                    self.equipment_links = equipment_links
                    self.steps = steps
    # converts object to JSON string
    def toJSON(self):
        return json.dumps(self,
                          default=lambda o: o.__dict__,
                          sort_keys=True,
                          indent=4)


class Ingredient:
    def __init__(self, name, quantity, type):
        self.name = name
        self.quantity = quantity
        self.type = type
        if type == 'unit':
            unit_word = name.split(' ')[0]  # grab everything after the unit
            check = [unit in unit_word for unit in units]  # check if each unit name is in the grabbed word
            self.unit = units[check.index(True)]  # get the first unit that matches
            if self.unit in self.name.split(' ')[0]:  # if the first word is the unit, remove it for clarity
                self.name = ' '.join(self.name.split(' ')[1:])
    def __repr__(self):
        if self.quantity == -1:  # no unit or quantity
            return '{}'.format(self.name)
        else:
            if hasattr(self, 'unit'):  # has unit
                return '{} ... {} -> {}'.format(self.quantity, self.unit, self.name)
            else:  # no units
                return '{} -> {}'.format(self.quantity, self.name)
    def toJSON(self):
        return json.dumps(self,
                          default=lambda o: o.__dict__,
                          sort_keys=True,
                          indent=4)


def stringUTF8(string):
    string = unicodedata.normalize('NFKD', string.text_content())
    for key, val in unicode_convert.items():
        # print('{} {} {}'.format(string, key, val))
        string = string.replace(key, val)
    # print(string)
    return string

def getIngredient(line):
    ing = None
    line = line.strip()
    try:
        # this tries to grab the quantity using the regex for unit-based stuff
        matched = re.match(quantity_regex, line.lower())  # find unit with regex
        quantity = matched.group(0).split(' ')[0]  # get just number for quantity
        item = line.lower()[(line.lower().index(quantity) + len(quantity) + 1):]  # cut off the quantity from the item
        ing = Ingredient(item, quantity, 'unit')
        # print(ing)
    except Exception as e:
        # print(e)
        quantity = line.split(' ')[0]
        try:
            # this just grabs the first integer for non-unit stuff
            quantity = int(quantity)
            item = ' '.join(line.split(' ')[1:])
            ing = Ingredient(item, quantity, 'unitless')
        except Exception as e:
            # if there aren't units, just grab the line
            # print(e)
            # print('oof')
            # print(line)
            ing = Ingredient(line, -1, 'other')
    return ing


unicode_convert = {
    '\u2013': '-',
    '\u2044': '/',
    '$': 'S',
    '[': '(',
    ']': ')',
    '#': '||',
}

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
# urls.remove('https://www.bonappetit.com/recipe/creamy-kimchi-dip')
# urls.remove('https://www.bonappetit.com/recipe/cider-braised-pork-shoulder-with-butternut-squash')

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
    ingredients = [getIngredient(ingredient) for ingredient in ingredients]

    # for ingredient in ingredients:
    #     print(ingredient)

    # get equipment necessary
    equip_links = html.xpath('//div[@class="image-grid-item-image"]/div/a/@href')
    equip_names = html.xpath('//div[@class="image-grid-item-text"]/text()')

    # create dictionary of equipment, key is name of equipment, value is link to it
    # equipment = dict(zip(equip_names, equip_links))

    # get steps
    steps = html.xpath('//li[@class="step"]/div/p')

    # use list comprehension to run text_content on all steps
    steps = [stringUTF8(step) for step in steps]

    if len(title) == 0 or len(ingredients) == 0 or len(equip_names) == 0 or len(equip_links) == 0 or len(equip_links) == 0 or len(steps) == 0 or len(title) > 75:
        print(title)
    else:
        recipe = Recipe(url, title, image_src, ingredients, equip_names, equip_links, steps)
        recipes.append(recipe.toJSON() + ',')

recipe_json_string = ''.join(recipes)

with open('recipes.json', 'w') as file:
    file.write('[{}]'.format(recipe_json_string[:-2] + '}'))
