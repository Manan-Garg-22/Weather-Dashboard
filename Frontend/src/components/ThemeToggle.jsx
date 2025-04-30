import { useEffect, useState } from "react"
import clsx from "clsx"

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(() => {
    return (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)
    )
  })

  useEffect(() => {
    const root = window.document.documentElement
    if (isDark) {
      root.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      root.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }, [isDark])

  return (
    <label className="relative inline-block w-[90px] h-[40px] cursor-pointer group transition-all duration-500">
      <input
        type="checkbox"
        checked={isDark}
        onChange={() => setIsDark(!isDark)}
        className="sr-only"
        aria-label="Toggle theme"
      />
      {/* Track */}
      <div
        className={clsx(
          "absolute top-0 left-0 w-full h-full rounded-full transition-colors duration-500",
          isDark ? "bg-[#1D1F2C]" : "bg-[#3D7EAE]",
          "shadow-inner"
        )}
      />

      {/* Stars */}
      <div
        className={clsx(
          "absolute top-1/2 left-3 transform -translate-y-1/2 transition-all duration-500",
          isDark ? "opacity-100" : "opacity-0"
        )}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" className="w-[44px] h-auto text-white fill-current">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM..."
          />
        </svg>
      </div>

      {/* Clouds */}
      <div
        className={clsx(
          "absolute bottom-[2px] left-[6px] w-[20px] h-[20px] rounded-full bg-white",
          isDark && "translate-y-[80px] opacity-0 transition-all duration-500"
        )}
        style={{
          boxShadow: `
            15px 5px #F3FDFF,
            -5px -5px #AACADF,
            23px 6px #F3FDFF,
            8px -2px #AACADF,
            35px 0px #F3FDFF,
            20px -1px #AACADF,
            47px 5px #F3FDFF,
            32px -5px #AACADF,
            58px -1px #F3FDFF,
            42px 0px #AACADF
          `,
        }}
      ></div>

      {/* Sun/Moon container */}
      <div
        className={clsx(
          "absolute w-[34px] h-[34px] top-1/2 -translate-y-1/2 bg-yellow-400 rounded-full shadow-md transition-all duration-500",
          isDark ? "left-[52px] bg-gray-300" : "left-[2px]"
        )}
      >
        {/* Moon spots */}
        {isDark && (
          <>
            <div className="absolute w-3 h-3 bg-gray-500 rounded-full top-3 left-1 opacity-70" />
            <div className="absolute w-2 h-2 bg-gray-500 rounded-full top-[12px] left-[22px] opacity-70" />
            <div className="absolute w-1.5 h-1.5 bg-gray-500 rounded-full top-[5px] left-[14px] opacity-70" />
          </>
        )}
      </div>
    </label>
  )
}
