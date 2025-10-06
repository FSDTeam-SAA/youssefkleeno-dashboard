"use client"

import { useState, useEffect } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock } from "lucide-react"

interface Schedule {
  _id: string
  day: string
  slot_1: string
  slot_2: string
  slot_3: string
  slot_4: string
  createdAt: string
  updatedAt: string
  __v: number
}

interface AddScheduleFormProps {
  onBack: () => void
  editScheduleId?: string | null
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

// Utility function to convert full day to short day
const convertDayToShort = (fullDay: string): string => {
  const dayMap: { [key: string]: string } = {
    monday: "mon",
    tuesday: "tue",
    wednesday: "wed",
    thursday: "thu",
    friday: "fri",
    saturday: "sat",
    sunday: "sun",
  }
  return dayMap[fullDay.toLowerCase()] || fullDay.toLowerCase()
}

// Utility function to convert short day to full day
const convertDayToFull = (shortDay: string): string => {
  const dayMap: { [key: string]: string } = {
    mon: "monday",
    tue: "tuesday",
    wed: "wednesday",
    thu: "thursday",
    fri: "friday",
    sat: "saturday",
    sun: "sunday",
  }
  return dayMap[shortDay.toLowerCase()] || shortDay.toLowerCase()
}

// Fetch single schedule by ID
const fetchScheduleById = async (id: string): Promise<Schedule> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/time/${id}`)
  if (!response.ok) {
    throw new Error("Failed to fetch schedule")
  }
  const data = await response.json()
  return data.data
}

// Post new schedule
const postSchedule = async (data: { day: string; slot_1: string; slot_2: string; slot_3: string; slot_4: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/time`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      day: data.day,
      slot_1: data.slot_1,
      slot_2: data.slot_2,
      slot_3: data.slot_3,
      slot_4: data.slot_4,
    }),
  })
  if (!response.ok) {
    throw new Error("Failed to save schedule")
  }
  return response.json()
}

// Update existing schedule
const updateSchedule = async (id: string, data: { day: string; slot_1: string; slot_2: string; slot_3: string; slot_4: string }) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/time/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      day: data.day,
      slot_1: data.slot_1,
      slot_2: data.slot_2,
      slot_3: data.slot_3,
      slot_4: data.slot_4,
    }),
  })
  if (!response.ok) {
    throw new Error("Failed to update schedule")
  }
  return response.json()
}

