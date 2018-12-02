import csv
import json
from selenium import webdriver # allow launching browser
from selenium.common.exceptions import NoSuchElementException
import os
import numpy as np

url = 'https://ndb.nal.usda.gov/ndb/search/list'

def define_webdriver():
    driver_option = webdriver.ChromeOptions()
    driver_option.add_argument(" — incognito")
    chromedriver_path = '/home/simon/Desktop/GrocerEase/GrocerEase/python/chromedriver' # Change this to your own chromedriver path!
    def create_webdriver():
        return webdriver.Chrome(executable_path=chromedriver_path, chrome_options=driver_option)
    driver = create_webdriver()
    driver.get(url) # load site
    return driver

class BarcodeObject:
    # initialize the object
    def __init__(self, index, upc14, upc12, brand, name):
        # each input is stripped so there isn't any unnecessary whitespace
        self.index = index.strip()
        # if len(upc14) < 14:
        #     diff = 14 - len(upc14)
        #     self.upc14 = ('0' * diff) + upc14
        # else:
        self.upc14 = upc14.strip()
        # if len(upc12) < 12:
        #     diff = 12 - len(upc12)
        #     self.upc12 = ('0' * diff) + upc12
        # else:
        self.upc12 = upc12.strip()
        # self.upc14 = upc14.strip()
        # self.upc12 = upc12.strip()
        self.brand = brand.strip()
        # self.name = name.strip()
        try:
            if name.index(brand) == 0:
                # remove brand from name to reduce redundancy
                self.name = name[len(self.brand) + 1:].strip()
            else:
                self.name = name.strip()
        except:
            self.name = name.strip()
    # returns a json string representing the object, indexed by upc12 or upc14 value
    def toJSON(self, barcode):
        # format JSON string differently based on if it's upc12 or upc14
        if not hasattr(self, 'food_name'):
            if barcode == 'upc14':
                return '"{}": {{"upc12": "{}", "brand": "{}", "name": "{}"}}'.format(self.upc14, self.upc12, self.brand, self.name)
            else:
                return '"{}": {{"upc14": "{}", "brand": "{}", "name": "{}"}}'.format(self.upc12, self.upc14, self.brand, self.name)
        else:
            if barcode == 'upc14':
                return '"{}": {{"upc12": "{}", "brand": "{}", "name": "{}", "food_name": "{}"}}'.format(self.upc14, self.upc12, self.brand, self.name, self.food_name)
            else:
                return '"{}": {{"upc14": "{}", "brand": "{}", "name": "{}", "food_name": "{}"}}'.format(self.upc12, self.upc14, self.brand, self.name, self.food_name)

    def addFoodName(self, food_name):
        self.food_name = food_name

def chunk_string(array):
    chonked = [chunk.strip().lower().split(' ') for chunk in array.split(',')]
    # flatten the list into a 1d array
    chonked = sum(chonked, [])
    # remove all parenthesis
    chonked = [chunk.replace('(', '').replace(')', '') for chunk in chonked]
    return chonked

barcodes_upc14 = []
barcodes_upc12 = []

food_names = ''
with open('food_names_parsed.json') as json_file:
    food_names = json.load(json_file)

# print(food_names)

# open CSV
with open('grocery_upc_database.csv') as csvfile:
    readcsv = csv.reader(csvfile, delimiter=',')
    for count, row in enumerate(readcsv):
        if count != 0:
            # create new barcode with row of CSV

            new_code = BarcodeObject(row[0], row[1], row[2], row[3], row[4])
            # format of the row: [index, upc14, upc12, brand, name]

            # input_ing = chunk_string(new_code.name)
            #
            # # print('input: {}'.format(input_ing))
            #
            # try:
            #     # lists of match percentage per food name in database
            #     match_indices = [list(np.in1d(food, input_ing)).count(True) / len(food) for food in food_names]
            #
            #     # list of max percentage indices
            #     max_indices = [i for i,x in enumerate(match_indices) if x == max(match_indices)]
            #
            #     # print('indices of max: {}'.format(max_indices))
            #
            #     #
            #     lens_of_maxes = [len(food_names[max]) for max in max_indices]
            #
            #     # print('length of the max: {}'.format(lens_of_maxes))
            #
            #     # food_names[max_indices.index(max(lens_of_maxes))]
            #
            #     # print(max(match_indices))
            #
            #     # max_index = match_indices.index(max(match_indices))
            #     #
            #     # new_code.addFoodName(' '.join(food_names[max_index]))
            #
            #     new_code.addFoodName(' '.join(food_names[max_indices[lens_of_maxes.index(max(lens_of_maxes))]]))
            #
            #     print('{} --- {}'.format(new_code.name, new_code.food_name))
            # except ValueError:
            #     pass
            # append the appropriately formatted object to array
            barcodes_upc14.append(new_code.toJSON('upc14'))
            barcodes_upc12.append(new_code.toJSON('upc12'))

# convert arrays to strings with commas, skip first index since it's the header
barcodes_upc12_string = '{{{}}}'.format(','.join(barcodes_upc12[1:]).strip())
barcodes_upc14_string = '{{{}}}'.format(','.join(barcodes_upc14[1:]).strip())

# format as JSON to string
parse_upc12 = json.loads(barcodes_upc12_string)
parse_upc14 = json.loads(barcodes_upc14_string)

# dump the formatted JSON string to a json file
with open('barcodes_upc12.json', 'w') as file:
    file.write(json.dumps(parse_upc12, indent=4, sort_keys=True))

with open('barcodes_upc14.json', 'w') as file:
    file.write(json.dumps(parse_upc14, indent=4, sort_keys=True))
