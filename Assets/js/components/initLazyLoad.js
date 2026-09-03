import lozad from "lozad";

const initLazyload = () => {
  const observer = lozad(".lazy", {
    rootMargin: "400px 0px",
  });
  observer.observe();

  // Manually load "loadnow" images immediately
  document.querySelectorAll(".loadNow").forEach((el) => {
    observer.triggerLoad(el);
  });
};

export default initLazyload;
