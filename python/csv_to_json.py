import csv
import json
from selenium import webdriver # allow launching browser
from selenium.common.exceptions import NoSuchElementException
import os

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
        if len(upc14) < 14:
            diff = 14 - len(upc14)
            self.upc14 = ('0' * diff) + upc14
        else:
            self.upc14 = upc14.strip()
        if len(upc12) < 12:
            diff = 12 - len(upc12)
            self.upc12 = ('0' * diff) + upc12
        else:
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
        if hasattr(self, 'href'):
            if barcode == 'upc14':
                return '"{}": {{"upc12": "{}", "brand": "{}", "name": "{}", "href": "{}"}}'.format(self.upc14, self.upc12, self.brand, self.name, self.href)
            else:
                return '"{}": {{"upc14": "{}", "brand": "{}", "name": "{}", "href": "{}"}}'.format(self.upc12, self.upc14, self.brand, self.name, self.href)
        else:
            if barcode == 'upc14':
                return '"{}": {{"upc12": "{}", "brand": "{}", "name": "{}"}}'.format(self.upc14, self.upc12, self.brand, self.name)
            else:
                return '"{}": {{"upc14": "{}", "brand": "{}", "name": "{}"}}'.format(self.upc12, self.upc14, self.brand, self.name)

    def addHref(self, href):
        self.href = href

def upc_lookup(driver, upc, barcode):
    input = driver.find_element_by_id('qlookup')
    input.clear()
    input.send_keys(upc)

    button = driver.find_element_by_xpath('/html/body/div[2]/div[2]/form/div[1]/div[1]/div[4]/input[1]')
    button.click()

    try:
        driver.find_element_by_xpath('//*[@id="ndl.foods.description.label"]')
        print(driver.find_element_by_xpath('/html/body/div[2]/div[2]/form/div[4]/table/tbody/tr/td[3]/a').text)
        barcode.addHref(driver.find_element_by_xpath('/html/body/div[2]/div[2]/form/div[4]/table/tbody/tr/td[3]/a').get_attribute('href'))
    except NoSuchElementException:
        pass


barcodes_upc14 = []
barcodes_upc12 = []

# open CSV
with open('grocery_upc_database.csv') as csvfile:
    readcsv = csv.reader(csvfile, delimiter=',')
    driver = define_webdriver()
    for count, row in enumerate(readcsv):
        driver.get(url)
        # create new barcode with row of CSV

        new_code = BarcodeObject(row[0], row[1], row[2], row[3], row[4])
        # format of the row: [index, upc14, upc12, brand, name]

        # append the appropriately formatted object to array
        barcodes_upc14.append(new_code.toJSON('upc14'))
        barcodes_upc12.append(new_code.toJSON('upc12'))

        if count % 100 == 0:
            print(count)

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
