import $ from "../../jquery-3.6.0.min";

$(function () {

  const sliderList = $(".site-slider");

  sliderList.each((i, slider) => {

    const imgUl =  $(".site-slider__image-list", slider);
    const bulletList = $(".site-slider__bullet", slider).get();
    const arrowLeft =  $(".site-slider__arrow_left", slider);
    const arrowRight = $(".site-slider__arrow_right", slider);

    let currentImage = 0;
    let lastImage = bulletList.length - 1;

    arrowLeft.attr("disabled", true);
    if(currentImage === lastImage) arrowRight.attr("disabled", true);


    arrowLeft.click(() => {

      $(bulletList[currentImage]).removeClass("site-slider__bullet_active");

      if(currentImage === lastImage) arrowRight.attr("disabled", false)
      currentImage--;
      if(currentImage === 0) arrowLeft.attr("disabled", true)

      $(bulletList[currentImage]).addClass("site-slider__bullet_active");
      imgUl.css("transform", `translateX(${-currentImage * 100}%)`);

    })

    arrowRight.click(() => {

      $(bulletList[currentImage]).removeClass("site-slider__bullet_active");

      if(currentImage === 0) arrowLeft.attr("disabled", false)
      currentImage++;
      if(currentImage === lastImage) arrowRight.attr("disabled", true)

      $(bulletList[currentImage]).addClass("site-slider__bullet_active");
      imgUl.css("transform", `translateX(${-currentImage * 100}%)`);
    })
  })
})