import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

function PricingCard({ plan, className, ...props }: any) {
  return (
    <Card className={cn("w-[280px]", className)} {...props}>
      <CardHeader className="items-center">
        <CardTitle>{plan.title}</CardTitle>
        <CardDescription className="text-center">
          {plan.short_description}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {plan.characteristics.map((characteristic: string) => (
          <div
            key={characteristic}
            className=" flex items-center space-x-4 rounded-md border p-4"
          >
            <Check />
            <div className="flex-1 space-y-1">
              <p className="text-sm text-muted-foreground">{characteristic}</p>
            </div>
          </div>
        ))}
        <div></div>
      </CardContent>
      <CardFooter>
        <Button className="w-full bg-slate-500 text-white">
          Subscribirme al plan {plan.title}
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PricingCard;
