import $ from "../../jquery-3.6.0.min";

class RangeSlider {
  constructor(slider) {

    this.slider = $(slider);
    this.rangeInputs = $(".site-range-slider__input", this.slider).get();
    this.startRangeDisplay = $(".start-range", this.slider[0].parentElement);
    this.endRangeDisplay = $(".end-range", this.slider[0].parentElement);
    this.fill = $(".site-range-slider__fill", this.slider);

    $(this.rangeInputs[0]).on("input", this.setStartValue);
    $(this.rangeInputs[1]).on("input", this.setEndValue);
  }

  setStartValue = (e) => {
    //ширина слайдера минус место под кнопку - так же как и в стандартном инпуте
    const sliderWidth = this.slider.width()/2 - 16; // вынести за пределы функции, если не нужен адаптив для элементов формы
    const left = (e.currentTarget.value - e.currentTarget.min) / (e.currentTarget.max - e.currentTarget.min) * sliderWidth;

    this.startRangeDisplay[0].innerText = e.currentTarget.value;
    this.fill.css("left", left);
  }

  setEndValue = (e) => {
    const sliderWidth = this.slider.width()/2 - 16;
    const right = sliderWidth - ((e.currentTarget.value - e.currentTarget.min) / (e.currentTarget.max - e.currentTarget.min) *  sliderWidth);

    this.endRangeDisplay[0].innerText = e.currentTarget.value;
    this.fill.css("right", right );
  }

}


$(function(){

  const rangeSliderList = $(".site-range-slider");
  rangeSliderList.each((i, slider) => {new RangeSlider(slider)});

})
