'use client'

import { Button } from "./ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { months } from "@/data/months"
import useDashboard from "@/hooks/useDashboard"
import { useUser } from "@clerk/nextjs"
import useGetParams from "@/hooks/useGetParams"
import DefaultIcon from "./DefaultIcon"


const DateSelect = () => {
  const params = useGetParams()
  const router = useRouter()
  const { user } = useUser()
  const { getData } = useDashboard()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [year, setYear] = useState<number>()
  const [month, setMonth] = useState<number>()
  const [monthName, setMonthName] = useState<string>()

  const handleChangeMonth = (value: number) => {
    setMonth(value)
    setMonthName(months[value - 1].fullLabel)
    router.push(`?year=${year}&&month=${value}`)
    if (!user) return
    getData(user.id, String(value), String(year))
    setIsOpen(false)
  }

  const handleChangeYear = (type: 'increment' | 'decrement') => {
    if (!year || !user) return
    if (type === 'increment') {
      setYear(year + 1)
      router.push(`?year=${year + 1}&&month=${month}`)
      getData(user.id, String(month), String(year + 1))
    } else {
      setYear(year - 1)
      router.push(`?year=${year - 1}&&month=${month}`)
      getData(user.id, String(month), String(year + 1))
    }
  }

  const handleCurrentMonth = () => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    setYear(currentYear)
    setMonth(currentMonth)
    setMonthName(months[currentMonth - 1].fullLabel)
    router.push(`?year=${currentYear}&&month=${currentMonth}`)
    if (!user) return
    getData(user.id, String(currentMonth), String(currentYear))
    setIsOpen(false)
  }


  useEffect(() => {
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1

    const paramYear = Number(params.year)
    const paramMonth = Number(params.month)

    if (paramYear && paramMonth) {
      setYear(paramYear)
      setMonth(paramMonth)
      setMonthName(months[paramMonth - 1]?.fullLabel)
      router.push(`?year=${paramYear}&&month=${paramMonth}`)
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

  }, [params, router])

  return (
    <div className="flex justify-center h-full">
      <Popover open={isOpen} onOpenChange={setIsOpen} >
        <PopoverTrigger asChild>
          <Button variant="outline">{monthName} - {year}</Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-0 rounded-xl">
          <div className="bg-primary flex items-center justify-between rounded-t-xl p-2">
            <Button variant="ghost" size="icon" onClick={() => handleChangeYear('decrement')}>
              <DefaultIcon name="ChevronLeft" />
            </Button>
            <h1 className="text-white font-bold">{year}</h1>
            <Button variant="ghost" size="icon" onClick={() => handleChangeYear('increment')}>
              <DefaultIcon name="ChevronRight" />
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