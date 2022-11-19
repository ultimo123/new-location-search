import { ChangeEvent, useState } from "react"
import Calendar, { OnChangeDateCallback } from "react-calendar"
import "react-calendar/dist/Calendar.css"
import { InputProps } from "../typings"
import { clickOutside } from "../utils/outSideClick"
import InputWrapper from "./InputWrapper"
import Invalid from "./Invalid"

const CalendarStyle = ({ stateManager, className, validation }: InputProps) => {
  const [openCalendar, setOpenCalendar] = useState(false)
  const { onChange, value } = stateManager

  const handelChangeDate = (value: Date, e: ChangeEvent<HTMLInputElement>) => {
    onChange(value)
    setOpenCalendar(false)
  }

  return (
    <div>
      <InputWrapper
        className={`${className} ${validation.valid ? "" : "bg-black"}`}
        onClick={(e) => {
          setOpenCalendar((prev) => !prev)
          clickOutside(() => {
            setOpenCalendar(false)
          }, e).addOnclick()
        }}
      >
        <div className="cursor-pointer -ml-3">
          <div className="">
            <span className="pointer-events-none">
              {value && (
                <span className="text-[rgb(156, 163, 175)]">
                  {new Date(value).toDateString()}
                </span>
              )}

              {!value && "Enter Date"}
            </span>

            {openCalendar && (
              <div
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <Calendar
                  className="absolute z-50"
                  onChange={handelChangeDate}
                  value={value as Date}
                  calendarType="US"
                  minDate={new Date()}
                />
              </div>
            )}
          </div>
        </div>
      </InputWrapper>
      <Invalid validations={validation} />
    </div>
  )
}

export default CalendarStyle
