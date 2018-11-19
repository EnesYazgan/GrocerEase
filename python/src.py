import lxml.html
import requests
import json


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
    return str(string.text_content().encode('ascii', 'ignore').decode("utf-8"))


# URL that we are parsing
url = 'https://www.bonappetit.com/recipe/basically-spaghetti-pomodoro'

r = requests.get(url)  # get HTML text from url
html = lxml.html.fromstring(r.content)  # turn HTML string into LXML doc

# grab the title from page
title = html.xpath('/html/body/div[4]/div/div[2]/div[1]/div/div/h1/a')
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

# create new Recipe object with scraped data
spaghetti = Recipe(url, title, image_src, ingredients, equipment, steps)

# write to file
with open('spaghetti.json', 'w') as file:
    file.write(spaghetti.toJSON())
