export default function decline(number, cases) {
  const last = number % 10;
  const penult = Math.floor(number % 100 / 10);

  if (last === 1 && penult !== 1)
    return number + " " + cases[0]
  else if (last > 1 && last < 5 && penult !== 1)
    return number + " " + cases[1]
  else
    return number + " " + cases[2]
}