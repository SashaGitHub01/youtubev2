import numeral from "numeral";

export const formatViews = (num: number) => {
   if (num < 1000) return num
   return numeral(num).format('0.0a')
}