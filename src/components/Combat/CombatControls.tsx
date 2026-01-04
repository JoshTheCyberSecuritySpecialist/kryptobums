import { CombatButton } from './CombatButton';

interface CombatControlsProps {
  onAction: (action: string) => void;
  disabled?: boolean;
}

export const CombatControls = ({ onAction, disabled = false }: CombatControlsProps) => {
  return (
    <div className="inline-grid grid-cols-2 gap-2 w-fit">
      <CombatButton label="Light Hit" onClick={() => onAction('light')} disabled={disabled} />
      <CombatButton label="Heavy Hit" onClick={() => onAction('heavy')} disabled={disabled} />
      <CombatButton label="Block" onClick={() => onAction('block')} disabled={disabled} />
      <CombatButton label="Dodge" onClick={() => onAction('dodge')} disabled={disabled} />
      <CombatButton label="Taunt" onClick={() => onAction('taunt')} disabled={disabled} />
      <CombatButton label="Cheap Shot" onClick={() => onAction('cheap')} disabled={disabled} />
    </div>
  );
};
