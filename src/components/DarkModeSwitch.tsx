"use client";

import { Switch } from "@heroui/switch";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

export default function DarkModeSwitch() {

    const { theme, setTheme } = useTheme();
    const handleThemeChange = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };
    return (
        <Switch
            aria-label="Switch dark mode"
            isSelected={theme === "light"}
            onChange={handleThemeChange}
            color="warning"
            endContent={<MoonIcon />}
            size="lg"
            startContent={<SunIcon />}
        />
    );
}