export function AddScheduleForm({ onBack, editScheduleId }: AddScheduleFormProps) {
  const queryClient = useQueryClient()
  const [formData, setFormData] = useState({
    day: "",
    slot_1_start: "",
    slot_1_end: "",
    slot_2_start: "",
    slot_2_end: "",
    slot_3_start: "",
    slot_3_end: "",
    slot_4_start: "",
    slot_4_end: "",
  })

  // Fetch schedule data if editing
  const { data: schedule, isLoading: isFetching, error } = useQuery({
    queryKey: ["schedule", editScheduleId],
    queryFn: () => fetchScheduleById(editScheduleId!),
    enabled: !!editScheduleId,
  })

  // Pre-fill form with default data when editing
  useEffect(() => {
    if (schedule && editScheduleId) {
      const [slot_1_start = "", slot_1_end = ""] = schedule.slot_1 ? schedule.slot_1.split("-") : ["", ""]
      const [slot_2_start = "", slot_2_end = ""] = schedule.slot_2 ? schedule.slot_2.split("-") : ["", ""]
      const [slot_3_start = "", slot_3_end = ""] = schedule.slot_3 ? schedule.slot_3.split("-") : ["", ""]
      const [slot_4_start = "", slot_4_end = ""] = schedule.slot_4 ? schedule.slot_4.split("-") : ["", ""]

      setFormData({
        day: convertDayToFull(schedule.day),
        slot_1_start,
        slot_1_end,
        slot_2_start,
        slot_2_end,
        slot_3_start,
        slot_3_end,
        slot_4_start,
        slot_4_end,
      })
    }
  }, [schedule, editScheduleId])

  const mutation = useMutation({
    mutationFn: (data: { day: string; slot_1: string; slot_2: string; slot_3: string; slot_4: string }) =>
      editScheduleId ? updateSchedule(editScheduleId, data) : postSchedule(data),
    onSuccess: () => {
      toast.success(editScheduleId ? "Schedule updated successfully!" : "Schedule saved successfully!")
      queryClient.invalidateQueries({ queryKey: ["schedules"] })
      onBack()
    },
    onError: (error: Error) => {
      toast.error(`Error: ${error.message}`)
    },
  })

  const handleSubmit = () => {
    if (!formData.day || !formData.slot_1_start || !formData.slot_1_end) {
      toast.error("Please fill in at least the day and Slot 1 times")
      return
    }

    const data = {
      day: convertDayToShort(formData.day),
      slot_1: `${formData.slot_1_start}-${formData.slot_1_end}`,
      slot_2: formData.slot_2_start && formData.slot_2_end ? `${formData.slot_2_start}-${formData.slot_2_end}` : "",
      slot_3: formData.slot_3_start && formData.slot_3_end ? `${formData.slot_3_start}-${formData.slot_3_end}` : "",
      slot_4: formData.slot_4_start && formData.slot_4_end ? `${formData.slot_4_start}-${formData.slot_4_end}` : "",
    }

    mutation.mutate(data)
  }

  const handleSelectChange = (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <Card className="">
      <div className="w-full">
        {/* Header */}
        <Breadcrumb className="p-5">
          <p className="text-[#2F2F2F] font-semibold text-[24px] mb-4">
            {editScheduleId ? "Edit Schedule" : "Add Schedule"}
          </p>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/time-schedule">Time Schedule List</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{editScheduleId ? "Edit Schedule" : "Add Schedule"}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          {isFetching && editScheduleId ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-8">
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="flex gap-4">
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="flex gap-4">
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="flex gap-4">
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    <div className="flex gap-4">
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                      <div className="h-10 bg-gray-200 rounded flex-1"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : error ? (
            <div className="text-red-600 text-center">
              Error loading schedule: {(error as Error).message}
            </div>
          ) : (
            <div className="space-y-8">
              {/* Day Selection */}
              <div>
                <label className="block text-sm font-medium text-[#03090D] mb-2">Day</label>
                <Select value={formData.day} onValueChange={(value) => handleSelectChange("day", value)}>
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
                      <Select value={formData.slot_1_start} onValueChange={(value) => handleSelectChange("slot_1_start", value)}>
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
                      <Select value={formData.slot_1_end} onValueChange={(value) => handleSelectChange("slot_1_end", value)}>
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
                      <Select value={formData.slot_2_start} onValueChange={(value) => handleSelectChange("slot_2_start", value)}>
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
                      <Select value={formData.slot_2_end} onValueChange={(value) => handleSelectChange("slot_2_end", value)}>
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
                      <Select value={formData.slot_3_start} onValueChange={(value) => handleSelectChange("slot_3_start", value)}>
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
                      <Select value={formData.slot_3_end} onValueChange={(value) => handleSelectChange("slot_3_end", value)}>
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
                      <Select value={formData.slot_4_start} onValueChange={(value) => handleSelectChange("slot_4_start", value)}>
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
                      <Select value={formData.slot_4_end} onValueChange={(value) => handleSelectChange("slot_4_end", value)}>
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
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8 pt-6">
            <Button
              variant="ghost"
              onClick={onBack}
              className="text-[#499FC0] hover:text-[#499FC0]/90 hover:bg-transparent"
              disabled={mutation.isPending || isFetching}
            >
              Cancel
            </Button>
            <Button
              className="bg-[#499FC0] hover:bg-[#499FC0]/90 w-[140px] h-[40px] text-white"
              onClick={handleSubmit}
              disabled={mutation.isPending || isFetching}
            >
              {mutation.isPending ? "Saving..." : editScheduleId ? "Update" : "Save"}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}