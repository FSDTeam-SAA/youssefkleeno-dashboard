"use client"

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock } from "lucide-react"

interface AddScheduleFormProps {
  onBack: () => void
}

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
const times = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
  "6:00 PM",
]

export function AddScheduleForm({ onBack }: AddScheduleFormProps) {
  return (
    <Card className="">
      <div className="w-full">
        {/* Header */}
        <Breadcrumb className="p-5">
          <p className="text-[#2F2F2F] font-semibold text-[24px] mb-4">
            Time Schedule List
          </p>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Time Schedule List</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="space-y-8">
            {/* Day Selection */}
            <div>
              <label className="block text-sm font-medium text-[#03090D] mb-2">Day</label>
              <Select>
                <SelectTrigger className="w-[370px]">
                  <SelectValue placeholder="Select a Day" />
                </SelectTrigger>
                <SelectContent>
                  {days.map((day) => (
                    <SelectItem key={day} value={day.toLowerCase()}>
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Row 1: Slot 1 and Slot 2 */}
            <div className="grid grid-cols-2 gap-6">
              {/* Slot 1 */}
              <div>
                <label className="block text-sm font-medium text-[#03090D] mb-4">Slot 1</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <SelectValue placeholder="Select a time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">To</span>
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <SelectValue placeholder="Select a time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Slot 2 */}
              <div>
                <label className="block text-sm font-medium text-[#03090D] mb-4">Slot 2</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <SelectValue placeholder="Select a time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">To</span>
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <SelectValue placeholder="Select a time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2: Slot 3 and Slot 4 */}
            <div className="grid grid-cols-2 gap-6">
              {/* Slot 3 */}
              <div>
                <label className="block text-sm font-medium text-[#03090D] mb-4">Slot 3</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <SelectValue placeholder="Select a time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">To</span>
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <SelectValue placeholder="Select a time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Slot 4 */}
              <div>
                <label className="block text-sm font-medium text-[#03090D] mb-4">Slot 4</label>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <SelectValue placeholder="Select a time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <span className="text-sm text-gray-500 font-medium">To</span>
                  <div className="flex-1">
                    <Select>
                      <SelectTrigger className="w-full">
                        <div className="flex items-center gap-2">
                          <Clock size={16} className="text-gray-400" />
                          <SelectValue placeholder="Select a time" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        {times.map((time) => (
                          <SelectItem key={time} value={time}>
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-6 ">
            <Button variant="ghost" onClick={onBack} className="text-[#499FC0] hover:text-[#499FC0]/90 hover:bg-transparent">
              Cancel
            </Button>
            <Button className="bg-[#499FC0] hover:bg-[#499FC0]/90 w-[140px] h-[40px] text-white ">Save</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}