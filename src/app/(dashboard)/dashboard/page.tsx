"use client";

import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  RotateCcw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";

const stats = [
  {
    title: "Total customers",
    value: "567,899",
    change: "+2.5%",
    isPositive: true,
    icon: DollarSign,
  },
  {
    title: "Total revenue",
    value: "$3,465 M",
    change: "+6.5%",
    isPositive: true,
    icon: TrendingUp,
  },
  {
    title: "Total orders",
    value: "1,136 M",
    change: "-0.3%",
    isPositive: false,
    icon: ShoppingCart,
  },
  {
    title: "Total returns",
    value: "1,789",
    change: "+1.5%",
    isPositive: true,
    icon: RotateCcw,
  },
];

const categoryData = [
  { name: "Living room", value: 26, color: "#818CF8" },
  { name: "Kids", value: 17, color: "#F59E0B" },
  { name: "Office", value: 13, color: "#10B981" },
  { name: "Bedroom", value: 12, color: "#EC4899" },
  { name: "Dining room", value: 6, color: "#8B5CF6" },
  { name: "Bathroom", value: 8, color: "#14B8A6" },
  { name: "Decor", value: 5, color: "#F97316" },
  { name: "Lighting", value: 3, color: "#06B6D4" },
  { name: "Outdoor", value: 2, color: "#84CC16" },
];

const countryData = [
  { country: "Poland", value: "70%", color: "#818CF8" },
  { country: "Austria", value: "16%", color: "#10B981" },
  { country: "Spain", value: "13%", color: "#F59E0B" },
  { country: "Romania", value: "12%", color: "#EC4899" },
  { country: "France", value: "11%", color: "#8B5CF6" },
  { country: "Italy", value: "10%", color: "#14B8A6" },
  { country: "Germany", value: "10%", color: "#F97316" },
  { country: "Ukraine", value: "9%", color: "#06B6D4" },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <h3 className="text-2xl font-bold mb-2">{stat.value}</h3>
                  <div className="flex items-center gap-1">
                    {stat.isPositive ? (
                      <TrendingUp className="w-4 h-4 text-green-500" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500" />
                    )}
                    <span
                      className={`text-sm font-medium ${
                        stat.isPositive ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sales Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Product sales
            </CardTitle>
          </CardHeader>
          <CardContent>
            {/* <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="grossMargin"
                  fill="#3B82F6"
                  radius={[4, 4, 0, 0]}
                  name="Gross margin"
                />
                <Bar
                  dataKey="revenue"
                  fill="#F59E0B"
                  radius={[4, 4, 0, 0]}
                  name="Revenue"
                />
              </BarChart>
            </ResponsiveContainer> */}
          </CardContent>
        </Card>

        {/* Countries */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Sales by countries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {countryData.map((country) => (
                <div key={country.country} className="flex items-center gap-3">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: country.color }}
                  />
                  <span className="flex-1 text-sm">{country.country}</span>
                  <span className="text-sm font-semibold">{country.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">
            Sales by product category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            <div className="w-full lg:w-1/3">
              {/* <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer> */}
            </div>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-4">
              {categoryData.map((category) => (
                <div key={category.name} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: category.color }}
                  />
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {category.name}
                    </p>
                    <p className="text-sm font-semibold">{category.value}%</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
