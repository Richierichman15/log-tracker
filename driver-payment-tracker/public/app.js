document.getElementById('paymentDate').valueAsDate = new Date();

async function loadPayments() {
    try {
        const response = await fetch('/api/payments');
        const payments = await response.json();
        displayRecords(payments);
    } catch (error) {
        console.error('Error loading payments:', error);
    }
}

async function addRecord() {
    const driverName = document.getElementById('driverName').value;
    const amount = document.getElementById('amount').value;
    const paymentDate = document.getElementById('paymentDate').value;
    
    if (!driverName || !amount || !paymentDate) {
        alert('Please fill in all fields');
        return;
    }

    const record = { driverName, amount: parseFloat(amount), paymentDate };

    try {
        const response = await fetch('/api/payments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(record)
        });

        if (response.ok) {
            clearForm();
            loadPayments();
        } else {
            alert('Error saving payment');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error saving payment');
    }
}

function clearForm() {
    document.getElementById('driverName').value = '';
    document.getElementById('amount').value = '';
    document.getElementById('paymentDate').valueAsDate = new Date();
}

function displayRecords(payments) {
    const recordsDiv = document.getElementById('records');
    recordsDiv.innerHTML = '';

    if (payments.length === 0) {
        recordsDiv.innerHTML = '<p>No records found</p>';
        return;
    }

    payments.forEach(record => {
        const paymentDate = new Date(record.paymentDate);
        const formattedDate = paymentDate.toLocaleDateString();
        
        const recordElement = document.createElement('div');
        recordElement.className = 'record';
        recordElement.innerHTML = `
            <p><strong>Driver:</strong> ${record.driverName}</p>
            <p><strong>Amount:</strong> $${record.amount}</p>
            <p><strong>Payment Date:</strong> ${formattedDate}</p>
            <p><strong>Recorded:</strong> ${getTimeAgo(new Date(record.timestamp))}</p>
        `;
        recordsDiv.appendChild(recordElement);
    });
}

function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";
    
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";
    
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";
    
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";
    
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";
    
    return Math.floor(seconds) + " seconds ago";
}

loadPayments();