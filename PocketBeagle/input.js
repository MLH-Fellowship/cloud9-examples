#!/usr/bin/env node
////////////////////////////////////////
//	input.js
//      Responds to changes on P1_33 via a callback.
//	Wiring:	Connect P1_33to P1_36 with a 1kOhm resistor.
//	Setup:	
//	See:	
////////////////////////////////////////
const b = require('bonescript');

const outputPin = "P1_36";
const inputPin  = "P1_33";
const ledPin    = "USR3";
const mydelay = 100;
var state = b.LOW;

console.log('Please connect ' + inputPin + ' to ' + outputPin +
    ' with a 1kOhm resistor');
b.pinMode(inputPin, b.INPUT);
b.pinMode(outputPin, b.OUTPUT);
b.pinMode(ledPin, b.OUTPUT);

b.digitalWrite(outputPin, b.LOW);
b.attachInterrupt(inputPin, setLED, b.CHANGE);

toggle();

function setLED(x) {
    b.digitalWrite(ledPin, x.value);
}

function toggle() {
    state = (state == b.LOW) ? b.HIGH : b.LOW;
    b.digitalWrite(outputPin, state);
    setTimeout(toggle, mydelay);
}
