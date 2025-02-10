"use client";
import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { motion } from "framer-motion";
import Modal from "./Modal"; // Import modal component

// Define weekday labels
const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(dayjs()); // Store current month
  const [selectedDay, setSelectedDay] = useState(null); // Track selected date
  const [events, setEvents] = useState({}); // Store events for each day
  const [open, setOpen] = useState(false); // Control modal visibility
  const [eventText, setEventText] = useState(""); // Store event input

  // Load events from local storage when the component mounts
  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || {};
    setEvents(storedEvents);
  }, []);

  // Save event to state and local storage
  const saveEvent = () => {
    if (!eventText.trim()) return; // Prevent empty events
    const updatedEvents = { ...events, [selectedDay]: eventText };
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setOpen(false); // Close the modal after saving
  };

  // Delete an event
  const deleteEvent = (day) => {
    const updatedEvents = { ...events };
    delete updatedEvents[day]; // Remove the event from state
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  // Handle click on a date
  const handleDateClick = (day) => {
    setSelectedDay(day);
    setEventText(events[day] || ""); // Load existing event if any
    setOpen(true); // Open the modal
  };

  // Get the first day of the month to align the dates properly
  const firstDayOfMonth = currentMonth.startOf("month").day();
  const daysInMonth = currentMonth.daysInMonth();
  const today = dayjs().format("YYYY-MM-DD"); // Get today's date

  return (
    <div className="p-4 w-full">
      {/* Month navigation */}
      <div className="flex justify-between items-center mb-4">
        <button
          className="px-4 py-2 bg-gray-700 rounded"
          onClick={() => setCurrentMonth(currentMonth.subtract(1, "month"))}
        >
          &#9664; Prev
        </button>
        <h2 className="text-md md:text-xl font-semibold">
          {currentMonth.format("MMMM YYYY")}
        </h2>
        <button
          className="px-4 py-2 bg-gray-700 rounded"
          onClick={() => setCurrentMonth(currentMonth.add(1, "month"))}
        >
          Next &#9654;
        </button>
      </div>

      {/* Weekdays row */}
      <div className="grid grid-cols-7 text-center text-gray-300 mb-2">
        {weekdays.map((day, index) => (
          <div key={index} className="p-2 font-bold">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-0.5 md:gap-2">
        {/* Empty placeholders to align first day of the month */}
        {Array(firstDayOfMonth)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`} className="h-12 md:h-28"></div>
          ))}

        {/* Days of the month */}
        {[...Array(daysInMonth)].map((_, i) => {
          const currentDay = currentMonth.date(i + 1).format("YYYY-MM-DD");
          return (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300 }}
              onClick={() => handleDateClick(currentDay)}
              className={`relative h-12 md:h-28 border p-4 text-center cursor-pointer rounded shadow-sm ${
                events[currentDay] ? "bg-blue-400" : "bg-gray-700"
              }`}
            >
              {/* Display the date number */}
              <div className="relative">
                {i + 1}

                {/* Highlight today's date with a small red circle */}
                {currentDay === today && (
                  <div className="absolute -top-2 right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                )}
              </div>

              {/* Display event text if exists */}
              {events[currentDay] && (
                <div className="overflow-hidden text-ellipsis mt-1 text-lg text-gray-600 font-bold">
                  {events[currentDay]}
                </div>
              )}

              {/* Delete event button (appears if event exists) */}
              {events[currentDay] && (
                <button
                  className="absolute top-1 right-1"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent modal from opening
                    deleteEvent(currentDay);
                  }}
                >
                  {/* 🗑️ */}
                  <img
                    src="/delete.png" 
                    alt="Delete"
                    className="w-4 h-4"
                  />
                </button>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Modal Component */}
      <Modal
        open={open}
        setOpen={setOpen} // Allow closing modal
        selectedDay={selectedDay}
        eventText={eventText}
        setEventText={setEventText}
        saveEvent={saveEvent}
      />
    </div>
  );
};

export default Calendar;
