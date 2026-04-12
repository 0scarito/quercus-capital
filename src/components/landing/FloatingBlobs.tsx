export function FloatingBlobs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      <div
        className="absolute -top-1/4 -left-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.07] will-change-transform"
        style={{
          background: 'radial-gradient(circle, hsl(170 100% 16%) 0%, transparent 70%)',
          filter: 'blur(80px)',
          animation: 'blob-drift-1 25s ease-in-out infinite',
        }}
      />
      <div
        className="absolute top-1/3 -right-1/4 w-[50vw] h-[50vw] rounded-full opacity-[0.06] will-change-transform"
        style={{
          background: 'radial-gradient(circle, hsl(140 60% 85%) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'blob-drift-2 30s ease-in-out infinite',
        }}
      />
      <div
        className="absolute -bottom-1/4 left-1/3 w-[45vw] h-[45vw] rounded-full opacity-[0.05] will-change-transform"
        style={{
          background: 'radial-gradient(circle, hsl(173 50% 19%) 0%, transparent 70%)',
          filter: 'blur(90px)',
          animation: 'blob-drift-3 20s ease-in-out infinite',
        }}
      />
    </div>
  );
}
