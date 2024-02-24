import { useState } from 'react'
import { useParams } from 'react-router-dom'
import DatePicker, { registerLocale } from "react-datepicker"
import uk from 'date-fns/locale/uk';
import "react-datepicker/dist/react-datepicker.css"
import style from "./BirthDateSelectPage.module.scss"

interface BirthDateSelectProps {
  tg: WebApp
}

const BirthDateSelect = ({ tg }: BirthDateSelectProps) => {
  registerLocale('uk', uk)
  const {userId} = useParams()
  
  const sendData = (userId: number, date: Date): void => {
    date = new Date(date.getTime() - date.getTimezoneOffset()*60000)
    tg.sendData(JSON.stringify({
      type: "birthDateSelect",
      userId: userId,
      birthDate: date
    }))
  }

  const [date, setDate] = useState<Date>()

  return (
    <div className="">
      <h1>Select Date</h1>
      <DatePicker 
        className={style.input}
        locale="uk" 
        dateFormat="dd MMM yyyy"
        showIcon 
        toggleCalendarOnIconClick
        selected={date} 
        minDate={new Date("1950-01-01")}
        maxDate={new Date()}
        onChange={(date: Date) => {
          setDate(date)
        }} 
        withPortal
        showMonthDropdown
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={100}
        fixedHeight
        placeholderText="Натисніть для вибору"
        customInput={<input inputMode='none' />}
      />
      <button onClick={() => {
        if (!date) {
          tg.showAlert("Виберіть дату!") 
          return
        }
        sendData(Number(userId), date)
      }}>Send</button>
    </div>
  )
}

export default BirthDateSelect