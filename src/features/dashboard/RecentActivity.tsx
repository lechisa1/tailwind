import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";

const activities = [
  {
    id: 1,
    user: { name: "Alice Johnson", avatar: "AJ" },
    action: "created project",
    target: "E-commerce Redesign",
    time: "2 hours ago",
    type: "success",
  },
  {
    id: 2,
    user: { name: "Bob Smith", avatar: "BS" },
    action: "completed",
    target: "Internal CRM",
    time: "4 hours ago",
    type: "success",
  },
  {
    id: 3,
    user: { name: "Charlie Davis", avatar: "CD" },
    action: "added comment to",
    target: "Mobile App Alpha",
    time: "6 hours ago",
    type: "info",
  },
  {
    id: 4,
    user: { name: "Diana Prince", avatar: "DP" },
    action: "invited",
    target: "Ethan Hunt",
    time: "1 day ago",
    type: "info",
  },
  {
    id: 5,
    user: { name: "Ethan Hunt", avatar: "EH" },
    action: "updated",
    target: "Project Alpha",
    time: "1 day ago",
    type: "warning",
  },
];

export function RecentActivity() {
  const getBadgeVariant = (type: string) => {
    switch (type) {
      case "success":
        return "default";
      case "warning":
        return "secondary";
      case "error":
        return "destructive";
      default:
        return "outline";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Avatar
                initials={activity.user.avatar}
                className="h-10 w-10 flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  <span className="text-gray-600">{activity.action}</span>{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant={getBadgeVariant(activity.type)} size="sm">
                    {activity.type}
                  </Badge>
                  <span className="text-xs text-gray-500 truncate">{activity.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
