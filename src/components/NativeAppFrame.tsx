import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Wifi, BatteryMedium, Smartphone, Monitor, Signal } from 'lucide-react';

interface NativeAppFrameProps {
  children: React.ReactNode;
}

export const NativeAppFrame: React.FC<NativeAppFrameProps> = ({ children }) => {
  const { isPhoneFrameEnabled, setIsPhoneFrameEnabled, isDarkMode } = useApp();
  const [currentTime, setCurrentTime] = useState<string>('12:00');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-neutral-200/90 dark:bg-[#020b08] py-0 md:py-6 flex flex-col items-center justify-center transition-colors duration-300">
      {/* Desktop view switcher bar */}
      <div className="hidden md:flex items-center gap-3 mb-3 z-30">
        <button
          type="button"
          onClick={() => setIsPhoneFrameEnabled(true)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            isPhoneFrameEnabled
              ? 'bg-emerald-800 text-white shadow-md dark:bg-amber-500 dark:text-neutral-950'
              : 'bg-white/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-white'
          }`}
        >
          <Smartphone className="w-3.5 h-3.5" />
          <span>Vista Celular Nativa</span>
        </button>

        <button
          type="button"
          onClick={() => setIsPhoneFrameEnabled(false)}
          className={`px-3 py-1.5 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
            !isPhoneFrameEnabled
              ? 'bg-emerald-800 text-white shadow-md dark:bg-amber-500 dark:text-neutral-950'
              : 'bg-white/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-white'
          }`}
        >
          <Monitor className="w-3.5 h-3.5" />
          <span>Vista Completa</span>
        </button>
      </div>

      {/* Main Container: Mobile phone chassis on desktop, or seamless responsive on mobile */}
      <div
        className={`w-full transition-all duration-300 relative ${
          isPhoneFrameEnabled
            ? 'md:max-w-[415px] md:rounded-[48px] md:border-[10px] md:border-neutral-900 md:dark:border-neutral-800 md:shadow-[0_25px_80px_rgba(0,0,0,0.4)] overflow-hidden bg-neutral-50 dark:bg-[#051814]'
            : 'max-w-md bg-neutral-50 dark:bg-[#051814] shadow-2xl'
        }`}
      >
        {/* Native Smartphone Status Bar (Top notch & indicators) */}
        <div className="sticky top-0 z-40 bg-white/95 dark:bg-[#071c17]/95 backdrop-blur-md px-6 pt-2 pb-1.5 flex items-center justify-between text-[11px] font-semibold text-neutral-800 dark:text-neutral-200 select-none border-b border-black/5 dark:border-white/5">
          {/* Left Time */}
          <span className="tabular-nums font-bold tracking-tight">
            {currentTime}
          </span>

          {/* Dynamic Island Notch Pill */}
          <div className="w-20 h-4 rounded-full bg-black/90 dark:bg-neutral-950 flex items-center justify-center gap-2 shadow-inner px-2">
            <div className="w-2 h-2 rounded-full bg-neutral-800 border border-neutral-700" />
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
          </div>

          {/* Right Status Icons: 5G, Wi-Fi, Battery */}
          <div className="flex items-center gap-1.5">
            <span className="text-[9px] font-extrabold tracking-wider">5G</span>
            <Wifi className="w-3.5 h-3.5 stroke-[2.2]" />
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-bold tabular-nums">100%</span>
              <BatteryMedium className="w-3.5 h-3.5 stroke-[2.2]" />
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative min-h-[820px] md:max-h-[860px] md:overflow-y-auto no-scrollbar flex flex-col justify-between">
          {children}

          {/* Native Home Indicator Pill (iOS/Android bar) */}
          <div className="sticky bottom-0 left-0 right-0 z-50 pointer-events-none py-1 bg-gradient-to-t from-white/80 via-white/40 to-transparent dark:from-[#051814]/80 dark:via-[#051814]/40 flex justify-center">
            <div className="w-32 h-1 bg-neutral-400 dark:bg-neutral-600 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};
