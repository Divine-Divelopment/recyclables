const myFunction = function (input) {
	console.log('input changed')
	document.getElementById('weight-range').value = input.value
	input.value = input.value + 'кг'
}

const myFunction2 = function (input) {
	console.log(input.value)
	document.getElementById('weight').value = input.value + 'кг'
}

window.addEventListener("load", function() {
	console.log("It woerks!")
});

