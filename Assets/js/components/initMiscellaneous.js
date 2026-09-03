import { screenWidth } from "../helpers";
import AOS from "aos";

const initMiscellaneous = () => {
  function matchHeights() {
    const allMatches = document.querySelectorAll(".matchLineHeights");

    const allowMobile =
      window.innerWidth < 992 &&
      Array.from(allMatches).some((el) =>
        el.classList.contains("includeMobile"),
      );

    if (window.innerWidth >= 992 || allowMobile) {
      AOS.refresh();

      const ignoreParents = [];
      const grouped = {};

      allMatches.forEach((el) => {
        if (el.classList.contains("ignoreParents")) {
          ignoreParents.push(el);
          return;
        }

        const parent = el.parentElement;
        const parentKey =
          parent.dataset.matchId || Math.random().toString(36).substring(2);

        parent.dataset.matchId = parentKey;

        if (!grouped[parentKey]) grouped[parentKey] = [];
        grouped[parentKey].push(el);
      });

      allMatches.forEach((el) => (el.style.height = "auto"));

      Object.values(grouped).forEach((group) => {
        const maxHeight = Math.max(...group.map((el) => el.offsetHeight));
        group.forEach((el) => (el.style.height = maxHeight + "px"));
      });

      if (ignoreParents.length > 0) {
        const maxHeight = Math.max(
          ...ignoreParents.map((el) => el.offsetHeight),
        );
        ignoreParents.forEach((el) => (el.style.height = maxHeight + "px"));
      }
    } else {
      allMatches.forEach((el) => (el.style.height = "auto"));
    }
  }

  matchHeights();

  document.querySelectorAll("img.lazy").forEach((img) => {
    img.addEventListener("load", () => matchHeights());
    img.addEventListener("lazyloaded", () => matchHeights());
  });

  window.addEventListener("load", () => matchHeights());

  //Back to top

  let backToTop = document.querySelector(".backToTop");

  if (backToTop) {
    window.addEventListener("scroll", backTop);

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    function backTop() {
      var offsetHeight = document.body.offsetHeight;

      if (
        document.documentElement.scrollTop > 150 &&
        window.innerHeight + Math.round(window.scrollY) >=
          offsetHeight - offsetHeight * 0.7
      ) {
        backToTop.classList.add("active");
      } else if (document.documentElement.scrollTop <= 150) {
        backToTop.classList.remove("active");
      }
    }
  }

  // Smooth scroll to sections with ID

  const animateScroll = function (target) {
    if (target) {
      const elementPosition =
        target.getBoundingClientRect().top + window.pageYOffset - 150;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const hash = window.location.hash.substring(1);
  if (hash) {
    const targetElement = document.getElementById(hash);
    animateScroll(targetElement);
  }

  // Dynamic word resizing
  const resizeDynamicWords = function () {
    document.querySelectorAll(".fit-word").forEach((el) => {
      const parent = el.parentElement;

      if (!parent) return;

      const maxFont = 112;
      el.style.fontSize = maxFont + "px";

      const availableWidth =
        parent.clientWidth -
        parseFloat(getComputedStyle(parent).paddingLeft) -
        parseFloat(getComputedStyle(parent).paddingRight);

      const actualWidth = el.scrollWidth;

      if (actualWidth > availableWidth) {
        const scale = availableWidth / actualWidth;
        const newSize = Math.floor(maxFont * scale);
        el.style.fontSize = newSize + "px";
      }
    });
  };

  resizeDynamicWords();

  let resizeTimeout;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      matchHeights();
      resizeDynamicWords();

      AOS.refresh();
    }, 200);
  });
};

export default initMiscellaneous;
