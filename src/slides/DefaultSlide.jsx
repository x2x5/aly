import { gradients } from "./gradients.js"

export default function DefaultSlide({ data, index, total }) {
  const bg = gradients[data.color] || "from-indigo-500 to-purple-600"
  return (
    <div
      className={`relative flex flex-col bg-gradient-to-br ${bg} p-8 md:p-10 select-none cursor-default h-full w-full overflow-y-auto`}
    >
      <span className="absolute top-4 right-5 text-white/40 text-sm font-mono">
        {index} / {total}
      </span>
      <div className="flex items-start gap-4 mb-6">
        <span className="text-5xl md:text-6xl leading-none flex-shrink-0">
          {data.icon}
        </span>
        <h2 className="text-2xl md:text-3xl font-bold text-white mt-2">
          {data.title}
        </h2>
      </div>
      <ul className="space-y-3 mb-6 flex-1">
        {data.points.map((point, i) => (
          <li
            key={i}
            className="flex items-start gap-3 text-white/90 text-base md:text-lg leading-relaxed"
          >
            <span className="text-white/50 mt-1 flex-shrink-0">◆</span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
      {data.tip && (
        <div className="bg-white/15 backdrop-blur-sm rounded-xl px-5 py-3.5 flex items-start gap-3">
          <span className="text-lg flex-shrink-0 mt-0.5">💡</span>
          <span className="text-white/85 text-sm md:text-base leading-relaxed">
            {data.tip}
          </span>
        </div>
      )}
    </div>
  )
}
