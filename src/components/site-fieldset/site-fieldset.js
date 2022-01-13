import $ from "../../jquery-3.6.0.min";

$(function() {
  $(".site-fieldset__legend_expand").click((e)=> {
    $(e.currentTarget.nextElementSibling).toggleClass("site-fieldset__area_shrunk site-fieldset__area_expanded");
    $(e.currentTarget).toggleClass("reverse");
  })
})