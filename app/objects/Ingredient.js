function Ingredient(key = 'ingredient has no name', quantity = 1, unit = 'no measuring units', calories = 0, serving = 0, expiry = 0, isExpired = 0, carbs = 0, protein = 0, sugar = 0, fat = 0, sodium = 0) {
    this.key = key;
    this.quantity = quantity;
    this.unit = unit;
    this.calories = calories;
    this.serving = serving;
    this.expiry = expiry;
    this.isExpired = isExpired;
    this.carbs = carbs;
    this.protein = protein;
    this.sugar = sugar;
    this.fat = fat;
    this.sodium = sodium;

    this.toStrings = function() {
        return [
            this.key,
            this.quantity,
            this.unit,
            this.calories,
            this.serving,
            this.expiry,
            this.isExpired,
            this.carbs,
            this.protein,
            this.sugar,
            this.fat,
            this.sodium,
        ];
    };

	this.toSingleString = function() {
        var str = this.key + ","
				+ this.quantity + ","
				+ this.unit + ","
				+ this.calories + ","
				+ this.serving + ","
				+ this.expiry + ","
        + this.isExpired + ","
        + this.carbs + ","
        + this.protein + ","
        + this.sugar + ","
        + this.fat + ","
        + this.sodium;
		return str;
    };
}

export default Ingredient;
