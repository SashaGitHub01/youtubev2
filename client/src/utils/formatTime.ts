import numeral from "numeral";

export const formatTime = (sec: number) => {
   return numeral(sec).format('00:00')
}