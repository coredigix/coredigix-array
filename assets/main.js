/**
 * extend for array
 */

function ArrayUtils(array){
	if(new.target)
		throw new Error('unsupported operator "new"');
	else if(Array.isArray(array)){
		Object.setPrototypeOf(array, ArrayUtilsFactory.prototype);
	}
	else throw new Error('The given argument is not an array.');
	return array;
}

class ArrayUtilsFactory extends Array{

	/**
	 * clone an array
	 * we use "for" instead of "slice" and "push.apply" because it's faster
	 */
	clone(){
		var lst	= new arrayUtils();
		for(var i = 0, len = this.length; i < len; ++i)
			lst.push(this[i]);
		return lst;
	}
	/**
	 * get first element that matches a condition
	 * @param {function} 	condition 	desired condition
	 * @param {int} 		index 		optional start index
	 * @param {int} 		lastIndex 	optional last index
	 */
	first(condition, index = 0, lastIndex){
		var len	= this.length;
		if(len > 0){
			if(arguments.length === 0)
				return this[0];
			else {
				if(lastIndex && lastIndex < len) len = lastIndex + 1;
				if(index < 0) throw new Error('incorrect index: ' + index);
				while(index < len){
					if(condition(this[index], index, this))
						return this[index];
					++index;
				}
			}
		}
	}
	/**
	 * get the last element that matches a condition
	 * @param {function} condition desired condition
	 * @param {int} index last index
	 */
	last(condition, beginIndex = 0, lastIndex){
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
	}

	/** contains */
	contains(ele){ return this.indexOf(ele) !== -1; }

	push(){super.push.apply(this, arguments); return this;}
	unshift(){super.unshift.apply(this, arguments); return this;}

	/**
	 * each
	 */
	each(cb){
		for(var i=0, len = this.length; i < len; ++i){
			if(cb(this[i], i) === false)
				break;
		}
		return this;
	}

	/** remove all elemnts */
	clear(){
		this.splice(0);
		return this;
	}
}

Object.defineProperties(ArrayUtils.prototype, {
	contains	: {value: Array.prototype.includes},
	has			: {value: Array.prototype.includes},
	duplicate	: {value: ArrayUtils.prototype.clone}
})

// instanceof
ArrayUtils.prototype = ArrayUtilsFactory.prototype;

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