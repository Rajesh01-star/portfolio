'use client'
import React, { useState } from 'react';
import { motion } from 'framer-motion';

type DailyTodo = {
  day: string;
  shortDay: string;
  date: number;
  month: string;
  year: number;
  todo: string;
};

const weekData: DailyTodo[] = [
  { day: 'Sunday', shortDay: 'SUN', date: 15, month: 'Feb', year: 2026, todo: 'Preparing for work tomorrow 🥲' },
  { day: 'Monday', shortDay: 'MON', date: 16, month: 'Feb', year: 2026, todo: 'Stay focused! 🚀' },
  { day: 'Tuesday', shortDay: 'TUE', date: 17, month: 'Feb', year: 2026, todo: 'Deep work session 🧠' },
  { day: 'Wednesday', shortDay: 'WED', date: 18, month: 'Feb', year: 2026, todo: 'Keep the momentum 🌊' },
  { day: 'Thursday', shortDay: 'THU', date: 19, month: 'Feb', year: 2026, todo: 'Almost there 🧗' },
  { day: 'Friday', shortDay: 'FRI', date: 20, month: 'Feb', year: 2026, todo: 'Finish with a win 🏆' },
  { day: 'Saturday', shortDay: 'SAT', date: 21, month: 'Feb', year: 2026, todo: 'Rest and recharge 🔋' },
];

const WeeklySchedule: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = weekData[activeIndex];

  return (
    <section className="max-w-[528px] mx-auto px-4 py-6">
      <motion.h2 
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-white/40 text-[10px] font-bold uppercase tracking-widest mb-4 ml-1"
      >
        Weekly Routine
      </motion.h2>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-[#0F0F0F] border border-[#1F1F1F] rounded-xl p-4 md:p-5 shadow-xl overflow-hidden relative min-h-[220px] flex flex-col justify-between"
      >
        {/* Top bar: Day and Full Date */}
        <div className="flex justify-between items-start mb-4">
          <motion.h3 
            key={`day-${activeIndex}`}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg font-semibold text-white"
          >
            {current.shortDay === 'SUN' ? 'Sun' : current.day}
          </motion.h3>
          <div className="text-right">
            <p className="text-white/60 text-xs font-medium">
              {current.month} {current.date}
            </p>
            <p className="text-white/40 text-[10px]">{current.year}</p>
          </div>
        </div>

        {/* Days Row */}
        <div className="flex justify-between items-center gap-1.5 mb-4 overflow-x-auto no-scrollbar">
          {weekData.map((item, index) => {
            const isActive = index === activeIndex;
            return (
              <button
                key={item.shortDay}
                onClick={() => setActiveIndex(index)}
                className={`flex flex-col items-center justify-center min-w-[42px] py-2.5 rounded-lg transition-all duration-300 group ${
                  isActive 
                    ? 'bg-white text-[#5D5FEF] shadow-md' 
                    : 'text-white/40 hover:text-white/60'
                }`}
              >
                <span className={`text-sm font-bold mb-0.5 ${isActive ? 'text-[#5D5FEF]' : 'text-white'}`}>
                  {item.date}
                </span>
                <span className={`text-[8px] font-bold tracking-wider ${isActive ? 'text-[#5D5FEF]' : 'text-white/40'}`}>
                  {item.shortDay}
                </span>
              </button>
            );
          })}
        </div>

        {/* Bottom Todo */}
        <motion.div 
          key={`todo-${activeIndex}`}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2.5 pt-4 border-t border-white/5"
        >
          <div className="w-4 h-4 rounded-full border border-white/20 flex-shrink-0" />
          <p className="text-white text-sm font-medium tracking-tight">
            {current.todo}
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WeeklySchedule;