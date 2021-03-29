// Here you can change your name
const name = 'Zoe';

window.onload = displayGreeting();

// Here you can change your greetings
function greet(hour) {
  if (hour < 5) {
    const qual = hour < 3 ? ' ' : ' the fuck ';
    return `Go${qual}to sleep!`;
  } else if (hour >= 6 && hour < 12) {
    return `Good morning, ${name}!`;
  } else if (hour >= 12 && hour < 18) {
    return `Good afternoon, ${name}`;
  } else {
    return `Good evening, ${name}`;
  }
}

function displayGreeting() {
  // Get the hour
  const today = new Date();
  const hour = today.getHours();
  
  // Define the hours of the greetings
  document.getElementById('greetings').innerText = greet(hour);
  
  setTimeout(displayGreeting, 1000 * 60 * 15); // refresh every 15 min
}
