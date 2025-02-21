import React from "react";
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

type HeaderProps = {
  headerLabel: string;
  bodyLabel: string;
};
const Header = ({ headerLabel, bodyLabel }: HeaderProps) => {
  return (
    <div>
      <CardHeader>
        <CardTitle className="font-grotesk text-3xl" >{headerLabel}</CardTitle>

        <CardDescription className="font-inter">{bodyLabel}</CardDescription>
      </CardHeader>
    </div>
  );
};

export default Header;