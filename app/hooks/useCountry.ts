import countries from "world-countries"
const formatedCountries = countries.map((country) => {
    return {
        value: country.cca2,
        label: country.name.common,
        flag: country.flag,
        latlang: country.latlng,
        region: country.region
    }
})


const useCountry = () => {
    const getAll = () => formatedCountries
    const getByValue = (value: string) => {
        return formatedCountries.find((item) => item.value === value)
    }
    return {
        getAll,
        getByValue
    }
}
export default useCountry