import { Box } from 'lucide-react';

interface DiagramPlaceholderProps {
  title: string;
  height?: string;
}

export const DiagramPlaceholder = ({ title, height = '300px' }: DiagramPlaceholderProps) => {
  return (
    <div
      className="border-2 border-[#00FF9C]/30 rounded-lg bg-[#14161A]/50 flex flex-col items-center justify-center gap-4 my-8"
      style={{ height }}
    >
      <Box className="w-12 h-12 text-[#00FF9C]/50" />
      <p className="text-[#9CA3AF] text-sm uppercase tracking-wider font-bold">
        Diagram: {title}
      </p>
    </div>
  );
};
