import ready from "./utils";

import initAOS from "./components/initAOS";
import initFormHandler from "./components/initFormHandler";
import initLazyLoad from "./components/initLazyLoad";
import initMiscellaneous from "./components/initMiscellaneous";
import initNavigation from "./components/initNavigation";
import initSlider from "./components/initSlider";
import initSocialShare from "./components/initSocialShare";
import initGallery from "./components/initGallery";

ready(() => {
  initAOS();
  initMiscellaneous();
  initFormHandler();
  initNavigation();
  initSlider();
  initSocialShare();
  initGallery();

  initLazyLoad();
});
