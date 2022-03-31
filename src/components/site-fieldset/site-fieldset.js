import $ from "../../jquery-3.6.0.min";

$(function() {
  const legends = $(".site-fieldset__legend_expanding")

  legends.click((e)=> {
    $(e.currentTarget.nextElementSibling).toggleClass("site-fieldset__area_collapsed site-fieldset__area_expanded");
    $(e.currentTarget).toggleClass("site-fieldset__legend_expanding-reverse");
  })

  legends.keydown((e)=> {
    if(e.which === 32 || e.which === 13)
      $(e.currentTarget).click();
  })
})