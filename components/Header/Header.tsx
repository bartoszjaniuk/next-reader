import { useThemeMode } from "@/hooks/useThemeMode";

export const Header = () => {
  const { renderThemeToggler } = useThemeMode();

  return (
    <header className="flex justify-end pr-16 py-5 w-full">
      {renderThemeToggler()}
    </header>
  );
};
