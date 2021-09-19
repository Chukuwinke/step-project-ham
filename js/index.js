const tabs = document.querySelector(".tabs");
const tabItems = document.querySelectorAll(".tabs__title")
const workButton = document.getElementById('work__btn')
const galleryButton = document.getElementById('gallery__btn')
const workImgContainer = document.querySelector(".work-tabs-img__container");
let newsContainer = document.querySelector('.breaking-news')
let linkName;

$(".services-tabs-content li").first().css("display", "flex");
$(".services-tabs__title").first().addClass("tab-active");
$(".services-tabs__title").click(function () {
  $(".services-tabs__title.tab-active").removeClass("tab-active");
  $(this).addClass("tab-active");
  linkName = $(this).attr("data-tab-switch");
  $(".services-tabs-content li").css("display", "none");
  $("#" + linkName).css("display", "flex ");
});

fetch("pictures.json")
  .then((response) => response.json())
  .then((data) => {
    let links = Object.values(data.images);
    let blogs = Object.values(data.articles)
    //console.log(blogs)
    //function to populate work image container with images
    const imageBox = (links, imgItems) => {
      if (document.contains(imgItems)) {
        document.querySelectorAll(".work__img").forEach((e) => e.remove());
      }
      links.forEach((element) => {
        let image = document.createElement("img");
        image.setAttribute("src", element);
        image.className += "work__img";
        workImgContainer.appendChild(image);
      });
    };
    const tabSwitcher = (links, target) => {
      let imgItems = document.querySelector(".work__img");
      let linkTab = target.getAttribute("data-work-tab");

      target.style.border ='2px solid #18CFAB '

      if (linkTab == "all") {
        let linkArr = [];
        links.map((item) => item);
        const ellinks = [...links];
        let currentItems = 0;
        for (let i = currentItems; i < currentItems + 12; i++) {
          linkArr.push(ellinks[i].url);
        }
        imageBox(linkArr, imgItems);
        workButton.style.display ='initial'
      } else {
        let filteredLinks = links
          .filter((items) => items.category == linkTab)
          .map((item) => item.url);
        imageBox(filteredLinks, imgItems);
        workButton.style.display ='none'
      }
    };

    //WORK SECTION
    // clicking a button targets one of the tabs
    tabItems[0].style.border ='2px solid #18CFAB '
    tabs.onclick = (event) => {
      let target = event.target;
      tabItems.forEach(element => {
        element.style.border =''
        
      });
      if (target.className != "tabs__title") return;
      tabSwitcher(links, target);
    };

    let allTabDefaultArr = [];
    let allDefaultImgs = [...links.map((item) => item)];
    let currentItems = 0;
    for (let i = currentItems; i < currentItems + 12; i++) {
      allTabDefaultArr.push(allDefaultImgs[i].url);
    }
    currentItems += allTabDefaultArr.length
    
    allTabDefaultArr.forEach((element) => {
      let image = document.createElement("img");
      image.setAttribute("src", element);
      image.className += "work__img";
      workImgContainer.appendChild(image);
    });

    workButton.onclick = (event) => {
      let loadedDefaultArr = [];
      for (let i = currentItems; i < currentItems + 12; i++) {
          loadedDefaultArr.push(allDefaultImgs[i].url)
        console.log(currentItems)
      }
      loadedDefaultArr.forEach(element => {
        let image = document.createElement("img");
        image.setAttribute("src", element);
        image.className += "work__img";
        workImgContainer.appendChild(image);
      });
      currentItems += loadedDefaultArr.length
      if(currentItems >= 24){
        event.target.style.display = 'none'
        currentItems = 12
      }
      
    }
    
    // breaking news
    //console.log(blogs.author)
    blogs.map(blog => {
      const newsWrapper = document.createElement('div')
      newsWrapper.className = 'breaking-news__card'
      newsWrapper.innerHTML =`
        <img src="${blog.url}" alt="" class="breaking-news__img">
        <div class="breaking-news__info">
          <h3 class="breaking-news__title">${blog.title}</h3>
          <p class="breaking-news__text">${blog.author}<span class="breaking-news__author"></span>${blog.commentsNo} comment</p>
        </div>
        `
      newsContainer.appendChild(newsWrapper)
    })

  })
  .catch((error) => console.log(error));

  //GALLERY SECTION
  galleryButton.onclick = (event) => {
    let galleryItems = 8;
    const galleryContainer = document.querySelector('.gallery__img-container')
    const elementList = [...document.querySelectorAll('.gallery .gallery__item')]
    for (let i = galleryItems; i< galleryItems + 4; i++){
      if (elementList[i]){
        galleryContainer.style.height = '1500px'
        elementList[i].style.display ='initial'
      }
    }
    galleryItems += 4;

    if (galleryItems >= elementList.length){
      event.target.style.display = 'none'
    }
  }

  // feedback logic
let sliderThumbnails = document.querySelectorAll('.slider-thumbnail');
let sliderContent = document.querySelectorAll('.feedback-container')
let arrowLeft = document.getElementById('arrow-left')
let arrowRight = document.getElementById('arrow-right')
let current = 0;
  const reset = () => {
   sliderContent.forEach(element => {
    if (element.classList.contains("feedback-active")) {
      element.classList.remove("feedback-active");
    }
    
   });
   sliderThumbnails.forEach(element => {
     element.style.position = ''
   })
  }
  const initialContent = () => {
    reset();
    sliderContent[0].classList.add("feedback-active");
    sliderThumbnails[0].style.position = 'relative'
    sliderThumbnails[0].style.bottom = '15px'
  }
  const slideLeft = () =>{
    reset();
    sliderContent[current - 1].classList.add("feedback-active");
    sliderThumbnails[current - 1].style.position = 'relative'
    sliderThumbnails[current - 1].style.bottom = '15px'
    current--;
    console.log('left')

  }
  const slideRight = () =>{
    reset();
    sliderContent[current +1].classList.add("feedback-active");
    sliderThumbnails[current + 1].style.position = 'relative'
    sliderThumbnails[current + 1].style.bottom = '15px'
    current++;
    console.log('right')

  }

  arrowRight.onclick = () => {
    if(current === sliderThumbnails.length - 1){
      current = -1;
    }
    slideRight();
  }
  arrowLeft.onclick = () => {
    if(current === 0){
      current = sliderThumbnails.length;
      
    }
    
    slideLeft();
  }
  initialContent();


