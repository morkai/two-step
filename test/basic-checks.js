var assert = require("assert");

module.exports = {
	save: function(stepObj, args) {
		stepObj.data[stepObj._params.name] = { when: Date.now(), args: Array.prototype.slice.call(args) };
	},
	coverage: function(names) {
		return function(data) {
			names.forEach(function(name) { assert.ok(data[name], name + " not executed"); });
		};
	},
	order: function(names) {
		return function(data) {
			for(var i = 1; i < names.length; i++) {
				var nameA = names[i - 1], nameB = names[i];
				assert.ok(data[nameA] != null, "Unknown function name: '" + nameA + "'");
				assert.ok(data[nameB] != null, "Unknown function name: '" + nameB + "'");
				assert.ok(data[nameA].when <= data[nameB].when, nameA + " was not called before " + nameB);
			}
		};
	},
	emptyArgs: function(name) {
		return function(data) {
			assert.ok(data[name] != null, "Unknown function name: '" + name + "'");
			assert.equal(data[name].args.length, 0, name + " didn't have empty args");
		};
	}
}
