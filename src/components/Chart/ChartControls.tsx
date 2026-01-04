interface ChartControlsProps {
  showSMA20: boolean;
  showSMA50: boolean;
  showBB: boolean;
  onToggleSMA20: () => void;
  onToggleSMA50: () => void;
  onToggleBB: () => void;
}

export const ChartControls = ({
  showSMA20,
  showSMA50,
  showBB,
  onToggleSMA20,
  onToggleSMA50,
  onToggleBB,
}: ChartControlsProps) => {
  const Button = ({ active, onClick, label, color }: { active: boolean; onClick: () => void; label: string; color: string }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border transition-all
                 ${active ? `bg-${color} border-${color} text-black` : 'bg-[#1A1C20] border-[#2A2C30] text-gray-400 hover:border-gray-500'}`}
      style={{
        borderRadius: '2px',
        backgroundColor: active ? color : undefined,
        borderColor: active ? color : undefined,
      }}
    >
      {label}
    </button>
  );

  return (
    <div className="flex gap-2 items-center">
      <Button
        active={showSMA20}
        onClick={onToggleSMA20}
        label="SMA 20"
        color="#3B82F6"
      />
      <Button
        active={showSMA50}
        onClick={onToggleSMA50}
        label="SMA 50"
        color="#F59E0B"
      />
      <Button
        active={showBB}
        onClick={onToggleBB}
        label="BB"
        color="#6B7280"
      />
    </div>
  );
};
