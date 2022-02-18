import "../../../normalize.scss";
import './search-results.scss';
import "../../../components/site-header/site-header";
import '../../../components/rooms-filter-menu/rooms-filter-menu';
import "../../../components/room-card/room-card";
import $ from "../../../jquery-3.6.0.min";


$(function () {

    const dropdownList = $(".site-dropdown_counting-dropdown").get();

    dropdownList[0].objectModel.initState({
        adults: 2,
        children: 1,
        babies: 1
    });

    dropdownList[1].objectModel.initState({
        beds: 2,
        bedrooms: 2,
        bathrooms: 1
    });

    const calendar = $(".site-calendar");

    calendar[0].objectModel.initState({
        today: new Date("2019, 8, 8")
    });
    calendar[0].objectModel.chooseStartDate(19).chooseEndDate(23)


    const aside = $(".search-results__aside");
    const body = $("body");
    const bodyBlocker = $(".search-results__body-blocker");
    const asideOpenBtn = $(".search-results__aside-open-button");
    const asideCloseBtn = $(".search-results__aside-close-button");

    asideOpenBtn.click(function () {
        aside.addClass("search-results__aside_active");
        body.css("overflow", "hidden");
    })

    asideCloseBtn.click(function () {
        aside.removeClass("search-results__aside_active");
        body.css("overflow", "visible");
    })

    bodyBlocker.click(function () {
        aside.removeClass("search-results__aside_active");
        body.css("overflow", "visible");
    })

})

