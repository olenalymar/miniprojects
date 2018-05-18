// Listen for submit

document.getElementById('loan-form').addEventListener('submit', function(e) {
	// Hide results
	document.getElementById('results').style.display = 'none';

	// Show loader
	document.getElementById('loading').style.display = 'block';

	setTimeout(calculateResults, 800)

	e.preventDefault();
});


// Calculate results

function calculateResults(e) {
	console.log('Calculating...');
	// UI variables
	const 	UIamount = document.getElementById('amount'),
			UIinterest = document.getElementById('interest'),
			UIyears = document.getElementById('years'),
			UImonthlyPayment = document.getElementById('monthly-payment'),
			UItotalPayment = document.getElementById('total-payment'),
			UItotalInterest = document.getElementById('total-interest');

	const 	principal = parseFloat(UIamount.value),
			calculatedInterest = parseFloat(UIinterest.value) / 100 / 12,
			calculatedPayments = parseFloat(UIyears.value) * 12;

	// Compute monthly payments
	const 	x = Math.pow(1 + calculatedInterest, calculatedPayments),
			monthly = (principal * x * calculatedInterest) / (x - 1);


	if (isFinite(monthly)) {
		UImonthlyPayment.value = monthly.toFixed(2);
		UItotalPayment.value = (monthly * calculatedPayments).toFixed(2);
		UItotalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
		// Show results
		document.getElementById('results').style.display = 'block';
		// Hide loading
		document.getElementById('loading').style.display = 'none';
	} else {
		console.log('Please check your numbers');
		showError('Please check your numbers');
	}
}



// Show error

function showError(error) {
	// Hide results, loading
	document.getElementById('results').style.display = 'none';
	document.getElementById('loading').style.display = 'none';

	// Create a div
	const errorDiv = document.createElement('div');

	// Get elements
	const 	UIcard = document.querySelector('.card'),
			UIheading = document.querySelector('.heading')

	// Adding class to the div
	errorDiv.className = 'alert alert-danger';

	// Adding text
	errorDiv.appendChild(document.createTextNode(error));

	// Insert error above heading
	UIcard.insertBefore(errorDiv, UIheading);

	// Clear error after 3 seconds
	setTimeout(clearError, 2000);
}


// Clear error

function clearError() {
	document.querySelector('.alert').remove();
}