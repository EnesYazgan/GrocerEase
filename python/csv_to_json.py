import csv
import json
import selenium

class BarcodeObject:
    # initialize the object
    def __init__(self, index, upc14, upc12, brand, name):
        # each input is stripped so there isn't any unnecessary whitespace
        self.index = index.strip()
        self.upc14 = upc14.strip()
        self.upc12 = upc12.strip()
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
        if barcode == 'upc14':
            return '"{}": {{"upc12": "{}", "brand": "{}", "name": "{}"}}'.format(self.upc14, self.upc12, self.brand, self.name)
        else:
            return '"{}": {{"upc14": "{}", "brand": "{}", "name": "{}"}}'.format(self.upc12, self.upc14, self.brand, self.name)

barcodes_upc14 = []
barcodes_upc12 = []

# open CSV
with open('grocery_upc_database.csv') as csvfile:
    readcsv = csv.reader(csvfile, delimiter=',')
    for row in readcsv:
        # create new barcode with row of CSV
        new_code = BarcodeObject(row[0], row[1], row[2], row[3], row[4])
        # format of the row: [index, upc14, upc12, brand, name]
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
