function Ingredient(key, quantity, unit, calories, serving, expiry) {
    this.key = key;
    this.quantity = quantity;
    this.unit = unit;
    this.calories = calories;
    this.serving = serving;
    this.expiry = expiry;

    this.toStrings = function() {
        return [
            this.key,
            this.quantity,
            this.unit,
            this.calories,
            this.serving,
            this.expiry
        ];
    };
	
	this.toSingleString = function() {
        var str = this.key + "," 
				+ this.quantity + "," 
				+ this.unit + "," 
				+ this.calories + ","
				+ this.serving + ","
				+ this.expiry;
		return str;
    };
}

export default Ingredient;