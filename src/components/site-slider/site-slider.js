import $ from "../../jquery-3.6.0.min";

$(function () {

  const sliderList = $(".site-slider");

  sliderList.each((i, slider) => {

    const imgUl =  $(".site-slider__image-list", slider);
    const bulletList = $(".site-slider__bullet", slider).get();
    const buttonLeft =  $(".site-slider__button_left", slider);
    const buttonRight = $(".site-slider__button_right", slider);

    let currentImage = 0;
    let lastImage = bulletList.length - 1;

    buttonLeft.attr("disabled", true);
    if(currentImage === lastImage) buttonRight.attr("disabled", true);


    buttonLeft.click(() => {

      $(bulletList[currentImage]).removeClass("site-slider__bullet_active");

      if(currentImage === lastImage) buttonRight.attr("disabled", false)
      currentImage--;
      if(currentImage === 0) {
        buttonRight.focus();
        buttonLeft.attr("disabled", true)
      }

      $(bulletList[currentImage]).addClass("site-slider__bullet_active");
      imgUl.css("transform", `translateX(${-currentImage * 100}%)`);

    })

    buttonRight.click(() => {

      $(bulletList[currentImage]).removeClass("site-slider__bullet_active");

      if(currentImage === 0) buttonLeft.attr("disabled", false)
      currentImage++;
      if(currentImage === lastImage) {
        buttonLeft.focus();
        buttonRight.attr("disabled", true);
      }

      $(bulletList[currentImage]).addClass("site-slider__bullet_active");
      imgUl.css("transform", `translateX(${-currentImage * 100}%)`);
    })


  })
})