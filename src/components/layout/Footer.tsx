export function Footer() {
  return (
    <footer className="w-full py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center px-8 text-xs text-ghost font-mono bg-void">
      <div>
        &copy; 2025 QUESTION-MARK<span className="text-electric animate-pulse">.</span>AI
      </div>
      <div className="flex gap-8 mt-4 md:mt-0">
        <a href="#" className="hover:text-pure transition-colors">Legal</a>
        <a href="#" className="hover:text-pure transition-colors">Privacy</a>
      </div>
    </footer>
  )
}
