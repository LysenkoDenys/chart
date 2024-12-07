const chartData = [
  { country: 'USA', gdp: 4353 },
  { country: 'China', gdp: 3432 },
  { country: 'India', gdp: 2900 },
];

const chartContainer = document.getElementById('chart');
const countryInput = document.getElementById('countryInput');
const gdpInput = document.getElementById('gdpInput');
const addDataButton = document.getElementById('addDataButton');

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const renderChart = () => {
  chartContainer.innerHTML = ''; //clear previous chart
  const maxGdp = Math.max(...chartData.map((data) => data.gdp)); //find max value of GDP

  chartData.forEach((data) => {
    //create a column
    const bar = document.createElement('div');
    bar.classList.add('bar');
    bar.style.backgroundColor = getRandomColor();
    bar.style.height = '0'; //start height of animation to raise above

    //add GDP:
    const value = document.createElement('span');
    value.textContent = `${data.gdp}`;
    bar.appendChild(value);

    //add country:
    const label = document.createElement('div');
    label.textContent = data.country;
    label.classList.add('label');
    bar.appendChild(label);

    //add a new bar:
    chartContainer.appendChild(bar);

    //animation of bar height:
    setTimeout(() => {
      bar.style.height = `${(data.gdp / maxGdp) * 100}%`;
    }, 100);
  });
};

const addData = () => {
  const country = countryInput.value.trim();
  const gdp = parseInt(gdpInput.value.trim(), 10);
  if (country && !isNaN(gdp)) {
    chartData.push({
      country,
      gdp,
    });
    renderChart();
    countryInput.value = '';
    gdpInput.value = '';
  } else {
    alert('Please enter valid country name and GDP');
  }
};

addDataButton.addEventListener('click', addData);

renderChart();
