// const scroll = new LocomotiveScroll({
//   el: document.querySelector("#main"),
//   smooth: true,
// });

function locomotiveAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}

function navAnimation() {
  gsap.to("nav .part1 svg,.navh1", {
    transform: "translateY(-100%)",
    scrollTrigger: {
      trigger: ".page1",
      scroller: "#main",
      markers: false,
      start: "top 0%",
      end: "top -5%",
      scrub: true,
    },
  });

  gsap.to("nav .part2 h6", {
    transform: "translateY(-100%)",
    opacity: 0,
    scrollTrigger: {
      trigger: ".page1",
      scroller: "#main",
      markers: false,
      start: "top 0%",
      end: "top -5%",
      scrub: true,
    },
  });
}

function videoconAnimation() {
  let videocon = document.querySelector(".video-container");
  let play = document.querySelector(".play");

  videocon.addEventListener("mouseenter", function () {
    gsap.to(play, { opacity: 1, scale: 1 });
  });

  videocon.addEventListener("mouseleave", function () {
    gsap.to(play, { opacity: 0, scale: 0 });
  });

  videocon.addEventListener("mousemove", function (e) {
    gsap.to(play, { left: e.x - 80, top: e.y - 80 });
  });
}

function loadingAnimation() {
  let tl = gsap.timeline();
  tl.from("nav", {
    y: -20,
    duration: 0.3,
    opacity: 0,
  });
  tl.from(".text h1", {
    delay: 0.3,
    y: 80,
    opacity: 0,
    duration: 0.6,
    stagger: 0.2,
  });

  tl.from(".video-container", {
    scale: 1.1,
    duration: 0.4,
    opacity: 0,
  });
}

function cursorAnimation() {
  document.addEventListener("mousemove", function (e) {
    gsap.to("#cursor", {
      x: e.x,
      y: e.y,
    });
  });

  document.querySelectorAll(".page3 .child").forEach((elem) => {
    elem.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(1)",
      });
    });
    elem.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        transform: "translate(-50%,-50%) scale(0)",
      });
    });
  });
}

videoconAnimation();
loadingAnimation();
cursorAnimation();
locomotiveAnimation();
navAnimation();
