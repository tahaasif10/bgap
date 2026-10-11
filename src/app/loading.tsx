export default function Loading() {
  return (
    <div role="status" className="flex min-h-[50vh] items-center justify-center">
      <div className="size-8 animate-spin rounded-full border-2 border-line border-t-brand-700" />
      <span className="sr-only">Loading</span>
    </div>
  );
}