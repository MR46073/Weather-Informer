const cityForm = document.querySelector('form'); //Here we could have used the class change-location, but since there is a single form on the entire page we are using the form directly here.

const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

const updateUi = (data) => {
    
    //const cityDets = data.cityDets;
    //const weather = data.weather;
    console.log(data);

    // Destructure way

    const {cityDets, weather} = data;

    // update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDets.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `;

    if(card.classList.contains('d-none')){
        card.classList.remove('d-none');
    }
    
    // Update day & night And icon images
    
    const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
    icon.setAttribute('src', iconSrc);
    
    let timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';

    time.setAttribute('src', timeSrc);

};


const updateCity = async (city) => {

    const cityDets = await getCity(city); //getting the city details from the api website according to what city keywords we have entered.
    const weather = await getWeather(cityDets.Key);//getting the weather details of the city we want by taking that city's Key as parameter and giving us weather info of that city.

    return {cityDets, weather};
    // So the cityDets is basically city details (dets is shortfrm for details) AND weather is weather details. We converted them to objects here. Originally they were in json form.

};

cityForm.addEventListener('submit', e => {

    e.preventDefault();

    const city = cityForm.city.value.trim();
    cityForm.reset();

    updateCity(city)
        .then(data => updateUi(data))
        .catch(err => console.log(err));

}); //the data mentioned here is whatever we are returning in the updateCity function i.e. the object converted data.