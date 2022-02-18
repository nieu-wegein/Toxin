import "../../../normalize.scss";
import './index.scss'
import "../../../components/site-header/site-header";
import "../../../components/search-block/search-block";
import $ from "../../../jquery-3.6.0.min";


$(function () {

    const calendar = $(".site-calendar");

    calendar[0].objectModel.initState({
        today: new Date("2019, 8, 8")
    })

})

