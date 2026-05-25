import { useState, useEffect, useCallback } from "react"
import topics from "./data/index.js"
import {
  DefaultSlide,
  CompareSlide,
  DataSlide,
  QuoteSlide,
  CodeSlide,
} from "./slides/index.js"

const slideComponents = {
  default: DefaultSlide,
  compare: CompareSlide,
  data: DataSlide,
  quote: QuoteSlide,
  code: CodeSlide,
}

function SlidePreview({ slide, index, total }) {
  const type = slide.type || "default"
  const Component = slideComponents[type] || DefaultSlide
  const pct = total > 1 ? ((index - 1) / (total - 1)) * 100 : 0
  return (
    <div className="relative h-full w-full">
      <Component data={slide} index={index} total={total} />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div
          className="h-full bg-white/40 transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
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
  const [expandedTopics, setExpandedTopics] = useState(
    topics.map((_, i) => i === 0)
  )
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

      <main className="flex-1 min-w-0">
        <div className="h-full w-full">
          <SlidePreview
            slide={question.slides[currentSlide]}
            index={currentSlide + 1}
            total={totalSlides}
          />
        </div>
      </main>
    </div>
  )
}
