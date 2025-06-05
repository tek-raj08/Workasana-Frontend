import {format} from 'date-fns'
import React from 'react'

const DateFormat = ({date}) => {
    const FormatedDate = format(new Date(date?.createdAt), "do MMMM yyyy")
  return (
    <span>
      {FormatedDate}
    </span>
  )
}

export default DateFormat
