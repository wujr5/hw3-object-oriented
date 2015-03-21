// define the base class
// constructor
var Base = function(variable) {
    this.instanceVariable = variable || "Base";
}
// Base static method
Base.staticMethod = staticMethod;
function staticMethod() {
    console.log("This is from Base class static-method, static-variable is: " + this.staticVariable);
}

// Base instance method
Base.prototype.instanceMethod = instanceMethod;
function instanceMethod() {
    console.log("This is from Base class instance-method, instance-variable is: " + this.instanceVariable);
}
// Base static variable
Base.staticVariable = "Base";

// define derived class
var Derived = function(variable) {
    this.instanceVariable = variable || "Derived";
}
Derived.staticVariable = "Derived";
Derived.staticMethod = function() {
    console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
}
Derived.prototype.instanceMethod = function() {
    console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
}


// define the derived function
function extend(base, derived) {
    derived.prototype.instanceMethod = function() {
        // call base instance method
        base.prototype.instanceMethod.apply(this);
        console.log("This is from Derived class instance-method, instance-variable is: " + this.instanceVariable);
    }
    derived.staticMethod = function() {
        // call base static method
        base.staticMethod.apply(this);
        console.log("This is from Derived class static-method, static-variable is: " + this.staticVariable);
    }
}

extend(Base, Derived);