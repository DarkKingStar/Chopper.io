export function CmtoFeet(cm) {
  return parseInt(Math.round(parseFloat(cm / 30.48)));
}
export function CmtoInch(cm) {
  return parseInt(
    Math.round(
      (parseFloat(cm / 30.48) - parseInt(parseFloat(cm / 30.48))) * 12,
    ),
  );
}
export function KgToLbs(kg) {
  return parseInt(Math.round(parseFloat(kg * 2.20462))) + 1;
}
export function FeettoCm(feetinch) {
  return parseFloat(feetinch * 30.48).toFixed(1);
}
export function LbstoKg(lbs) {
  return parseFloat(lbs / 2.20462).toFixed(1);
}
export function InchfromFeet(decimal, natural) {
  return parseInt(Math.round(parseFloat(decimal - natural) * 12));
}
