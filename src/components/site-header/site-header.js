
import $ from "../../jquery-3.6.0.min";


$(function () {

  const siteNav =  $(".site-header__site-navigation");
  const bodyBlocker = $(".site-header__body-blocker");
  const body = $("body");
  const menuButton = $(".site-header__mob-menu-button_for-nav-menu");



  menuButton.click(function() {
    menuButton.toggleClass("site-header__mob-menu-button_for-nav-menu-close");
    siteNav.toggleClass("site-header__site-navigation_active");

    if(siteNav.hasClass("site-header__site-navigation_active"))
      body.css("overflow-y", "hidden");
    else
      body.css("overflow-y", "visible");
  })

  bodyBlocker.click(function () {
    body.css("overflow", "visible");
    menuButton.removeClass("site-header__mob-menu-button_for-nav-menu-close");
    siteNav.removeClass("site-header__site-navigation_active");
  })

  $(".site-header__nav-link_expanded").on("click touch", function (e) {
    if(siteNav.hasClass("site-header__site-navigation_active")) {
      e.preventDefault();
      $(e.currentTarget).next().slideToggle("fast");
    }
  })
})