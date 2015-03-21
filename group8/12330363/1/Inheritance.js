// NO WAY.
// DON'T KNOW HOW TO HANDLE PROTOTPYAL INHERITANCE!!

// Class Base
var Base = function(v) {
  this.instanceVariable = v;
  this.instanceMethod = function() {
    console.log("This is from Base class instance-method, " +
      "instance-variable is: " + this.instanceVariable);
  };
};
Base.staticVariable = "Base";
Base.staticMethod = function() {
  console.log("This is from Base class static-method, " +
    "static-variable is: " + this.staticVariable);
};
Base.prototype = {
  staticVariable: Base.staticVariable,
  staticMethod: Base.staticMethod
}

// Class Derived
var Derived = function(v) {
  this.instanceVariable = v;
  this.instanceMethod = function() {
    console.log("This is from Derived class instance-method, " +
      "instance-variable is: " + this.instanceVariable);
  };
};
Derived.staticVariable = "Derived";
Derived.staticMethod = function() {
  console.log("This is from Derived class static-method," +
    " static-variable is: " + this.staticVariable);
};

// extending
function extend(base, derived) {
  derived.prototype.__proto__ = base.prototype;
}
