import AOS from "aos";

const initAOS = () => {
  AOS.init({
    duration: 500,
    easing: "ease",
    once: true,
    anchorPlacement: "center-bottom",
  });

    setTimeout(() => {
      AOS.refreshHard();
  }, 800);

  //setTimeout(function () {
  //  AOS.refresh();
  //}, 100);
};

export default initAOS;
