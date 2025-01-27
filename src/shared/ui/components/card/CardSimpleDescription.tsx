import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/ui/shadcn/card";
import { ICardContent } from "./CardSimple";

export interface ICardContentDescription extends ICardContent {
    description:    string;
}

export const CardSimpleDescription = ({ title, description, children }: ICardContentDescription) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
};
