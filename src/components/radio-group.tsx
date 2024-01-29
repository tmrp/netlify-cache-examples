"use client";

import { Label } from "components/ui/label";
import {
  RadioGroup as RadioGroupUI,
  RadioGroupItem,
} from "components/ui/radio-group";

import React from "react";

const VALUES = [
  { label: "Foo", value: "foo" },
  { label: "Bar", value: "bar" },
  { label: "Baz", value: "baz" },
];

interface Props {
  onValueChange: (value: string) => void;
  defaultValue: string | undefined | null;
  disabled?: boolean;
}

export function RadioGroup({ defaultValue, disabled, onValueChange }: Props) {
  return (
    <RadioGroupUI
      defaultValue={defaultValue ?? VALUES[0].value}
      onValueChange={onValueChange}
      disabled={disabled}
    >
      {VALUES.map((item) => (
        <div key={item.value} className="flex items-center space-x-2">
          <RadioGroupItem value={item.value} id="r1" />
          <Label htmlFor="r1">{item.label}</Label>
        </div>
      ))}
    </RadioGroupUI>
  );
}
