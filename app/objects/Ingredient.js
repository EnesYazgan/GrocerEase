function Ingredient(key, quantity, unit, calories, serving, expiry, isExpired) {
    this.key = key;
    this.quantity = quantity;
    this.unit = unit;
    this.calories = calories;
    this.serving = serving;
    this.expiry = expiry;
    this.isExpired = isExpired;

    this.toStrings = function() {
        return [
            this.key,
            this.quantity,
            this.unit,
            this.calories,
            this.serving,
            this.expiry,
            this.isExpired
        ];
    };

	this.toSingleString = function() {
        var str = this.key + ","
				+ this.quantity + ","
				+ this.unit + ","
				+ this.calories + ","
				+ this.serving + ","
				+ this.expiry + ","
        + this.isExpired;
		return str;
    };
}

export default Ingredient;
