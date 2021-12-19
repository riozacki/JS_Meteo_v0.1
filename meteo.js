// je crée une variable dans laquelle je stocke la base de l'url de l'api
const url = "https://www.prevision-meteo.ch/services/json/";
let btnOK = document.getElementById('ok');
let input = document.getElementById('city');
let display = document.getElementById('display');
let jsonData ;

//Variable json
//json = file_get_contents('https://www.prevision-meteo.ch/services/json/toulouse');
// je fais une fonction de requete de l'api
function requestApi(event){
    event.preventDefault();
    //je récupère l'input de la ville
    const city = document.querySelector("form input[name='city']");
    console.log(city.value); // à commenter plus tard
    // je fais l'envoie de la requete en concaténant la base url avce la valeur de la city
    fetch(`${url}${city.value}`)
        //quand j'obtient une reponse je met le body en json
        .then(response => response.json())
        // puis je traite les données reçues
        .then(data => {
            console.log('sucess:', data);
            jsonData = data;
            console.log(jsonData);

            displayMeteo(jsonData);
            //to do plus tard
        })
        // en cas d'erreur je lève une exeecption et j'affiche l'erreur
        .catch((error) => {
            console.error('Error:', error);
        })
}
btnOK.addEventListener('click',event => {
    event.preventDefault();
    requestApi(event);
    console.log(jsonData);
});

// Fonction d'affichge
function displayMeteo (jsonData){
    //Création d'un tableau tableau contenant les data de chaque jour
    let arrayDay = [];
    arrayDay.push(jsonData.fcst_day_1, jsonData.fcst_day_2, jsonData.fcst_day_3, jsonData.fcst_day_4);
    console.log(arrayDay);
    //Boucles pour creer et afficher les éléments 
    for (let i=0; i<arrayDay.length; i++){
    
        let titreAll = document.createElement('h2');
        titreAll.textContent =`La météo pour ${jsonData.city_info.name}, ${jsonData.city_info.country}, ${[i]}`;
        display.appendChild(titreAll);

        let dayAll = document.createElement("h3"); 
        dayAll.textContent = ` ${arrayDay[i].day_long}`;
        display.appendChild(dayAll);  

        let iconAll = document.createElement('img');
        iconAll.setAttribute('src', `${jsonData.current_condition.icon_big}`) ;
        display.appendChild(iconAll);  
        
        let tempAll = document.createElement('h3');
        tempAll.textContent = `Température: ${jsonData.current_condition.tmp}°`;
        display.appendChild(tempAll);

        let tempMinMax = document.createElement("h3"); 
        tempMinMax.innerHTML = `Température minimale: ${arrayDay[i].tmin},<br/> Temperature maximale: ${arrayDay[i].tmax}`;
        display.appendChild(tempMinMax);
        
        let conditionAll = document.createElement("h3"); 
        conditionAll.textContent = `Condition: ${arrayDay[i].condition}`;
        display.appendChild(conditionAll);
        
        let iconeAll = document.createElement('img');
        iconeAll.setAttribute('src', `${arrayDay[i].icon}`) ;
        display.appendChild(iconeAll);

        let heure = document.createElement('h3');
        
        heure.innerHTML = `Heure :${arrayDay[i].hourly_data['1H00']} `;
        display.appendChild(heure);
        console.log(heure);

        const plusieurHeures = arrayDay[i].hourly_data;
        let dplus = document.createElement('h3');

        dplus.textContent = plusieurHeures;  
        display.appendChild(dplus);  
        //const arrayHours = [];  
        //arrayHours.push(arrayDay[i].hourly_data);
        //console.log(arrayHours); 
        console.log(plusieurHeures);
    }

/*

function displayHours(jsonData){
    let arrayHours = [];
    arrayHours.push(jsonData.fcst_day_1.hourly_data["0H00"], jsonData.fcst_day_2.hourly_data["0H00"], jsonData.fcst_day_3.hourly_data["0H00"],jsonData.fcst_day_4.hourly_data["0H00"]);
    console.log(arrayHours);

    }  

*/

    //Variables documents
    let day = document.createElement("h3"); 
    let titre = document.createElement('h2');
    let icon = document.createElement('img');
    let dateHeure = document.createElement('h3');
    let temp = document.createElement('h3');
    let condition = document.createElement('h3');
    let pressionHum = document.createElement('h3');
    
    //Récupération des données
    day.textContent = `${jsonData.fcst_day_0.day_long}`;
    icon.setAttribute('src', `${jsonData.current_condition.icon_big}`) ;
    titre.textContent =`La météo pour ${jsonData.city_info.name}, ${jsonData.city_info.country}`;
    dateHeure.innerHTML =  `Date: ${jsonData.current_condition.date},<br/> Heure: ${jsonData.current_condition.hour}`;
    temp.textContent = `Température: ${jsonData.current_condition.tmp}°`;
    condition.textContent = `Condition: ${jsonData.current_condition.condition}`;
    pressionHum.innerHTML =`Pression: ${jsonData.current_condition.pressure},<br/> Humidité: ${jsonData.current_condition.humidity}`;
    
    //Affichage
    display.appendChild(titre);
    display.appendChild(day);
    display.appendChild(icon);
    display.appendChild(dateHeure);
    display.appendChild(temp);
    display.appendChild(condition);
    display.appendChild(pressionHum);
}

