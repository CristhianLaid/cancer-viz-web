import { Card, CardContent, CardHeader, CardTitle } from "@/ui/shadcn/card";

export interface ICardContent {
    title:      string;
    icon?:       React.ComponentType<{ className: string }>;
    children:   React.ReactNode;
} 


export const CardSimple = ({ title, icon: Icon, children }: ICardContent) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center text-foreground">
            {Icon && (
                <Icon className="w-5 h-5 mr-2" />
            )}
            {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
       {children}
      </CardContent>
    </Card>
  );
};

