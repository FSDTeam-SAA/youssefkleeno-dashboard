"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Edit, Trash2 } from "lucide-react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { AddScheduleForm } from "./TimeSheduleFrom"

// Define the interface for the schedule data
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

// Fetch schedules from the API
const fetchSchedules = async (): Promise<Schedule[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/time`)
  if (!response.ok) {
    throw new Error("Failed to fetch schedules")
  }
  const data = await response.json()
  return data.data
}

// Delete schedule API call
const deleteSchedule = async (id: string): Promise<void> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/time/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error("Failed to delete schedule")
  }
}

export default function TimeSchedulePage() {
  const [showAddForm, setShowAddForm] = useState(false)
  const [editScheduleId, setEditScheduleId] = useState<string | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [scheduleToDelete, setScheduleToDelete] = useState<string | null>(null)
  
  const queryClient = useQueryClient()

  // Use TanStack Query to fetch data
  const { data: schedules, isLoading, error } = useQuery({
    queryKey: ["schedules"],
    queryFn: fetchSchedules,
  })

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: deleteSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] })
      setShowDeleteModal(false)
      setScheduleToDelete(null)
    },
    onError: (error) => {
      console.error("Delete error:", error)
      // You might want to show a toast notification here
    }
  })

  const handleEditClick = (scheduleId: string) => {
    setEditScheduleId(scheduleId)
    setShowAddForm(true)
  }

  const handleDeleteClick = (scheduleId: string) => {
    setScheduleToDelete(scheduleId)
    setShowDeleteModal(true)
  }

  const confirmDelete = () => {
    if (scheduleToDelete) {
      deleteMutation.mutate(scheduleToDelete)
    }
  }

  if (showAddForm) {
    return (
      <AddScheduleForm
        onBack={() => {
          setShowAddForm(false)
          setEditScheduleId(null)
        }}
        editScheduleId={editScheduleId}
      />
    )
  }

  return (
    <div className="min-h-screen">
      <Card className="w-full bg-white">
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
          <div className="pt-7">
            <Button
              onClick={() => setShowAddForm(true)}
              className="bg-[#499FC0] hover:bg-[#499FC0]/90 text-white w-[140px] h-[40px] rounded-md flex items-center gap-2"
            >
              <span className="text-lg">+</span>
              Add Schedule
            </Button>
          </div>
        </Breadcrumb>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-[18px] font-medium text-[#2F2F2F]">Day</th>
                <th className="px-6 py-4 text-left text-[18px] font-medium text-[#2F2F2F]">Slot 1</th>
                <th className="px-6 py-4 text-left text-[18px] font-medium text-[#2F2F2F]">Slot 2</th>
                <th className="px-6 py-4 text-left text-[18px] font-medium text-[#2F2F2F]">Slot 3</th>
                <th className="px-6 py-4 text-left text-[18px] font-medium text-[#2F2F2F]">Slot 4</th>
                <th className="px-6 py-4 text-left text-[18px] font-medium text-[#2F2F2F]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {isLoading ? (
                // Skeleton loader
                Array(5).fill(0).map((_, index) => (
                  <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                        <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-6 py-4 text-center text-[18px] text-red-600">
                    Error loading schedules: {(error as Error).message}
                  </td>
                </tr>
              ) : (
                schedules?.map((schedule) => (
                  <tr key={schedule._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-[18px] text-[#2F2F2F]">{schedule.day}</td>
                    <td className="px-6 py-4 text-[18px] text-[#2F2F2F]">{schedule.slot_1}</td>
                    <td className="px-6 py-4 text-[18px] text-[#2F2F2F]">{schedule.slot_2}</td>
                    <td className="px-6 py-4 text-[18px] text-[#2F2F2F]">{schedule.slot_3}</td>
                    <td className="px-6 py-4 text-[18px] text-[#2F2F2F]">{schedule.slot_4}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <button
                          className="text-gray-400 hover:text-[#2F2F2F]"
                          onClick={() => handleEditClick(schedule._id)}
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          className="text-gray-400 hover:text-red-600"
                          onClick={() => handleDeleteClick(schedule._id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-[#2F2F2F] mb-4">
              Confirm Deletion
            </h2>
            <p className="text-[#2F2F2F] mb-6">
              Are you sure you want to delete this schedule? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowDeleteModal(false)
                  setScheduleToDelete(null)
                }}
                className="border-gray-300 text-[#2F2F2F]"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmDelete}
                disabled={deleteMutation.isPending}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                {deleteMutation.isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}