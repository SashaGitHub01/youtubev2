import numeral from 'numeral'

export const formatSubs = (num: number) => {
   return numeral(num).format('0,0,0')
}