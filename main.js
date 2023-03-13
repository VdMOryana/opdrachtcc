import './reset.css'
import './style.css'

// core version + navigation, pagination modules:
import Swiper, { Navigation, Pagination } from 'swiper';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// init Swiper:
new Swiper('.swiper', {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],

   // Optional parameters
   direction: 'horizontal', // Richting van swiper
   loop: true, // In een loop of niet, true blijft de loop doorspelen, false gaat de loop van links naar rechts. 
 
   // If we need pagination
   pagination: {
     el: '.swiper-pagination', 
     clickable: true,
   },
 
   // Navigation arrows
   navigation: {
     nextEl: '.swiper-button-next',
     prevEl: '.swiper-button-prev',
   },
});


const access_token = 'pk.eyJ1Ijoia2Fkb2xva28iLCJhIjoiY2xhZHhubnQ4MHBnMzN2czRxdGU4cWlqeCJ9.hY63krJm59IMxZhuIHHOQA';

// Coördinaten van de locatie die je wilt omzetten in een adres
let lngLat = [4.438573, 51.2086011];

async function reverseGeocode() {
  try {
    // Loader element toevoegen
    document.querySelector('#loader').style.display = 'block';

    // Omgekeerde geocodeerfunctie aanroepen
    const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat[0]},${lngLat[1]}.json?access_token=${access_token}`);
    const data = await response.json();

    // Adresgegevens ophalen uit de respons
    let feature = data.features[0];
    let address = feature.place_name;

    // Het adres vervangen met line-breaks
    document.querySelector('#address').innerHTML = address.replace(/,/g, '<br>');

    // Loader element verbergen
    document.querySelector('#loader').style.display = 'none';
  } catch (error) {
    console.log(error);
  }
}
reverseGeocode();