window.onload = function() {
    fetch('cities.json')
        .then(response => response.json())
        .then(data => {
            const renoLat = 39.5296;
            const renoLon = -119.8138;
            data.forEach(city => {
                city.distance = calculateDistance(renoLat, renoLon, city.latitude, city.longitude);
            });
            displayCities(data);
        });
};

function displayCities(cities) {
    const table = document.getElementById('citiesTable');
    cities.forEach(city => {
        const row = table.insertRow(-1);
        row.insertCell(0).innerText = city.city;
        row.insertCell(1).innerText = city.latitude;
        row.insertCell(2).innerText = city.longitude;
        row.insertCell(3).innerText = city.distance.toFixed(2);
    });
}

function sortCities(order) {
    const table = document.getElementById('citiesTable');
    let rows, switching, i, x, y, shouldSwitch;
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[3];
            y = rows[i + 1].getElementsByTagName("TD")[3];
            if ((order === 'asc' && parseFloat(x.innerHTML) > parseFloat(y.innerHTML)) || 
                (order === 'desc' && parseFloat(x.innerHTML) < parseFloat(y.innerHTML))) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
