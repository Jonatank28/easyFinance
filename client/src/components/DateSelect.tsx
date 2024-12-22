'use client'

import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { months } from "@/data/months"
import { Skeleton } from "./ui/skeleton"


const DateSelect = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [year, setYear] = useState<number>()
  const [month, setMonth] = useState<number>()
  const [monthName, setMonthName] = useState<string>()

  const handleChangeMonth = (value: number) => {
    setMonth(value)
    setMonthName(months[value - 1].fullLabel)
    router.push(`?year=${year}&&month=${value}`)
    setIsOpen(false)
  }

  const handleChangeYear = (type: 'increment' | 'decrement') => {
    if (!year) return
    if (type === 'increment') {
      setYear(year + 1)
      router.push(`?year=${year + 1}&&month=${month}`)
    } else {
      setYear(year - 1)
      router.push(`?year=${year - 1}&&month=${month}`)
    }
  }

  const handleCurrentMonth = () => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    setYear(currentYear)
    setMonth(currentMonth)
    setMonthName(months[currentMonth - 1].fullLabel)
    router.push(`?year=${currentYear}&&month=${currentMonth}`)
    setIsOpen(false)
  }


  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    const paramYear = Number(searchParams.get('year'))
    const paramMonth = Number(searchParams.get('month'))

    if (paramYear && paramMonth) {
      setYear(paramYear)
      setMonth(paramMonth)
      setMonthName(months[paramMonth - 1]?.fullLabel)
      router.push(`?year=${paramYear}&&month=${paramMonth}`)
      console.log("paramYear && paramMonth")
    } else {
      if (!paramYear) {
        setYear(currentYear)
        setMonth(paramMonth)
        setMonthName(months[paramMonth - 1]?.fullLabel)
        router.push(`?year=${currentYear}&&month=${paramMonth}`)
        console.log("!paramYear")
      } else {
        setYear(paramYear)
        setMonth(currentMonth)
        setMonthName(months[currentMonth - 1]?.fullLabel)
        router.push(`?year=${paramYear}&&month=${currentMonth}`)
        console.log("paramYear")
      }
    }

  }, [searchParams])

  return (
    <div className="flex justify-center h-full">
      <Popover open={isOpen} onOpenChange={setIsOpen} >
        <PopoverTrigger asChild>
          {monthName ? <Button variant="outline">{monthName} - {year}</Button> : <Skeleton className="w-[149px] h-[40px] bg-accent" />}
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 rounded-xl">
          <div className="bg-primary flex items-center justify-between rounded-t-xl p-2">
            <Button variant="ghost" size="icon" onClick={() => handleChangeYear('decrement')}>
              <ChevronLeft />
            </Button>
            <h1 className="text-white font-bold">{year}</h1>
            <Button variant="ghost" size="icon" onClick={() => handleChangeYear('increment')}>
              <ChevronRight />
            </Button>
          </div>
          <div className="grid grid-cols-4 gap-3 p-2 pt-4 justify-center">
            {
              months.map((row) => (
                <div
                  key={row.value}
                  className="text-center hover:bg-accent p-1 rounded-xl cursor-pointer"
                  onClick={() => handleChangeMonth(row.value)}
                >
                  <p className={`text-sm opacity-70 ${row.value === month && 'text-primary'}`}>{row.label}</p>
                </div>
              ))
            }
          </div>
          <div className="flex items-center justify-between p-2">
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-primary hover:bg-primaryhandleCurrentMonth hover:text-white"
            >
              CANCELAR
            </Button>
            <Button
              variant="ghost"
              onClick={handleCurrentMonth}
              className="text-primary hover:bg-primary hover:text-white"
            >
              MÊS ATUAL
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default DateSelect