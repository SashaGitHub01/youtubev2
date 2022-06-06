import React, { PropsWithChildren } from 'react'
import countries from 'i18n-iso-countries'
import en from 'i18n-iso-countries/langs/en.json'
import Select, { ActionMeta, SingleValue } from 'react-select'

countries.registerLocale(en)

interface CountriesSelectorProps {
   [k: string]: any,
   onChange: (...event: any[]) => void
}

const CountriesSelector: React.FC<PropsWithChildren<CountriesSelectorProps>> = React.forwardRef(function CountriesSelector({ onChange, ...props }, ref: any) {
   const options = Object.entries(countries.getNames('en')).map(([code, name]) => ({
      value: name,
      label: <div className="flex items-center gap-2">
         <p>{name}</p>
      </div>,
   }));

   const handleChange = (val: SingleValue<{ value: string; label: JSX.Element; }>) => {
      onChange(val?.value)
   }

   return (
      <Select
         ref={ref}
         options={options}
         placeholder={'Your country'}
         value={options.find((opt) => opt.value === props.value)}
         onChange={handleChange}
      />
   )
})

export default CountriesSelector;