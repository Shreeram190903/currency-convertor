URL = "https://latest.currency-api.pages.dev/v1/currencies/eur.json"
let btn = document.querySelector(".btn");
let dropdowns = document.querySelectorAll(".dropdown select");
let input = document.querySelector("input");
let fromCur = document.querySelector(".from select");
let toCur = document.querySelector(".to select");
let msg = document.querySelector(".msg");
let change = document.querySelector("#change");

// Adding optins to dropdown
for(let select of dropdowns){
    for(code in countryList){
        let newOption = document.createElement("option");
        newOption.value = code;
        newOption.innerText = currencyNames[code];
        if(select.name === "from" && code === "USD"){
            newOption.selected = "selected";
        }
        else if(select.name === "to" && code === "INR"){
            newOption.selected = "selcted";
        }
        select.append(newOption);
    }

    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

//Upadteing the flag
const updateFlag = (element)=>{
    let currCode = element.value;
    let currCountry = countryList[currCode];

    newSrc = `https://flagsapi.com/${currCountry}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}


//fetching currency values through fetch api keeping EUR as base
const getcurrency = async (country) =>{
    const response = await fetch(URL);
    console.log(response);
    const data = await response.json();
    return data.eur[country];
}

const updateValue = async (evt) =>{

if(input.value < 0 || input.value === "")
        input.value = 1;
    let inputVal = input.value;

    let fromVal = await getcurrency(fromCur.value.toLowerCase());
    let toVal = await getcurrency(toCur.value.toLowerCase());
    let rate = (toVal/fromVal);
    console.log("rate ", rate);

    let totalVal = (inputVal*rate).toFixed(2);
    msg.innerText = `${inputVal} ${fromCur.value} = ${totalVal} ${toCur.value}`;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateValue(evt);
});

change.addEventListener("click",()=>{
    let from = fromCur.value;
    let to = toCur.value;
    fromCur.value = to;
    updateFlag(fromCur);
    toCur.value = from;
    updateFlag(toCur);
});

window.addEventListener("load",updateValue);

