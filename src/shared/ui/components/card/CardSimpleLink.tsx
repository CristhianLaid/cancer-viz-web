import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/card";
import Link from "next/link";
import { ICardContentDescription } from "./CardSimpleDescription";

interface ICardContentLink extends ICardContentDescription {
  href: string;
  label_link: string;
}

export const CardSimpleLink = ({
  title,
  description,
  icon: Icon,
  children,
  href,
  label_link,
}: ICardContentLink) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <Link
          href={href}
          className="text-primary hover:underline flex items-center group"
          target="_blank"
          rel="noopener noreferrer"
        >
          {label_link}
          {Icon && <Icon className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />}
        </Link>
      </CardContent>
    </Card>
  );
};
