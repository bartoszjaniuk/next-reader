import { useThemeMode } from "@/hooks/useThemeMode";

export const Header = () => {
  const { renderThemeToggler } = useThemeMode();

  return (
    <header className="absolute right-10 top-9">{renderThemeToggler()}</header>
  );
};
