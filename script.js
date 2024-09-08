let nav = document.querySelector('nav');
let welcome = document.querySelector(".welcome");
let welcomeCon = document.querySelector(".welcome-con");
let quote = document.querySelector(".span-header");
let learn = document.querySelector('.learn');
let allSections = document.querySelectorAll('.section');
let section1 = document.getElementById('section-1');
let mainSlider = document.querySelector('.main-slider');
let signUpButton = document.querySelectorAll('.sign-up-btn');
let cross = document.querySelector('.cross');
let form = document.querySelector('.form');
let overlay = document.querySelector('.overlay');

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

signUpButton.forEach(el => el.addEventListener('click', displaySignUpForm));
cross.addEventListener('click' , closeForm);

function displaySignUpForm(){
    overlay.style.display = 'block';
    form.style.display = 'block';
}

function closeForm(){
    overlay.style.display = "none";
    form.style.display = "none";
}

nav.addEventListener('mouseover' , (e) => {
    if(e.target.classList.contains('link')){
        let target = e.target.closest(".nav-middle").querySelectorAll("li");
        // console.log(target);
        target.forEach((el) => {
            if(el === e.target){
                return;
            }
            else{
                el.style.opacity = 0.5;
            }
        })
    }
})

nav.addEventListener('mouseout' ,(e) => {
    if(e.target.classList.contains('link')){
        let target = e.target.closest(".nav-middle").querySelectorAll("li");
        target.forEach(el => {
            el.style.opacity = 1;
        })
    }

})


function slideImg(){
    setTimeout(() => {
      document.querySelector(".section-1-right").classList.remove("hidden-plane-img");
    }, 300);
}

function slideText(){
    setTimeout(() => {
        welcome.classList.remove("hide-text");
    }, 200);
    setTimeout(() => {
       welcomeCon.style.margin = 0;
       welcomeCon.style.opacity = 1;
    }, 500);
    setTimeout(() => {
        quote.classList.remove('hide-text');
    }, 700);
    setTimeout(() => {
        learn.classList.remove('hide-text');
    }, 900);
}

function slideSections(entries,observer){
    let [entry] = entries;
    console.log(entry.target);
    console.log(entry.isIntersecting);
    if(entry.isIntersecting){
        entry.target.firstElementChild.classList.remove("section-hidden");
        observer.unobserve(entry.target);
    }
    else{
        return;
    }
}

function stickyNav(entries,observer){
    let [entry] = entries;
    if(!entry.isIntersecting){
        document.querySelector('.occupy-space').style.display = `block`;
        nav.classList.add('nav-sticky');
    }
    else{
        document.querySelector(".occupy-space").style.display = `none`;
        nav.classList.remove("nav-sticky");
    }
}

document.addEventListener('DOMContentLoaded', (e) => {
    slideImg();
    slideText();
    let year = new Date().getFullYear();
    document.querySelector('.year').textContent = year;
})

let sectionObserver = new IntersectionObserver(slideSections , {threshold: 0.07,root: null, rootMargin: `0px`});

allSections.forEach(section => sectionObserver.observe(section));
let footer = document.querySelector('footer');
function showFooter(entries,observer){
     let [entry] = entries;
     console.log(entry.target);
     console.log(entry.isIntersecting);
     if (entry.isIntersecting) {
       entry.target.classList.remove("section-hidden");
       observer.unobserve(entry.target);
     } else {
       return;
     }
}
let observefooter = new IntersectionObserver(showFooter, {
  threshold: 0.1,
  root: null,

});
observefooter.observe(footer);
let observeNav = new IntersectionObserver(stickyNav,{threshold:0,root:null , rootMargin: `-80px`});


function showDestinationsCard(entries , observer){
    let [entry] = entries;
    if(!entry.isIntersecting) return;
    document.querySelectorAll('.card').forEach(card => {
       if(card.classList.contains('greece-card')){
        setTimeout(() => {
            card.classList.remove('card-hidden');
        }, 400);
       }
       else{
        card.classList.remove("card-hidden");
       }
    })
    observer.unobserve(entry.target);
}

function showReviewsCard(entries,observer){
    let [entry] = entries;
    if (!entry.isIntersecting) return;
    document.querySelectorAll(".review-card").forEach((card) => {
      if (card.classList.contains("rating-card")) {
        setTimeout(() => {
          card.classList.remove("card-hidden");
        }, 400);
      } else {
        card.classList.remove("card-hidden");
      }
    });
    observer.unobserve(entry.target);
}


let observerCard = new IntersectionObserver(showDestinationsCard, {threshold: 0.1,root:null});
observerCard.observe(document.querySelector('.france-card'));

let observeReviewsCard = new IntersectionObserver(showReviewsCard, {
  threshold: 0.1,
  root: null,
});
observeReviewsCard.observe(document.querySelector('.years-card'));
observeNav.observe(section1);

nav.addEventListener('click' , (e) => {
    if(e.target.classList.contains('link')){
        if(e.target.textContent === 'greetings'){
            window.scrollTo({top:0,behavior:'smooth'});
        }
        else{
            let sectionAddress = e.target.getAttribute("href");
            console.log(sectionAddress);
            let sectionToScroll = document.querySelector("." + sectionAddress);
            sectionToScroll.scrollIntoView({ behavior: "smooth" });
        }
        
    }
    else{
        return;
    }
    
})

let buttonRight = document.querySelector('.arrow-hover-div-right');
let buttonLeft = document.querySelector('.arrow-hover-div');
let slides = document.querySelectorAll('.main-slider');
let currentSlide = 0;
let maxSlide = slides.length;

slides.forEach((slide,i) => {
    slide.style.transform = `translateX(${i * 120}%)`;
})

document.querySelector('.dot-0').classList.add('active-dot');

let dots = document.querySelectorAll('.dots span');

let dotsCon = document.querySelector('.dots');


function moveSlide(){
    slides.forEach((slide, i) => {
      slide.style.transform = `translateX(${120 * (i - currentSlide)}%)`;
    });
    dots.forEach((el) => {
      if (el.classList.contains(`dot-${currentSlide}`)) {
        el.classList.add("active-dot");
      } else {
        el.classList.remove("active-dot");
      }
    });
}


dotsCon.addEventListener('click' , (e) => {
    if(e.target.classList.contains('dot')){
        let slideNumber = e.target.dataset.slide;
        currentSlide = slideNumber;
        moveSlide();
    }
    else{
        return;
    }
})

buttonRight.addEventListener('click' , () => {
    if(currentSlide === maxSlide -1){
        currentSlide = 0;
    }
    else{
        currentSlide++;
    }
    moveSlide();
})

buttonLeft.addEventListener('click' ,() => {
    if(currentSlide === 0){
        currentSlide = maxSlide - 1;
    }
    else{
        currentSlide--;
    }
    moveSlide();
})