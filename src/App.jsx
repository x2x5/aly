import { useState, useEffect, useCallback } from "react"
import topics from "./data.js"

function SlidePreview({ slide, index, total }) {
  return (
    <div className="relative flex items-center justify-center h-full w-full bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-2xl p-12 select-none cursor-default">
      <span className="absolute top-4 right-5 text-white/50 text-sm font-mono">
        {index} / {total}
      </span>
      <div className="text-center">
        <p className="text-2xl md:text-3xl text-white/90 max-w-2xl mx-auto leading-relaxed">
          {slide.content}
        </p>
      </div>
    </div>
  )
}

export default function App() {
  const [selected, setSelected] = useState(0)
  const [slideOf, setSlideOf] = useState(topics.map(() => 0))
  const [collapsed, setCollapsed] = useState(false)

  const topic = topics[selected]
  const currentSlide = slideOf[selected]
  const totalSlides = topic.slides.length

  const goNext = useCallback(() => {
    setSlideOf((prev) => {
      const next = [...prev]
      if (next[selected] < topics[selected].slides.length - 1)
        next[selected]++
      return next
    })
  }, [selected])

  const goPrev = useCallback(() => {
    setSlideOf((prev) => {
      const next = [...prev]
      if (next[selected] > 0) next[selected]--
      return next
    })
  }, [selected])

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
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            话题
          </h2>
          <button
            onClick={() => setCollapsed(true)}
            className="text-gray-500 hover:text-white text-lg leading-none"
          >
            ✕
          </button>
        </div>
        <ul className="space-y-1">
          {topics.map((t, i) => {
            const active = i === selected
            return (
              <li key={i}>
                <button
                  onClick={() => setSelected(i)}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-indigo-600 text-white font-medium"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {t.title}
                </button>
              </li>
            )
          })}
        </ul>
      </aside>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-4 left-4 z-10 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg px-3 py-1.5 text-sm transition-colors shadow-lg"
        >
          ☰
        </button>
      )}

      <main className="flex-1 flex items-center justify-center p-8 min-w-0">
        <div className="relative w-full h-full max-w-5xl max-h-[85vh] flex flex-col items-center justify-center gap-6">
          <div className="w-full flex-1 min-h-0">
            <SlidePreview
              slide={topic.slides[currentSlide]}
              index={currentSlide + 1}
              total={totalSlides}
            />
          </div>

          {totalSlides > 1 && (
            <div className="flex items-center gap-2">
              {topic.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setSlideOf((prev) => {
                      const next = [...prev]
                      next[selected] = i
                      return next
                    })
                  }
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentSlide
                      ? "bg-indigo-400 w-4"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
