import pandas as pd

barcodes = pd.read_csv('grocery_upc_database.csv')  # get CSV

print(barcodes.head())
print(barcodes.columns)
print(barcodes.shape)
