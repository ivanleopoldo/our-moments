import { cn } from "@/lib/utils";
import { Entypo } from "@expo/vector-icons";
import dayjs, { Dayjs } from "dayjs";
import DateTimePicker, { useDefaultClassNames } from "rndtpkr";

export type DatePickerProps = {
  date: Dayjs;
  onChange: (date: Dayjs) => void;
};

export default function DatePicker({ ...props }: DatePickerProps) {
  const defaultClassNames = useDefaultClassNames();

  return (
    <DateTimePicker
      mode="single"
      date={props.date}
      showOutsideDays
      minDate={dayjs(new Date(0))}
      maxDate={dayjs()}
      components={{
        IconPrev: <Entypo name="chevron-left" className="text-foreground" />,
        IconNext: <Entypo name="chevron-right" className="text-foreground" />,
      }}
      onChange={({ date }) => props.onChange(dayjs(date))}
      classNames={{
        ...defaultClassNames,
        today: "bg-input/30 rounded-2xl border-border border",
        today_label: "font-bold text-foreground",
        selected: cn(
          defaultClassNames.selected,
          "bg-accent border-border border rounded-2xl",
        ),
        selected_label: "font-bold text-foreground",
        button_next: cn(
          defaultClassNames.button_next,
          "w-10 h-10 items-center justify-center rounded-full border-border border bg-input/30",
        ),
        button_prev: cn(
          defaultClassNames.button_prev,
          "w-10 h-10 items-center justify-center rounded-full border-border border bg-input/30",
        ),
        month_selector: cn(
          defaultClassNames.month_selector,
          "p-3 border-border border rounded-full bg-input/30 text-foreground font-semibold",
        ),
        year_selector: cn(
          defaultClassNames.year_selector,
          "p-3 border-border border rounded-full bg-input/30 text-foreground font-semibold",
        ),
        outside: "opacity-50",
        month_selector_label: cn(
          defaultClassNames.month_selector_label,
          "text-sm font-semibold text-foreground",
        ),
        year_selector_label: cn(
          defaultClassNames.year_selector_label,
          "text-sm font-semibold text-foreground",
        ),
        selected_month: "bg-accent border-border border rounded-2xl",
        selected_month_label: "font-semibold text-foreground",
      }}
    />
  );
}
