import { Label } from "components/ui/label";
import {
  RadioGroup as RadioGroupUI,
  RadioGroupItem,
} from "components/ui/radio-group";
import React, { ReactEventHandler } from "react";

const VALUES = [
  { label: "Foo", value: "foo" },
  { label: "Bar", value: "bar" },
  { label: "Baz", value: "baz" },
];

interface Props {
  onSelectEvent: ReactEventHandler<HTMLButtonElement>;
}

export function RadioGroup({ onSelectEvent }: Props) {
  return (
    <RadioGroupUI defaultValue="foo">
      {VALUES.map((item) => (
        <div key={item.value} className="flex items-center space-x-2">
          <RadioGroupItem value={item.value} id="r1" onSelect={onSelectEvent} />
          <Label htmlFor="r1">{item.label}</Label>
        </div>
      ))}
    </RadioGroupUI>
  );
}
