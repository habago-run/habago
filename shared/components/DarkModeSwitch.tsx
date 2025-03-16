"use client";

import { useEffect, useState } from "react";
import { Switch } from "@heroui/switch";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

export default function DarkModeSwitch() {
    const [mounted, setMounted] = useState(false)
    const { theme, setTheme } = useTheme();
    const handleThemeChange = () => {
        if (theme === "dark") {
            setTheme("light");
        } else {
            setTheme("dark");
        }
    };

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) return null

    const isLightTheme = theme === "light";

    return (
        <Switch
            aria-label="Switch dark mode"
            isSelected={isLightTheme}
            onChange={handleThemeChange}
            color="warning"
            endContent={<MoonIcon />}
            size="lg"
            startContent={<SunIcon />}
        />
    );
}
