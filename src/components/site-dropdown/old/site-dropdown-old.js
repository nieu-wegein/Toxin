import $ from '../../../jquery-3.6.0.min';

window.jQuery = $;
window.$ = $;

//TODO: () -> function

const toogleList = (list) => {
    return function () {
        $(this).toggleClass("site-dropdown__header_square");
        list.toggle();
    }
}

const hideList = (header, list) => {
    return function (e) {
        if ($(this).has(e.relatedTarget).length === 0) {
            header.removeClass("site-dropdown__header_square");
            list.hide();
        }
    }
}

const setHeaderText = function (header) {

    const textArea = $(".text-area", header)
    const defaultText = header.data("text")
    const state = {}

    return function (item, add) {

        const declination = item.data("declination");
        let text = "";
        if (!state[declination]) state[declination] = 0;

        if (add) state[declination]++;
        else state[declination]--;

        for (let key in state) {
            if (state[key] !== 0) {
                let cases = key.split(",");
                text += text === "" ? state[key] + " " : ", " + state[key] + " "

                if (state[key] === 1) text += cases[0]
                else if (state[key] > 1 && state[key] < 5) text += cases[1]
                else if (state[key] >= 5) text += cases[2]
            } else text += "";
        }

        text === "" ? textArea.text(defaultText) : textArea.text(text);
    }
}


const onItemClick = function (callback) {

    return function (e) {

        const buttonAdd = $(".site-dropdown__button-add", this);
        const buttonRemove = $(".site-dropdown__button-remove", this);
        const count = $(".site-dropdown__count", this);
        const currentCount = parseInt(count[0].innerText);

        if (e.target === buttonAdd[0]) {
            count.text(currentCount + 1);
            buttonRemove.removeAttr("disabled");
            callback($(this), true)

        } else if (e.target === buttonRemove[0]) {
            count.text(currentCount - 1);
            if (count[0].innerText === "0") {
                buttonAdd.focus();
                buttonRemove.attr("disabled", true);
            }
            callback($(this), false)
        }

    }
}

const onFooterClick = (header, counters) => {

    return function (e) {
        const buttonClear = $(".site-dropdown__button-clear", this);
        const buttonApply = $(".site-dropdown__button-apply", this);

        if (e.target === buttonClear[0]) {
            counters.forEach((counter) => {
                $(".site-dropdown__count", counter)[0].innerText = 0;
                $(".site-dropdown__button-remove", counter).attr("disabled", true);
            })
        } else if (e.target === buttonApply[0]) {

        }
    }

}

$(function () {

    const dropdownsList = $(".site-dropdown").get();

    dropdownsList.forEach((dropdown) => {
        const dropdownHeader = $(".site-dropdown__header", dropdown);
        const dropdownList = $(".site-dropdown__list", dropdown);
        const dropdownItems = $(".site-dropdown__item", dropdownList);
        const dropdownFooter = $(".site-dropdown__list-footer", dropdownList);
        const counters = $(".site-dropdown__counter", dropdownList).get();

        dropdownHeader.click(toogleList(dropdownList));
        dropdownItems.click(onItemClick(setHeaderText(dropdownHeader)));
         if (dropdownFooter) dropdownFooter.click(onFooterClick(dropdownHeader, counters))
         else $(dropdown).focusout(hideList(dropdownHeader, dropdownList));
    });

});