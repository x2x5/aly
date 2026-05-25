import { useState, useEffect, useCallback } from "react"
import topics from "./data/index.js"

const gradients = {
  emerald: "from-emerald-500 to-teal-600",
  amber: "from-amber-500 to-orange-600",
  rose: "from-rose-500 to-pink-600",
  violet: "from-violet-500 to-purple-600",
  blue: "from-blue-500 to-indigo-600",
  cyan: "from-cyan-500 to-blue-600",
  orange: "from-orange-500 to-red-600",
  pink: "from-pink-500 to-rose-600",
  slate: "from-slate-500 to-gray-600",
  green: "from-green-500 to-emerald-600",
  indigo: "from-indigo-500 to-blue-700",
  yellow: "from-yellow-500 to-amber-600",
}

function SlidePreview({ slide, index, total }) {
  const bg = gradients[slide.color] || "from-indigo-500 to-purple-600"
  return (
    <div
      className={`relative flex flex-col bg-gradient-to-br ${bg} rounded-2xl shadow-2xl p-8 md:p-10 select-none cursor-default h-full w-full overflow-y-auto`}
    >
      <span className="absolute top-4 right-5 text-white/40 text-sm font-mono">
        {index} / {total}
      </span>
      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl md:text-6xl leading-none flex-shrink-0">
          {slide.icon}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
          {slide.title}
        </h2>
      </div>
      <ul className="space-y-3 mb-6 flex-1">
        {slide.points.map((point, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-white/90 text-base md:text-lg leading-relaxed"
          >
            <span className="text-white/60 mt-1 flex-shrink-0">◆</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3.5 flex items-start gap-3">
        <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
        <span className="text-white/85 text-sm md:text-base leading-relaxed">
          {slide.tip}
        </span>
      </div>
    </div>
  )
}

function initSlideOf() {
  return topics.map((t) => t.questions.map(() => 0))
}

export default function App() {
  const [selectedTopic, setSelectedTopic] = useState(0)
  const [selectedQuestion, setSelectedQuestion] = useState(0)
  const [slideOf, setSlideOf] = useState(initSlideOf)
  const [expandedTopics, setExpandedTopics] = useState(topics.map((_, i) => i === 0))
  const [collapsed, setCollapsed] = useState(false)

  const topic = topics[selectedTopic]
  const question = topic.questions[selectedQuestion]
  const currentSlide = slideOf[selectedTopic][selectedQuestion]
  const totalSlides = question.slides.length

  const goNext = useCallback(() => {
    setSlideOf((prev) => {
      const next = prev.map((t) => [...t])
      if (next[selectedTopic][selectedQuestion] < question.slides.length - 1) {
        next[selectedTopic][selectedQuestion]++
      }
      return next
    })
  }, [selectedTopic, selectedQuestion, question.slides.length])

  const goPrev = useCallback(() => {
    setSlideOf((prev) => {
      const next = prev.map((t) => [...t])
      if (next[selectedTopic][selectedQuestion] > 0) {
        next[selectedTopic][selectedQuestion]--
      }
      return next
    })
  }, [selectedTopic, selectedQuestion])

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowRight" || e.key === "n" || e.key === "N") goNext()
      if (e.key === "ArrowLeft" || e.key === "b" || e.key === "B") goPrev()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [goNext, goPrev])

  const handleSelectQuestion = (ti, qi) => {
    setSelectedTopic(ti)
    setSelectedQuestion(qi)
  }

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      <aside
        className={`bg-gray-800 border-r border-gray-700 flex-shrink-0 overflow-y-auto transition-all duration-300 ${
          collapsed ? "w-0 p-0 overflow-hidden" : "w-72 p-5"
        }`}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
            研究课题
          </h2>
          <button
            onClick={() => setCollapsed(true)}
            className="text-gray-500 hover:text-white text-lg leading-none"
          >
            ✕
          </button>
        </div>

        <div className="space-y-1">
          {topics.map((t, ti) => {
            const isExpanded = expandedTopics[ti]
            const hasActive = ti === selectedTopic
            return (
              <div key={ti}>
                <button
                  onClick={() =>
                    setExpandedTopics((prev) => {
                      const next = [...prev]
                      next[ti] = !next[ti]
                      return next
                    })
                  }
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    hasActive
                      ? "bg-indigo-600/20 text-indigo-300"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <span className="truncate">{t.title}</span>
                  <span
                    className={`text-xs transition-transform ${
                      isExpanded ? "rotate-90" : ""
                    }`}
                  >
                    ▸
                  </span>
                </button>

                {isExpanded && (
                  <div className="ml-2 mt-1 space-y-0.5 border-l border-gray-700 pl-2">
                    {t.questions.map((q, qi) => {
                      const active =
                        ti === selectedTopic && qi === selectedQuestion
                      return (
                        <button
                          key={qi}
                          onClick={() => handleSelectQuestion(ti, qi)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                            active
                              ? "bg-indigo-600 text-white font-medium"
                              : "text-gray-400 hover:bg-gray-700 hover:text-gray-200"
                          }`}
                        >
                          {q.title}
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </aside>

      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="fixed top-4 left-4 z-10 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg px-3 py-1.5 text-sm transition-colors shadow-lg"
        >
          ☰
        </button>
      )}

      <main className="flex-1 flex items-center justify-center p-6 md:p-10 min-w-0">
        <div className="relative w-full h-full max-w-5xl max-h-[85vh] flex flex-col items-center justify-center gap-6">
          <div className="w-full flex-1 min-h-0">
            <SlidePreview
              slide={question.slides[currentSlide]}
              index={currentSlide + 1}
              total={totalSlides}
            />
          </div>

          {totalSlides > 1 && (
            <div className="flex items-center gap-2">
              {question.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() =>
                    setSlideOf((prev) => {
                      const next = prev.map((t) => [...t])
                      next[selectedTopic][selectedQuestion] = i
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
