import { cn, formatDateTime } from '@/lib/utils'
import React from 'react'

const FormatedDataTime = ({data, className}:{data:string, className?:string}) => {
  return (
  <p className={cn("body-1 text-light-200", className )}>{formatDateTime(data)}</p>
  )
}

export default FormatedDataTime
