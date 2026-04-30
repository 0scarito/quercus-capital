/**
 * Parchment-toned skeleton mirroring the dashboard layout —
 * use while accounts/products are loading instead of grey blocks.
 */
export function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="skeleton-parchment h-9 w-48" />
        <div className="flex gap-2">
          <div className="skeleton-parchment h-9 w-28" />
          <div className="skeleton-parchment h-9 w-28" />
        </div>
      </div>
      <div className="border border-border p-6 space-y-4">
        <div className="skeleton-parchment h-3 w-32" />
        <div className="skeleton-parchment h-12 w-2/3 max-w-md" />
        <div className="skeleton-parchment h-3 w-40" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[0, 1].map((i) => (
          <div key={i} className="border border-border p-5 space-y-3">
            <div className="skeleton-parchment h-3 w-24" />
            <div className="skeleton-parchment h-6 w-40" />
            <div className="skeleton-parchment h-3 w-32" />
          </div>
        ))}
      </div>
      <div className="border border-border p-5 space-y-3">
        <div className="skeleton-parchment h-3 w-32" />
        <div className="skeleton-parchment h-16 w-full" />
      </div>
    </div>
  );
}