/*==================================================
            MOBILE MENU
==================================================*/

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if(menuToggle){

menuToggle.addEventListener("click",()=>{

navLinks.classList.toggle("active");

});

}

document.querySelectorAll(".nav-links a").forEach(link=>{

link.addEventListener("click",()=>{

navLinks.classList.remove("active");

});

});

/*==================================================
            DARK MODE
==================================================*/

const themeToggle=document.getElementById("themeToggle");

if(localStorage.getItem("theme")==="dark"){

document.body.classList.add("dark");

themeToggle.innerHTML='<i class="ri-sun-line"></i>';

}

themeToggle.addEventListener("click",()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

themeToggle.innerHTML='<i class="ri-sun-line"></i>';

}

else{

localStorage.setItem("theme","light");

themeToggle.innerHTML='<i class="ri-moon-line"></i>';

}

});

/*==================================================
        ACTIVE NAVBAR
==================================================*/

const sections=document.querySelectorAll("section");

const navItems=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const sectionTop=section.offsetTop-120;

const sectionHeight=section.clientHeight;

if(pageYOffset>=sectionTop){

current=section.getAttribute("id");

}

});

navItems.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});

/*==================================================
            SCROLL REVEAL
==================================================*/

const observer=new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.15});

document.querySelectorAll(

".section,.project-card,.skill-box,.certificate-card,.achievement-card,.experience-card,.contact-card"

).forEach(el=>{

el.classList.add("fade-up");

observer.observe(el);

});

/*==================================================
            SCROLL TOP
==================================================*/

const scrollBtn=document.getElementById("scrollTop");

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

scrollBtn.classList.add("show");

}else{

scrollBtn.classList.remove("show");

}

});

scrollBtn.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});

/*==================================================
            LOADER
==================================================*/

window.addEventListener("load",()=>{

setTimeout(()=>{

const loader=document.getElementById("loader");

loader.style.opacity="0";

loader.style.visibility="hidden";

},800);

});

/*==================================================
        VLSI / EMBEDDED MODE
==================================================*/

const vlsiBtn=document.getElementById("vlsiBtn");

const embeddedBtn=document.getElementById("embeddedBtn");

const role=document.getElementById("roleTitle");

const hero=document.getElementById("heroDescription");

const about=document.getElementById("aboutDescription");

const objective=document.getElementById("careerObjective");

const resume1=document.getElementById("resumeButton");

const resume2=document.getElementById("resumeButton2");

function activateVLSI(){

vlsiBtn.classList.add("active");

embeddedBtn.classList.remove("active");

role.innerHTML="VLSI Design Engineer";

hero.innerHTML=

"Passionate about RTL Design, FPGA Development, Digital Electronics, Verilog, SystemVerilog and Design Verification.";

about.innerHTML=

"I am passionate about VLSI Design, RTL Development, FPGA Implementation and Digital Electronics. I enjoy designing efficient hardware architectures and solving engineering challenges.";

objective.innerHTML=

"To secure an opportunity in the semiconductor industry where I can contribute to RTL Design, FPGA Development and Digital Circuit Design.";

resume1.href="resume_vlsi.pdf";

resume2.href="resume_vlsi.pdf";

}

function activateEmbedded(){

embeddedBtn.classList.add("active");

vlsiBtn.classList.remove("active");

role.innerHTML="Embedded Systems Engineer";

hero.innerHTML=

"Passionate about Embedded Systems, ESP32, Embedded C, IoT, PCB Design and Sensor Interfacing.";

about.innerHTML=

"I enjoy building intelligent embedded systems using ESP32, Arduino, sensors and communication protocols like UART, SPI and I2C.";

objective.innerHTML=

"To work as an Embedded Systems Engineer where I can design reliable firmware and hardware solutions.";

resume1.href="resume_embedded.pdf";

resume2.href="resume_embedded.pdf";

}

vlsiBtn.addEventListener("click",activateVLSI);

embeddedBtn.addEventListener("click",activateEmbedded);

/*==================================================
        TYPING EFFECT
==================================================*/

const typing=document.getElementById("roleTitle");

const roles=[

"VLSI Design Engineer",

"Embedded Systems Engineer",

"FPGA Developer",

"RTL Design Engineer"

];

let roleIndex=0;

function typingAnimation(){

typing.style.opacity="0";

setTimeout(()=>{

typing.innerHTML=roles[roleIndex];

typing.style.opacity="1";

roleIndex++;

if(roleIndex>=roles.length){

roleIndex=0;

}

},400);

}

setInterval(typingAnimation,3500);

/*==================================================
        STICKY NAVBAR
==================================================*/

window.addEventListener("scroll",()=>{

const navbar=document.querySelector(".navbar");

if(window.scrollY>80){

navbar.style.boxShadow="0 10px 30px rgba(0,0,0,.08)";

}

else{

navbar.style.boxShadow="none";

}

});

/*==================================================
        CONTACT FORM SUCCESS
==================================================*/

const form=document.querySelector("form");

if(form){

form.addEventListener("submit",()=>{

alert("Thank you! Your message has been sent.");

});

}

/*==================================================
                END
==================================================*/
