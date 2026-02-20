'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';

type DailyTodo = {
  day: string;
  shortDay: string;
  date: number;
  month: string;
  year: number;
  todo: string;
};

// Only store the todos - dates will be calculated dynamically
const weeklyTodos = [
  'Preparing for work tomorrow 🥲',  // Sunday
  'Work 😡',                // Monday
  'Work some more 🙁',            // Tuesday
  'Work because I have bills to pay 😐',            // Wednesday
  'Work but at least it\'s Thursday 🙂',                 // Thursday
  'Work today not tomorrow 🥲',            // Friday
  'No work 🥹',            // Saturday
];

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const shortDayNames = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const WeeklySchedule: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [completedTodos, setCompletedTodos] = useState<Set<number>>(new Set());

  // Generate week data dynamically based on current date
  const weekData = useMemo(() => {
    const today = new Date();
    const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.

    // Calculate the start of the week (Sunday)
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - currentDay);

    // Generate data for all 7 days of the week
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + index);

      return {
        day: dayNames[index],
        shortDay: shortDayNames[index],
        date: date.getDate(),
        month: monthNames[date.getMonth()],
        year: date.getFullYear(),
        todo: weeklyTodos[index],
      };
    });
  }, []); // Empty dependency array - only calculate once on mount

  const current = weekData[activeIndex];
  const currentDayIndex = new Date().getDay();

  // Auto-detect current day on mount
  useEffect(() => {
    setActiveIndex(currentDayIndex);
  }, [currentDayIndex]);

  const toggleTodoCompletion = () => {
    setCompletedTodos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(activeIndex)) {
        newSet.delete(activeIndex);
      } else {
        newSet.add(activeIndex);
      }
      return newSet;
    });
  };

  const isTodoCompleted = completedTodos.has(activeIndex);

  return (
    <section className="py-2">
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-black/40 dark:text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4 ml-1"
      >
        Weekly Routine
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white dark:bg-[#0F0F0F] border border-gray-100 dark:border-[#1F1F1F] rounded-xl p-4 md:p-5 shadow-xl relative min-h-[220px] flex flex-col justify-between"
      >
        {/* Top bar: Day and Full Date */}
        <div className="flex justify-between items-start mb-4">
          <motion.h3
            key={`day-${activeIndex}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-semibold text-gray-900 dark:text-white"
          >
            {current.shortDay === 'SUN' ? 'Sun' : current.day}
          </motion.h3>
          <div className="text-right">
            <p className="text-gray-500 dark:text-white/60 text-xs font-medium">
              {current.month} {current.date}
            </p>
            <p className="text-gray-400 dark:text-white/40 text-[10px]">{current.year}</p>
          </div>
        </div>

        {/* Days Row */}
        <div className="flex justify-between items-center gap-1.5 mb-4 overflow-visible no-scrollbar">
          {weekData.map((item, index) => {
            const isActive = index === activeIndex;
            const isToday = index === currentDayIndex;
            return (
              <button
                key={item.shortDay}
                onClick={() => setActiveIndex(index)}
                className={`flex flex-col items-center justify-center min-w-[42px] py-2.5 rounded-lg transition-all duration-300 group relative overflow-visible ${isActive
                  ? 'bg-[#5D5FEF] text-white shadow-md dark:bg-white dark:text-[#5D5FEF]'
                  : 'text-gray-400 hover:text-gray-600 dark:text-white/40 dark:hover:text-white/60'
                  }`}
              >
                {/* Today indicator */}
                {isToday && !isActive && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse " />
                )}
                <span className={`text-sm font-bold mb-0.5 ${isActive ? 'text-white dark:text-[#5D5FEF]' : 'text-gray-900 dark:text-white'}`}>
                  {item.date}
                </span>
                <span className={`text-[8px] font-bold tracking-wider ${isActive ? 'text-white/90 dark:text-[#5D5FEF]' : 'text-gray-400 dark:text-white/40'}`}>
                  {item.shortDay}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Todo - Clickable */}
        <motion.div
          key={`todo-${activeIndex}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={toggleTodoCompletion}
          className="flex items-center gap-2.5 pt-4 border-t border-gray-100 dark:border-white/5 cursor-pointer group"
        >
          <div className={`w-4 h-4 rounded-full border flex-shrink-0 flex items-center justify-center transition-all duration-200 ${isTodoCompleted
            ? 'border-green-500 bg-green-500'
            : 'border-gray-300 group-hover:border-gray-400 dark:border-white/20 dark:group-hover:border-white/40'
            }`}>
            {isTodoCompleted && (
              <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <p className={`text-gray-700 dark:text-white text-sm font-medium tracking-tight transition-all duration-200 ${isTodoCompleted ? 'line-through opacity-50' : ''
            }`}>
            {current.todo}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WeeklySchedule;