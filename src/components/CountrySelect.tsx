import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Country } from "../models/country";
import { useDispatch } from "react-redux";
import { setCurrency } from "../feature/converter/converterSlice";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";

type CountrySelect = {
  value: string;
  countries: Country[];
  currency: string;
  order: "first" | "second";
};

export default function CountrySelect({
  value,
  order,
  countries,
  currency,
}: CountrySelect) {
  const dispatch = useDispatch();

  const getCurrencyAbbreviation = (country: Country) =>
    Object.getOwnPropertyNames(country.currencies)[0];

  const handleChange = (e: SelectChangeEvent) => {
    const selectedCountry = countries.find(
      (country) => country.name.common === e.target.value
    );

    if (!selectedCountry) {
      return;
    }

    const currencyAbbreviation = getCurrencyAbbreviation(selectedCountry);

    dispatch(
      setCurrency({
        currency: currencyAbbreviation,
        name: selectedCountry.name.common,
        order: order,
        symbol: selectedCountry.currencies[currencyAbbreviation].symbol,
      })
    );
  };

  return (
    <Select value={value} onChange={handleChange} defaultValue="" fullWidth>
      {countries.map((country, index) => (
        <MenuItem value={country.name.common} key={country.name.common}>
          {`${country.flag} ${getCurrencyAbbreviation(country)}`}
        </MenuItem>
      ))}
    </Select>
  );
}
