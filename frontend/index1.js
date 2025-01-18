async function populateStates() {
    const stateSelect = document.getElementById('state');
    const response = await fetch('http://localhost:3000/api/states');
    const states = await response.json();
  
    states.forEach((state) => {
      const option = document.createElement('option');
      option.value = state.id;
      option.textContent = state.name;
      stateSelect.appendChild(option);
    });
  }
  
  document.getElementById('state').addEventListener('change', async (event) => {
    const stateId = event.target.value;
    const citySelect = document.getElementById('city');
    citySelect.innerHTML = '<option value="" disabled selected>Select a city</option>';
  
    const response = await fetch(`http://localhost:3000/api/cities/${stateId}`);
    const cities = await response.json();
  
    cities.forEach((city) => {
      const option = document.createElement('option');
      option.value = city.name;
      option.textContent = city.name;
      citySelect.appendChild(option);
    });
  });
  
  document.getElementById('submit-btn').addEventListener('click', async (e) => {
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
      medical_history: document.getElementById('medical-history').value,
      organ_to_donate: document.getElementById('organ-to-donate').value,
      smoke: document.getElementById('smoke').value,
      alcohol: document.getElementById('alcohol').value,
    };
  
    const response = await fetch('http://localhost:3000/api/donors', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
  
    if (response.ok) alert('Donor registered successfully!');
  });
  
  // Initialize dropdowns
  populateStates();
  