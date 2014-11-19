function Object(){
	this.oo = 1;
}

Object.prototype = {
	create: function(o) {
        function F() {}
        F.prototype = o;
        return new F();
    }
};


module.exports = Object; 