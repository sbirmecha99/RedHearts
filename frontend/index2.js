// Function to populate state options
async function populateStates() {
  const stateSelect = document.getElementById('state');
  const response = await fetch('http://localhost:3000/api/states'); // Replace with your server's API endpoint
  const states = await response.json();

  states.forEach((state) => {
      const option = document.createElement('option');
      option.value = state.id;
      option.textContent = state.name;
      stateSelect.appendChild(option);
  });
}

// Handle city selection based on state
document.getElementById('state').addEventListener('change', async (event) => {
  const stateId = event.target.value;
  const citySelect = document.getElementById('city');
  citySelect.innerHTML = '<option value="" disabled selected>Select a city</option>';

  const response = await fetch(`http://localhost:3000/api/cities/${stateId}`); // Replace with your server's API endpoint
  const cities = await response.json();

  cities.forEach((city) => {
      const option = document.createElement('option');
      option.value = city.name;
      option.textContent = city.name;
      citySelect.appendChild(option);
  });
});

// Handle form submission
document.getElementById('recipient-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = {
      name: document.getElementById('name').value,
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      state: document.getElementById('state').selectedOptions[0].textContent,
      city: document.getElementById('city').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      blood_type: document.getElementById('blood-type').value,
      organ_required: document.getElementById('organ-required').value,
      medical_history: document.getElementById('medical-history').value,
  };

  // Send data to the server
  const response = await fetch('http://localhost:3000/api/recipients', { // Replace with your server's API endpoint
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
  });

  if (response.ok) {
      alert('Recipient registered successfully!');
   } 
   else {
      alert('There was an error registering the recipient.');
  }
});

// Initialize state and city dropdowns
populateStates();
