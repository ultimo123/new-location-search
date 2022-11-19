import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  CalendarStyle,
  Combobox,
  Select,
  SelectNumberInput,
} from "../components"
import useInputData, { InitialStateUserInput } from "../hooks/useInputData"
import useValidateInput from "../hooks/useValidateInput"
import { checkIfObjMissingValues } from "../utils/checkIfObjIsEmpty"
import { QueryBuilder } from "../utils/QueryBuilder"

const Home = () => {
  const { state, actions } = useInputData()
  const { getInvalidInput, isTouched, validateInput, isValid } =
    useValidateInput(state)
  const [disableButton, setDisableButton] = useState<boolean>(true)

  const navigate = useNavigate()

  const handelOnsubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateInput()) return

    navigateToOther(state)
  }

  const navigateToOther = (stateChange: InitialStateUserInput) => {
    const query = new QueryBuilder("/search-results")

    for (var obj in stateChange) {
      query.addQuery(obj, stateChange[obj as keyof InitialStateUserInput])
    }

    navigate(query.getQueryPath())
  }

  useEffect(() => {
    setDisableButton(checkIfObjMissingValues(state))
  }, [state])

  return (
    <div className="flex flex-col items-center justify-center h-screen text-white">
      <h1 className="text-2xl font-medium mb-4 tracking-widest">
        <span className="text-4xl text-[#673981] font-bold animate-pulse">
          S
        </span>
        earch{" "}
        <span className="text-4xl text-[#673981] font-bold animate-pulse">
          L
        </span>
        ocation
      </h1>
      <form
        onSubmit={handelOnsubmit}
        className="bg-[#151C2D] px-8 py-5 rounded-lg min-w-[500px] grid grid-cols-1 gap-5"
      >
        <CalendarStyle
          stateManager={{
            onChange: actions.setDate as any,
            value: state.date,
          }}
          validation={getInvalidInput.date}
        />
        <SelectNumberInput
          stateManager={{
            value: state.numberOfPassengers,
            onChange: actions.setNumberOfPassengers,
          }}
          placeholder={"Enter number of passengers"}
          validation={getInvalidInput.numberOfPassengers}
        />
        <Combobox
          stateManager={{
            onChange: actions.setCityOfOrigin as any,
            value: state.cityOfOrigin,
          }}
          validation={getInvalidInput.cityOfOrigin}
          placeholder={"Origin City"}
        />
        <Combobox
          stateManager={{
            onChange: actions.setCity as any,
            value: state.city,
          }}
          validation={getInvalidInput.city}
          placeholder={"Destination city"}
        />
        <Combobox
          isArraySelect
          stateManager={{
            value: state.intermedieteCitys,
            onChange: actions.setIntermedieteCitys as any,
          }}
          validation={getInvalidInput.intermedieteCitys}
          placeholder={"Intermediate city's"}
        />

        <button
          type="submit"
          disabled={disableButton}
          className={`${
            disableButton ? "bg-gray-500" : "bg-[#673981]  hover:bg-[#8954a9]"
          } outline-none px-4 py-2 rounded-md  transition-all ease-in-out duration-200`}
        >
          Submit
        </button>
      </form>
    </div>
  )
}

export default Home
