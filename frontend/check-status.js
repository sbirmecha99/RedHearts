document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        dob: document.getElementById('dob').value,
    };

    try {
        const response = await fetch('http://localhost:3000/api/check-status', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();

        // ✅ Check if data is valid before accessing properties
        if (!data || !data.match || !Array.isArray(data.match) || data.match.length === 0) {
            document.getElementById('match-details').innerHTML = `<p>No match found.</p>`;
        } else {
            document.getElementById('match-details').textContent = JSON.stringify(data.match, null, 2);
        }

        document.getElementById('match-result').style.display = 'block';

    } catch (error) {
        console.error('Error:', error);
        document.getElementById('match-details').innerHTML = `<p>Error fetching match data.</p>`;
    }
});
