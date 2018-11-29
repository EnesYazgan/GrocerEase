function Ingredient(key, quantity, unit, calories, serving, expiry, isExpired, carbs, protein, sugar, fat, sodium) {
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
