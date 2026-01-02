import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface SectionCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export function SectionCard({ title, description, children, action }: SectionCardProps) {
  return (
    <Card className="shadow-sm">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription className="mt-1">{description}</CardDescription>}
          </div>
          {action && <div>{action}</div>}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    label: string;
    isPositive: boolean;
  };
}

export function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
            {trend && (
              <p
                className={`text-sm mt-2 ${
                  trend.isPositive ? "text-green-600" : "text-red-600"
                }`}
              >
                {trend.isPositive ? "+" : ""}
                {trend.value}% {trend.label}
              </p>
            )}
          </div>
          {icon && (
            <div className="p-3 bg-gradient-to-br from-apple-blue/10 to-apple-purple/10 rounded-xl">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
