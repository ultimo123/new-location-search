import { useState } from "react"
import { searchApi } from "../api/searchApi/GetCitysByKeyword"
import { InputProps } from "../typings"
import ComboCustom from "./ComboCustom"
import Invalid from "./Invalid"

interface optionsSelect {
  label: string | number
  value: string | number
}

const Combobox = ({
  stateManager,
  className,
  isArraySelect,
  placeholder,
  validation,
}: InputProps) => {
  const { value, onChange } = stateManager
  const [error, setError] = useState({
    error: false,
    message: "",
  })

  const [touched, setTouched] = useState(false)

  const getCityData = async (keyWords: string) => {
    const { data, message, status } = await searchApi(keyWords)

    if (status === 200 && data) {
      setError({
        error: false,
        message: "",
      })
      const dataOptionDropdown: optionsSelect[] = data.map((n) => {
        return {
          label: n[0],
          value: n[0],
        }
      })
      return dataOptionDropdown
    } else {
      setError({
        error: true,
        message: message,
      })
    }
  }

  const cityArray = (n: optionsSelect | Array<optionsSelect>) => {
    setTouched(true)
    setError({ error: false, message: "" })

    if (isArraySelect) {
      onChange(
        (n as Array<optionsSelect>)?.map(
          (s: optionsSelect) => s?.value,
        ) as Array<string>,
      )
    } else {
      onChange((n as optionsSelect)?.value as string)
    }
  }

  const errorPrompt = () => {
    if (!isArraySelect) {
      return !touched || !value
    } else {
      return !touched || (value as Array<string>).length === 0
    }
  }

  return (
    <>
      <ComboCustom
        className="w-full"
        onChange={cityArray}
        isMulti={isArraySelect as any}
        loadOptions={getCityData as any}
        placeholder={placeholder as any}
        isClearable
        error={error}
      />
      <Invalid
        errors={error}
        preventPrompt={errorPrompt()}
        validations={validation}
      />
    </>
  )
}

export default Combobox
