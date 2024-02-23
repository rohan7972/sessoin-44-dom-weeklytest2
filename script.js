async function fetchData() {
  try {
    const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

async function renderData() {
  const data = await fetchData();
  const tableBody = document.querySelector('#dataTable tbody');

  data.forEach((coin, index) => {
    const row = tableBody.insertRow();
    const priceChangeColor = coin.price_change_percentage_24h > 0 ? 'green' : 'red';

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <img src="${coin.image}" alt="${coin.name}" style="width: 20px; height: 20px;">
        ${coin.name}
      </td>
      <td>${coin.symbol.toUpperCase()}</td>
      <td>$${coin.current_price.toFixed(2)}</td>
      <td style="color: ${priceChangeColor};">${coin.price_change_percentage_24h.toFixed(2)}%</td>
      <td>${coin.total_volume}</td>
    `;
  });
}

renderData();

