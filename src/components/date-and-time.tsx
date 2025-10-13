import { View } from "react-native";
import { Pill, PillList } from "./pill";

export type DateAndTimeProps = {
  date?: Date;
};

export function DateAndTime({ date }: DateAndTimeProps) {
  const current = date ?? new Date();

  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const month = monthNames[current.getMonth()];
  const day = current.getDate();
  const year = current.getFullYear();
  const weekday = dayNames[current.getDay()];

  let hours = current.getHours();
  const minutes = current.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) hours = 12;
  const minutesStr = minutes.toString().padStart(2, "0");
  const time = `${hours}:${minutesStr} ${ampm}`;

  return (
    <View className="w-full flex-row items-center justify-between">
      <PillList>
        <Pill>{month}</Pill>
        <Pill>{day}</Pill>
        <Pill>{year}</Pill>
      </PillList>
      <PillList>
        <Pill>{weekday}</Pill>
        <Pill>{time}</Pill>
      </PillList>
    </View>
  );
}
