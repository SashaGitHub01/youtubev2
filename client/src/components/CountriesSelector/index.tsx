import React, { PropsWithChildren } from 'react'
import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import Select from 'react-select'

countries.registerLocale(en)

interface CountriesSelectorProps {
   [k: string]: any,
}

const CountriesSelector: React.FC<PropsWithChildren<CountriesSelectorProps>> = React.forwardRef(({ ...props }, ref: any) => {
   const options = Object.entries(countries.getNames('en')).map(([code, name]) => ({
      label: name,
      value: name
   }));

   return (
      <Select
         ref={ref}
         options={options}
         placeholder={'Your country'}
         {...props}
      />
   )
})

export default CountriesSelector;