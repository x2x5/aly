import { useState, useEffect, useCallback } from "react"
import sections from "./data.js"

function SlidePreview({ slide }) {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-12 select-none cursor-default">
      <div className="text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          {slide.title}
        </h2>
        <p className="text-xl md:text-2xl text-white/80 max-w-xl mx-auto leading-relaxed">
          {slide.content}
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const flatSlides = sections.flatMap((s) => s.slides)
  const [current, setCurrent] = useState(0)
  const [collapsed, setCollapsed] = useState(false)

  const total = flatSlides.length
  const slide = flatSlides[current]

  const goNext = useCallback(() => {
    setCurrent((p) => Math.min(p + 1, total - 1))
  }, [total])
  const goPrev = useCallback(() => {
    setCurrent((p) => Math.max(p - 1, 0))
  }, [])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight" || e.key === "n" || e.key === "N") goNext()
      if (e.key === "ArrowLeft" || e.key === "b" || e.key === "B") goPrev()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [goNext, goPrev])

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <aside
        className={`bg-gray-800 border-r border-gray-700 flex-shrink-0 overflow-y-auto transition-all duration-300 ${
          collapsed ? "w-0 p-0 overflow-hidden" : "w-64 p-5"
        }`}
      >
        <div className="space-y-6">
          {sections.map((section, si) => (
            <div key={si}>
              <h3 className="text-xs uppercase tracking-widest text-gray-400 mb-2 font-semibold">
                {section.title}
              </h3>
              <ul className="space-y-1">
                {section.slides.map((s, ssi) => {
                  const gi = sections
                    .slice(0, si)
                    .reduce((a, sec) => a + sec.slides.length, 0) + ssi
                  const active = gi === current
                  return (
                    <li key={ssi}>
                      <button
                        onClick={() => setCurrent(gi)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          active
                            ? "bg-indigo-600 text-white font-medium"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                      >
                        {s.title}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <main className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-6 py-3 bg-gray-800 border-b border-gray-700 flex-shrink-0">
          <button
            onClick={() => setCollapsed((c) => !c)}
            className="text-gray-400 hover:text-white transition-colors text-xl leading-none p-1"
            title="切换侧边栏"
          >
            {collapsed ? "☰" : "✕"}
          </button>
          <span className="text-sm text-gray-400">
            {current + 1} / {total}
          </span>
        </header>

        <div className="flex-1 flex items-center justify-center p-6 min-h-0">
          <div className="w-full h-full max-w-5xl max-h-[80vh]">
            <SlidePreview slide={slide} />
          </div>
        </div>

        <footer className="flex items-center justify-center gap-6 py-4 bg-gray-800 border-t border-gray-700 flex-shrink-0">
          <button
            onClick={goPrev}
            disabled={current === 0}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
          >
            ← 上一页
          </button>
          <span className="text-xs text-gray-500">N/B 或 ←/→</span>
          <button
            onClick={goNext}
            disabled={current === total - 1}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-sm"
          >
            下一页 →
          </button>
        </footer>
      </main>
    </div>
  )
}
