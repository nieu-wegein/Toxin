export default function separatePrice(price) {

    let separated = "";
    const reversedPrice = price.toString().split("").reverse();

    reversedPrice.forEach((digit, i) => {
        if (i !== 0 && i % 3 === 0) separated = digit + " " + separated;
        else separated = digit + separated;
    });
    return separated;
}