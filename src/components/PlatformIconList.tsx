import { HStack } from "@chakra-ui/react";
import { FaWindows, FaPlaystation, FaXbox, FaGamepad } from "react-icons/fa";
import { SiSteam } from "react-icons/si";
import { BiJoystick } from "react-icons/bi";
import type { Platform } from "../hooks/useGames";

interface Props {
  platforms: Platform[];
}

const PlatformIconList = ({ platforms }: Props) => {
  const getPlatformIcon = (name: string) => {
    const platform = name.toLowerCase();

    if (platform.includes("windows") || platform === "pc") {
      return <FaWindows title={name} />;
    }

    if (platform.includes("playstation")) {
      return <FaPlaystation title={name} />;
    }

    if (platform.includes("xbox")) {
      return <FaXbox title={name} />;
    }

    if (platform.includes("nintendo switch")) {
      return <BiJoystick title={name} />;
    }

    if (platform.includes("steam")) {
      return <SiSteam title={name} />;
    }

    return <FaGamepad title={name} />;
  };

  return (
    <HStack gap={3} flexWrap="wrap">
      {platforms.map((platform) => (
        <span key={platform.id}>{getPlatformIcon(platform.name)}</span>
      ))}
    </HStack>
  );
};

export default PlatformIconList;
