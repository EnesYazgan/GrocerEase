import csv
import json
import codecs

class BarcodeObject:
    # initialize the object
    def __init__(self, index, upc14, upc12, brand, name):
        self.index = index.strip()
        self.upc14 = upc14.strip()
        self.upc12 = upc12.strip()
        self.brand = brand.strip()
        self.name = name.strip()
    # returns a json string representing the object, indexed by upc12 or upc14 value
    def toJSON(self, barcode):
        if barcode == 'upc14':
            return '"{}": {{upc12: "{}", brand: "{}", name: "{}"}}'.format(self.upc14, self.upc12, self.brand, self.name)
        else:
            return '"{}": {{upc14: "{}", brand: "{}", name: "{}"}}'.format(self.upc12, self.upc14, self.brand, self.name)

barcodes_upc14 = []
barcodes_upc12 = []

# open CSV
with open('grocery_upc_database.csv') as csvfile:
    readcsv = csv.reader(csvfile, delimiter=',')
    for row in readcsv:
        # create new barcode with row of CSV
        new_code = BarcodeObject(row[0], row[1], row[2], row[3], row[4])
        # append the appropriately indexed object to array
        barcodes_upc14.append(new_code.toJSON('upc14'))
        barcodes_upc12.append(new_code.toJSON('upc12'))
    # [index, upc14, upc12, brand, name]

# print(json.dumps(barcodes[3].toJSON(), ensure_ascii=True))

# convert arrays to strings with commas, skip first index since it's the header
barcodes_upc12_string = '{{{}}}'.format(','.join(barcodes_upc12[1:]).strip())
barcodes_upc14_string = '{{{}}}'.format(','.join(barcodes_upc14[1:]).strip())

with open('barcodes_upc12.json', 'w') as file:
    file.write(barcodes_upc12_string)

with open('barcodes_upc14.json', 'w') as file:
    file.write(barcodes_upc14_string)

# write json strings to files
# with open('barcodes_upc12.json', 'w') as fp:
#     json.dump(codecs.decode(barcodes_upc12_string, 'unicode_escape'), fp)
#
# with open('barcodes_upc14.json', 'w') as fp:
#     json.dump(codecs.decode(barcodes_upc14_string, 'unicode_escape'), fp)
