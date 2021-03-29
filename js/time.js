window.onload = displayClock();
function displayClock() {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = [
    'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
  ];

  // Set to true to use a 12 hour date format
  var format_12hour = false;

  var d = new Date();
  var wkd = dayNames[d.getDay()] + ',';
  var mm = monthNames[d.getMonth()];
  var dd = d.getDate();
  var min = (mins = ('0' + d.getMinutes()).slice(-2));
  var hh = ('0' + d.getHours()).slice(-2);
  var ampm = '';

  if (format_12hour) {
    ampm = hh >= 12 ? ' pm' : ' am';
    hh = hh % 12;
    hh = hh ? hh : 12; //show mod 0 as 12
  }

  document.getElementById('hour').innerText = hh;
  document.getElementById('separator').innerHTML = ' : ';
  document.getElementById('minutes').innerText = min + ampm;

  document.getElementById('wkd').innerText = wkd;
  document.getElementById('month').innerText = mm;
  document.getElementById('day').innerText = dd;

  setTimeout(displayClock, 1000);
}
