import json

foods = ''
# load the food names json file
with open('food_names.json') as file:
    foods = json.load(file)

food_to_json = []
for food in foods:
    # create a list of words split by commas. each group split by commas is then split by spaces
    chonked = [chunk.strip().lower().split(' ') for chunk in food['food_name'].split(',')]
    # flatten the list into a 1d array
    chonked = sum(chonked, [])
    # remove all parenthesis
    chonked = [chunk.replace('(', '').replace(')', '') for chunk in chonked]
    # add to list for jsonification
    food_to_json.append(chonked)

# output to a json file
with open('food_names_parsed.json', 'w') as food_file:
    json.dump(food_to_json, food_file, indent=4)
