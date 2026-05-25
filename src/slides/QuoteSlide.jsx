import { gradients } from "./gradients.js"

export default function QuoteSlide({ data, index, total }) {
  const bg = gradients[data.color] || "from-indigo-500 to-purple-600"
  return (
    <div
      className={`relative flex flex-col items-center justify-center bg-gradient-to-br ${bg} p-8 md:p-12 select-none cursor-default h-full w-full overflow-y-auto`}
    >
      <span className="absolute top-4 right-5 text-white/40 text-sm font-mono">
        {index} / {total}
      </span>
      <div className="text-white/20 text-7xl leading-none mb-6 self-start">"</div>
      <blockquote className="text-xl md:text-3xl text-white/90 leading-relaxed text-center max-w-2xl">
        {data.quote}
      </blockquote>
      {data.author && (
        <div className="mt-8 text-center">
          <div className="text-white font-medium">{data.author}</div>
          {data.source && (
            <div className="text-white/50 text-sm mt-1">{data.source}</div>
          )}
        </div>
      )}
    </div>
  )
}
