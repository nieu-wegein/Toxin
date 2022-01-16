import $ from "../../jquery-3.6.0.min";

$(function () {

  const roomCards = $(".room-card");

  roomCards.each((i, card) => {

   const imgUl =  $(".room-card__image-list", card);
   const bulletList = $(".room-card__bullet", card).get();
   const arrowLeft =  $(".room-card__arrow_left", card);
   const arrowRight = $(".room-card__arrow_right", card);

   let imageWidth = 271;
   let currentImage = 0;
   let lastImage = bulletList.length - 1;

    arrowLeft.attr("disabled", true);
    if(currentImage === bulletList.length - 1) arrowRight.attr("disabled", true);


   arrowLeft.click(() => {

     $(bulletList[currentImage]).removeClass("room-card__bullet_active");

     if(currentImage === lastImage) arrowRight.attr("disabled", false)
     currentImage--;
     if(currentImage === 0) arrowLeft.attr("disabled", true)

     $(bulletList[currentImage]).addClass("room-card__bullet_active");
     imgUl.css("transform", `translateX(${-currentImage * imageWidth}px)`);

   })

   arrowRight.click(() => {

     $(bulletList[currentImage]).removeClass("room-card__bullet_active");

     if(currentImage === 0) arrowLeft.attr("disabled", false)
     currentImage++;
     if(currentImage === lastImage) arrowRight.attr("disabled", true)

     $(bulletList[currentImage]).addClass("room-card__bullet_active");
     imgUl.css("transform", `translateX(${-currentImage * imageWidth}px)`);
   })
  })
})