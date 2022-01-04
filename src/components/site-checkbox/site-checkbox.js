import $ from "../../jquery-3.6.0.min";

//TODO: Перенести в form-element

$(function() {
  $(".form-element__legend_expand").click((e)=> {
    $(e.currentTarget.nextElementSibling).toggleClass("form-element_shrunk form-element_expanded");
    $(e.currentTarget).toggleClass("reverse");
  })
})