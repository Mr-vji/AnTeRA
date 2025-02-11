window.onload = function () {
  // Gallery Animation
  const items = document.querySelectorAll(".item");
  const containerr = document.querySelector(".containerr");
  const spans = document.querySelectorAll(".hero-copy .hover-target");
  const numberOfItems = items.length;
  const angleIncrement = (2 * Math.PI) / numberOfItems;
  const radius = 200;
  let currentAngle = 0;
  let isMouseOverSpan = false;
  let targetX = containerr.getBoundingClientRect().width / 2;
  let targetY = containerr.getBoundingClientRect().height / 2;
  let currentX = targetX;
  let currentY = targetY;

  const imagePaths = {
    1: ["./images/img1.jpg", "./images/img2.jpg", "./images/img3.jpg", "./images/img4.jpg", "./images/img5.jpg", "./images/img6.jpg"],
    2: ["./imgTe/1.jpg", "./imgTe/2.jpg", "./imgTe/3.jpg", "./imgTe/4.jpg", "./imgTe/5.jpg", "./imgTe/6.jpg"],
    3: ["./imgRa/1.jpg", "./imgRa/2.jpg", "./imgRa/3.jpg", "./imgRa/4.jpg", "./imgRa/5.jpg", "./imgRa/6.jpg"]
  };

  const loadImagesForSpan = (spanIndex) => {
    const paths = imagePaths[spanIndex];
    items.forEach((item, index) => {
      const img = item.querySelector("img");
      if (img) {
        img.src = paths[index];
        img.alt = `Image ${spanIndex}_${index + 1}`;
      } else {
        let newImg = document.createElement("img");
        newImg.src = paths[index];
        newImg.alt = `Image ${spanIndex}_${index + 1}`;
        item.appendChild(newImg);
      }
    });
  };

  const updateGallery = (show = true) => {
    items.forEach(function (item, index) {
      const angle = currentAngle + index * angleIncrement;
      const x = currentX + radius * Math.cos(angle) - item.offsetWidth / 2;
      const y = currentY + radius * Math.sin(angle) - item.offsetHeight / 2;

      gsap.to(item, {
        x: x,
        y: y,
        opacity: show ? 1 : 0,
        duration: 0.5,
        ease: "power1.out"
      });
    });
  };

  spans.forEach((span) => {
    span.addEventListener("mouseenter", (e) => {
      isMouseOverSpan = true;
      const spanIndex = span.getAttribute("data-target");
      loadImagesForSpan(spanIndex);
      targetX = e.clientX - containerr.getBoundingClientRect().left;
      targetY = e.clientY - containerr.getBoundingClientRect().top;
      updateGallery(true);
    });

    span.addEventListener("mousemove", (e) => {
      if (isMouseOverSpan) {
        targetX = e.clientX - containerr.getBoundingClientRect().left;
        targetY = e.clientY - containerr.getBoundingClientRect().top;
      }
    });

    span.addEventListener("mouseleave", () => {
      isMouseOverSpan = false;
      targetX = containerr.getBoundingClientRect().width / 2;
      targetY = containerr.getBoundingClientRect().height / 2;
      updateGallery(false);
    });
  });

  gsap.ticker.add(() => {
    currentAngle += 0.005;
    if (currentAngle > 2 * Math.PI) {
      currentAngle -= 2 * Math.PI;
    }
    if (isMouseOverSpan) {
      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;
    } else {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;
    }
    updateGallery(isMouseOverSpan);
  });

const body = document.body;
const sectionOne = document.querySelector("#SectionOneV");
const sectionTwo = document.querySelector("#sectionThreeV");
const sectionThree = document.querySelector("#sectionThreeV");

const sectionOneTop = sectionOne.offsetTop;
const sectionTwoTop = sectionTwo.offsetTop;
const sectionThreeTop = sectionThree.offsetTop;
const sectionTwoHeight = sectionTwo.offsetHeight;
const sectionThreeHeight = sectionThree.offsetHeight;
const viewportHeight = window.innerHeight;

function checkScroll() {
  const scrollPosition = window.scrollY;

  // Dark theme from SectionOneV to SectionThreeV
  if (scrollPosition >= sectionOneTop - viewportHeight / 2 &&
      scrollPosition < sectionThreeTop + sectionThreeHeight - viewportHeight / 2) {
    body.classList.add("dark-theme", "leftSideBar", "blg-bg", "border-block", "white-hover" , "onceagin",);
    body.classList.remove("light-theme");
  } else {
    body.classList.remove("dark-theme", "leftSideBar", "blg-bg", "border-block", "white-hover" , "onceagin",);
  }

  // Light theme from SectionTwoV to SectionThreeV
  if (scrollPosition >= sectionTwoTop - viewportHeight / 2 &&
      scrollPosition < sectionThreeTop + sectionThreeHeight - viewportHeight / 2) {
    body.classList.add("light-theme");
  } else {
    body.classList.remove("light-theme");
  }

  // Background color change from black to white between sectionTwoV and sectionThreeV
  if (scrollPosition >= sectionTwoTop && scrollPosition < sectionThreeTop) {
    const progress = (scrollPosition - sectionTwoTop) / (sectionThreeTop - sectionTwoTop);
    const colorValue = Math.round(255 * progress);
    body.style.backgroundColor = `rgb(${colorValue}, ${colorValue}, ${colorValue})`;
  } else if (scrollPosition < sectionTwoTop) {
    body.style.backgroundColor = "black";
  } else if (scrollPosition >= sectionThreeTop) {
    body.style.backgroundColor = "white";
  }
}

window.addEventListener("scroll", checkScroll);







// gsap.fromTo(".hero-copy p span", 
//   { color: "white" }, 
//   { 
//     color: "black",
//     scrollTrigger: {
//       trigger: "#sectionThreeV",
//       start: "top bottom", 
//       end: "bottom top", 
//       scrub: true, 
//       onLeave: () => {
//         gsap.to(".hero-copy p span", { color: "white" });
//       },
//       onEnterBack: () => {
//         gsap.to(".hero-copy p span", { color: "black" });
//       }
//     }
//   }
// );

// gsap.fromTo("#KAB", 
//   { color: "white" }, 
//   { 
//     color: "black",
//     scrollTrigger: {
//       trigger: "#sectionThreeV",
//       start: "top bottom", // Start animation when bottom of #sectionThreeV reaches top of viewport
//       end: "bottom top", // End animation when top of #sectionThreeV reaches top of viewport
//       scrub: true, // Make the color change smoothly as you scroll
//       onLeave: () => {
//         gsap.to(".hero-copy p span", { color: "white" });
//       },
//       onEnterBack: () => {
//         gsap.to(".hero-copy p span", { color: "black" , opacity: "100px"});
//       }
//     }
//   }
// );
























  // GSAP Animations
  gsap.registerPlugin(ScrollTrigger);
  gsap.from(".image-box", {
    duration: 0.75, 
    opacity: 0, 
    ease: "power4.out",
    stagger: 0.3, 
    scrollTrigger: {
      trigger: ".image-box", 
      start: "top 80%",
      end: "bottom top", 
      toggleActions: "play none none none", 
      markers: false 
    }
  });

  gsap.from('.wrapper', {
    opacity: 0,
    duration: 1,
    stagger: 0.2 ,
    scrollTrigger:{
      trigger: '.wrapper',
      start: "top 70%",
      toggleActions: "play none none none"
    }
  });



  gsap.from("#welH", {
      duration: 1,
      opacity: 0,
      y: 0,
      scrollTrigger: {
          trigger: "#welH",
          start: "top 80%",
          toggleActions: "play none none none"
      }
  });















  gsap.from("#paraP p", {
      duration: 1,
      opacity: 0,
      y: 0,
      stagger: 0.2,
      scrollTrigger: {
          trigger: "#paraP",
          start: "top 80%",
          toggleActions: "play none none none"
      }
  });

  gsap.from(".pill-item", {
      duration: 1,
      opacity: 0,
      x: 900,
      stagger: 0.2,
      scrollTrigger: {
          trigger: "#pillSection",
          start: "top 80%",
          toggleActions: "play none none none"
      }
  });


  


















  // 3D Gallery with Mouse and Scroll
  
  const galleryContainer = document.querySelector(".galleryd");
  const previewImage = document.querySelector(".preview-img img");
  const titleContainer = document.querySelector(".title-container");

  const titles = ['Biryani', 'Mutton Curry', 'Cocktail', 'Coconut Water', 'Prawn Masala', 'Chicken', 'Chettinad Chicken', 'Tandoori Chicken', 
    'Kesari', 'Upma', 'AnTer', 
    // 'Mushroom Manchurian', 
    'Mushroom ', 
    'Non-Veg', 'chicken wings', 'Biryani', 'Ragi Mudde ', 'Chicken Briyani', 'Mutton Biryani', 'fried chicken', ];
  

  document.addEventListener("mousemove", function (event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const percentX = (mouseX - centerX) / centerX;
    const percentY = (mouseY - centerY) / centerY;

    const rotationX = 55 + percentY * 2;
    const rotationY = percentX * 2;

    gsap.to(galleryContainer, {
      duration: 1,
      ease: "power2.out",
      rotateX: rotationX,
      rotateY: rotationY,
      overwrite: "auto",
    });
  });

  for (let i = 0; i < 70; i++) {
    const item = document.createElement("div");
    item.className = "vji";
    const img = document.createElement("img");
    img.src = "./vji/img" + ((i % 19) + 1) + ".jpg";
    img.setAttribute("title", titles[i % titles.length]); // Set the title attribute
    item.appendChild(img);
    galleryContainer.appendChild(item);
  }

  const galleryItems = document.querySelectorAll(".vji");
  const totalItems = galleryItems.length;
  const angleStep = 360 / totalItems;

  galleryItems.forEach((item, index) => {
    gsap.set(item, {
      rotationY: 90,
      rotationZ: index * angleStep - 90,
      transformOrigin: "50% 400px",
    });

    item.addEventListener("mouseover", function () {
      const imgInsideItem = item.querySelector("img");
      previewImage.src = imgInsideItem.src;
      titleContainer.textContent = imgInsideItem.getAttribute("title"); // Set the title text
      titleContainer.style.display = "block"; // Show the title container

      gsap.to(item, {
        x: 10,
        z: 10,
        y: 10,
        ease: "power2.out",
        duration: 0.5,
      });
    });

    item.addEventListener("mouseout", function () {
      previewImage.src = "./Dishes/Dish-1.jpg";
      titleContainer.style.display = "none"; // Hide the title container

      gsap.to(item, {
        x: 0,
        y: 0,
        z: 0,
        ease: "power2.out",
        duration: 0.5,
      });
    });
  });

  ScrollTrigger.create({
    trigger: "body",
    start: "top top",
    end: "bottom bottom",
    scrub: 2,
    onRefresh: setupRotation,
    onUpdate: (self) => {
      const rotationProgress = self.progress * 360;
      galleryItems.forEach((item, index) => {
        const currentAngle = index * angleStep - 90 + rotationProgress;
        gsap.to(item, {
          rotationZ: currentAngle,
          duration: 0.12,
          ease: "power3.out",
          overwrite: "auto",
        });
      });
    },
  });
};

function setupRotation() {};







