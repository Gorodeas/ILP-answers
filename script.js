// Get references to the form and response area
const form = document.getElementById('qa-form');
const questionInput = document.getElementById('question');
const responseDiv = document.getElementById('response');

// Handle form submission
form.addEventListener('submit', async function(event) {
  event.preventDefault(); // Prevent page reload

  const question = questionInput.value.trim();
  if (!question) {
    alert("Please enter a question.");
    return;
  }

  // Show the user's question and loading message
  responseDiv.style.display = 'block';
  responseDiv.innerHTML = `<p><strong>Your Question:</strong> ${question}</p>`;
  responseDiv.innerHTML += '<p>Loading AI response...</p>';

  try {
    // Call OpenAI API for the response
    const response = await getAIResponse(question);

    // Display AI response
    responseDiv.innerHTML = `<p><strong>AI Response:</strong></p><p>${response}</p>`;
  } catch (error) {
    responseDiv.innerHTML = '<p>There was an error processing your request. Please try again later.</p>';
    console.error(error);
  }
});

// Function to get AI response from OpenAI API
async function getAIResponse(question) {
  const apiKey = 'YOUR_OPENAI_API_KEY'; // Replace with your OpenAI API key

  const response = await fetch('https://api.openai.com/v1/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'text-davinci-003',  // You can use a different model like 'gpt-4' if preferred
      prompt: question,
      max_tokens: 150,
      temperature: 0.7,  // Controls the creativity of the answer (0 to 1)
    }),
  });

  const data = await response.json();
  return data.choices[0].text.trim();  // Return the answer from OpenAI
}
