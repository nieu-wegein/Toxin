import $ from "../../jquery-3.6.0.min";

function toggleLike(e) {

  const counter = e.currentTarget.querySelector(".like-button__counter");

    if(e.currentTarget.classList.contains("like-button_active")) {
      $(e.currentTarget).removeClass("like-button_active");
      counter.innerText = parseInt(counter.innerText) - 1;
    }
    else {
      $(e.currentTarget).addClass("like-button_active");
      counter.innerText = parseInt(counter.innerText) + 1;
    }
}



$(function() {

  $(".like-site-button").each((i, button) => {
    $(button).click(toggleLike);
  })

})