interface SummaryItem {
  label: string;
  value: string | React.ReactNode;
}

export const SummaryList = ({ items }: { items: SummaryItem[] }) => {
  return (
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li key={index} className="text-sm text-muted-foreground">
          <span className="font-medium text-foreground">{item.label}:</span>{" "}
          {item.value}
        </li>
      ))}
    </ul>
  );
};
