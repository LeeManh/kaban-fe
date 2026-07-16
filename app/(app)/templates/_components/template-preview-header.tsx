export function TemplatePreviewHeader({ name }: { name: string }) {
  return (
    <div className="flex h-14 flex-none items-center gap-1.5 bg-black/30 px-4">
      <span className="truncate text-[15px] font-semibold text-white">{name}</span>
    </div>
  );
}
