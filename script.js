window.addEventListener('load', () => {
    const form = document.querySelector(".top-banner form");
    const list = document.querySelector(".info-section ul");
    const msg = document.querySelector(".top-banner span");

    form.addEventListener("submit", e => {
        e.preventDefault();
        const apiRapidKey = 'fbb10966a1msh2eaefd940b13690p133c1ejsn8fd47dee2870';
        const input = form.querySelector('input')
        const inputVal = input.value;
        const url = `https://community-open-weather-map.p.rapidapi.com/weather?q=${inputVal}&units=metric`;


        fetch(url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': apiRapidKey,
                'x-rapidapi-host': `community-open-weather-map.p.rapidapi.com`
            }
        })
            .then(response => response.json())
            .then(data => {
                const { main, name, sys, weather } = data;
                const icon = `https://openweathermap.org/img/wn/${
                    weather[0]["icon"]
                }@2x.png`;

                const li = document.createElement("li");
                li.classList.add("city");
                li.innerHTML = `
      <h2 class="city-name" data-name="${name},${sys.country}">
        <span>${name}</span>
        <sup>${sys.country}</sup>
      </h2>
      <div class="city-temp">${Math.round(main['temp'])}<sup>°C</sup>
      </div>
      <figure>
        <img class="city-icon" src=${icon} alt=${weather[0]["main"]}>
        <figcaption>${weather[0]["description"]}</figcaption>
      </figure>
    `;
                list.appendChild(li);
            })
            .catch(() => {
                msg.textContent = "Please search for a valid city 😩";
            });
        msg.textContent = "";
        form.reset();
        input.focus();
    });

})




