(function(obj){
	obj = Object.getOwnPropertyDescriptor(obj);
	Object.defineProperties(Array.prototype, obj);
})({
	/**
	 * clone an array
	 * we use "for" instead of "slice" and "push.apply" because it's faster
	 */
	clone : function(){
		var lst	= [];
		for(var i = 0, len = this.length; i < len; ++i)
			lst.push(this[i]);
		return lst;
	},

	/**
	 * get first element that matches a condition
	 * @param {function} 	condition 	desired condition
	 * @param {int} 		index 		optional start index
	 * @param {int} 		lastIndex 	optional last index
	 */
	first	: function(condition, index = 0, lastIndex){
		var len	= this.length;
		if(len > 0){
			if(arguments.length === 0)
				return this[0];
			else {
				if(arguments.length > 2 && lastIndex < len) len = lastIndex + 1;
				if(index < 0) throw new Error('incorrect index: ' + index);
				for(;index < len; ++index){
					if(condition(this[index], index, this) === true)
						return this[index];
				}
			}
		}
	},

	/**
	 * get the last element that matches a condition
	 * @param {function} condition desired condition
	 * @param {int} index last index
	 */
	last	: function(condition, beginIndex = 0, lastIndex){
		var len	= this.length - 1;
		if(len > -1){
			if(arguments.length === 0)
				return this[len];
			else {
				if(lastIndex && lastIndex <= len) len = lastIndex;
				if(beginIndex < 0) throw new Error('incorrect index: ' + index);
				for(var i = len; i >= beginIndex; i--){
					if(condition(this[i], i, this))
						return this[i];
				}
			}
		}
	},
	/**
	 * each
	 */
	each	: function(cb){
		for(var i=0, len = this.length; i < len; ++i){
			if(cb(this[i], i) === false)
				break;
		}
		return this;
	},
	/** remove all elemnts */
	clear	: function(){
		this.splice(0);
		return this;
	},
	get unique(){
		return this.filter((ele, indx) => {
			return this.indexOf(ele) === indx;
		});
	},

	eq	: function(index){
		if(index < 0){
			index += this.length;
			if(index < 0) return undefined;
		}
		return this[index];
	}
});

// contains
Object.defineProperties(Array.prototype, {
	contains	: {value: Array.prototype.includes},
	has			: {value: Array.prototype.includes},
	duplicate	: {value: Array.prototype.clone}
})

// Array.from(arrayLikeElement, mapFunction)
// Array.copyWithin
// Array.fill
// 
// 
// every
// some
// 
// reverse
// sort
// concat
// splice
// 
// map
// reduce
// reduceRight
// 
// indexOf
// join
// lastIndexOf
// slice
// 
// entries
// filter
// find
// findIndex
// 
// forEach