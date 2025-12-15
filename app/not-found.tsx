import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-[#0f1110] text-ivory relative overflow-hidden">
      
   
      
      <h1 className="text-[120px] md:text-[200px] font-serif leading-none text-white/5 select-none">
        404
      </h1>
      
      <div className="absolute z-10 flex flex-col items-center text-center px-4">
        <h2 className="text-2xl md:text-3xl font-serif text-terra mb-4">
          Signal Lost
        </h2>
        <p className="text-white/60 max-w-md mb-8 leading-relaxed font-light">
          The coordinates you entered do not correspond to any known location in our charts. You may have ventured too far off the grid.
        </p>
        
        <Link 
          href="/"
          className="px-8 py-3 text-xs uppercase tracking-[0.2em] font-bold text-[#0f1110] bg-white hover:bg-terra transition-colors duration-300 rounded-sm"
        >
          Return to Base Camp
        </Link>
      </div>
    </div>
  )
}