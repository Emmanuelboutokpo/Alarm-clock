let clock = document.querySelector(".clock");
let inputs = document.querySelectorAll("input");
let forms = document.querySelector("form");
let upcoming =document.querySelector(".upcoming")
let stopAlarm = document.querySelector(".rset");

let containerTimes = [];
let isAlarms;
let ringTones = new Audio("./files/nokia_6760_tune.mp3")
let ring_for_alarm = false;

const showHorloge = () => {
     let dates = new Date();
     let hours = dates.getHours() < 10 ? "0"+dates.getHours():dates.getHours();
     let minutes = dates.getMinutes() < 10 ? "0"+dates.getMinutes():dates.getMinutes();
     let seconds = dates.getSeconds() < 10 ? "0"+dates.getSeconds():dates.getSeconds();
     let horg = `${hours}:${minutes}:${seconds}`
     clock.innerHTML= horg;

     let isHere = containerTimes.includes(horg)
    if (isHere) {
        ringTones.play();
        ringTones.loop = true;
    }  
}
setInterval(showHorloge, 1000);

forms.addEventListener("submit", (e) =>{
    e.preventDefault();
    stopAlarm.addEventListener("click", (e) =>{
         clearInterval(showHorloge);
         ringTones.pause();
    });

    let times = `${(inputs[0].value<10 &&(inputs[0].value.length !=2)  ? "0"+ inputs[0].value:inputs[0].value)}:${inputs[1].value<10  &&(inputs[1].value.length !=2) ? "0"+ inputs[1].value:inputs[1].value}:${inputs[2].value<10  &&(inputs[2].value.length !=2) ? "0"+ inputs[2].value:inputs[2].value}`
    isDupplicate = containerTimes.includes(times)
    if (inputs[0].value=="" || inputs[1].value=="" ||inputs[2].value =="") {
        alert("Inputs is empty !")
    }  else if(isDupplicate){
        alert("L'alarm already existe")
        forms.reset();
    } else { 
        containerTimes.push(times);
        showTimes()              
       forms.reset();
    }
 })
    
const showTimes = () =>{
    upcoming.innerHTML = containerTimes.map((alarm_item,index) =>{
        isAlarms = alarm_item;
        return  `
        <li>${alarm_item}<i onclick="deleteClock(${index})">&times;</i></li>
        `
    }).join(" ")
}

const deleteClock = (index) =>{
     containerTimes.splice(index,1);
     showTimes()
     ringTones.pause();
}
 