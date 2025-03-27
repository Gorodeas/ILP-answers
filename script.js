document.getElementById('qa-form').addEventListener('submit', function(event) {
  event.preventDefault();  // Prevents the form from submitting and reloading the page
  
  const question = document.getElementById('question').value;
  if (!question) {
    alert("Please enter a question.");
    return;
  }
  
  // Display the question temporarily
  const responseDiv = document.getElementById('response');
  responseDiv.style.display = 'block';
  responseDiv.innerHTML = `<p><strong>Your Question:</strong> ${question}</p>`;
  
  // In the next step, we'll connect to the AI API to fetch the response.
  responseDiv.innerHTML += '<p>Loading AI response...</p>';
  
  // Here, we'll eventually add the AI call to fetch and display the real answer
});
