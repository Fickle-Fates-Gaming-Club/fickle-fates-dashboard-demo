"use client";

import * as React from "react";
import { Label, Pie, PieChart, Sector } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface HourData {
  hour: number;
  value: number;
  fill: string;
}

const colorDictionary = {
  0: "#1CAC78",//green
  1: "#1CAC78",
  2: "#1CAC78",
  3: "#1CAC78",
  4: "#1CAC78",
  5: "#1CAC78",
  6: "#FFFF00",//red
  7: "#FFFF00",
  8: "#FFFF00",
  9: "#FFFF00",
  10: "#FFFF00",
  11: "#FFFF00",
  12: "#FFA500",// orange
  13: "#FFA500",
  14: "#FFA500",
  15: "#FFA500",
  16: "#FFA500",
  17: "#FFA500",
  18: "#FF0000",//yellow
  19: "#FF0000",
  20: "#FF0000",
  21: "#FF0000",
  22: "#FF0000",
  23: "#FF0000",
};

const initialChartData: HourData[] = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  value: 1,
  fill: "hsl(var(--muted))",
}));

const chartConfig: ChartConfig = Object.fromEntries(
  initialChartData.map(({ hour, fill }) => [
    hour,
    {
      label: `${hour}:00`,
      color: fill,
    },
  ])
);

function DoomsdayClockWidget() {
  const [activeSegments, setActiveSegments] = React.useState<Set<number>>(
    new Set()
  );
  const [chartData, setChartData] =
    React.useState<HourData[]>(initialChartData);

  const handleClick = (entry: HourData) => {
    console.log(entry)
    const newActiveIdxs = Array.from(Array(entry.hour + 1).keys());
    setActiveSegments(() => new Set(newActiveIdxs));
    setChartData((prevChartData) => prevChartData.map((entry:HourData) => ({
      ...entry,
      fill: newActiveIdxs.includes(entry.hour)
        ? colorDictionary[entry.hour as keyof typeof colorDictionary]
        : "hsl(var(--muted))",
    })));
  };

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } =
      props;

    return (
      <g>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="items-center pb-0">
        <CardTitle className="widget-title">Doomsday Clock</CardTitle>
        <CardDescription>Click segments to progress the clock</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="relative mx-auto aspect-square">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <PieChart>
              {/* <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              /> */}
              <Pie
                activeShape={renderActiveShape}
                data={chartData.toReversed()}
                dataKey="value"
                innerRadius={100}
                nameKey="hour"
                outerRadius={160}
                onClick={(entry, index) =>
                  handleClick(entry as HourData, index)
                }
                strokeWidth={2}
                stroke="hsl(var(--border))"
                startAngle={-270}
                endAngle={90}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="clock-time fill-foreground text-3xl font-bold"
                          >
                            {activeSegments.size.toString().padStart(2, "0")}:00
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="clock-time-subhead fill-muted-foreground text-sm"
                          >
                            Current Time
                          </tspan>
                        </text>
                      );
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <div className="absolute inset-0 pointer-events-none">
            <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"></div>
            <div className="w-2 h-2 bg-red-500 rounded-full absolute top-1/2 left-0 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2 pt-4 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Click segments to toggle active hours
        </div>
        <div className="leading-none text-muted-foreground">
          24-hour clock representation
        </div>
      </CardFooter>
    </Card>
  );
}

export default DoomsdayClockWidget;
