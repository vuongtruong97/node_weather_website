const weatherDetails = document.querySelector('.weather_details')
const inputSearch = document.querySelector('#searchInput')
const searchBtn = document.querySelector('.searchBtn')
let urlForeCast = 'http://localhost:3000/weather?address=ninh%20binh'
inputSearch.oninput = (e) => {
    if (e.target.value.length != 0) {
        searchBtn.removeAttribute('disabled')
    } else {
        searchBtn.setAttribute('disabled', 'disabled')
    }
}
inputSearch.onblur = (e) => {
    if (e.target.value.length != 0) {
        searchBtn.removeAttribute('disabled')
    } else {
        searchBtn.setAttribute('disabled', 'disabled')
    }
}
searchBtn.addEventListener('click', () => {
    weatherDetails.innerHTML = `<span>Loading...</span>`
    if (inputSearch.value.trim().length > 0) {
        fetch(
            `http://localhost:3000/weather?address=${encodeURIComponent(
                inputSearch.value
            )}`
        )
            .then((res) => {
                res.json().then((data) => {
                    if (data.error) {
                        return (weatherDetails.innerHTML = `<h2>${data.error}</h2>`)
                    }
                    weatherDetails.innerHTML = `<h2>Weather at :<b> ${data.location}</b></h2>
                                            <ul>
                                                <li>Temperature:<b> ${data.temp}  °C</b></li>
                                                <li>Humidity:<b> ${data.humidity} %</b></li>
                                                <li>Pressure:<b> ${data.pressure}  ba</b>r</li>
                                                <li>Visibility:<b> ${data.visibility} m</b></li>
                                                <li>Winspeed:<b> ${data.windspeed} m/s</b></li>
                                            </ul>`
                })
            })
            .catch((e) => {
                console.log(e)
            })
            .finally(() => {
                searchBtn.setAttribute('disabled', 'disabled')
                inputSearch.value = ''
            })
    }
})
