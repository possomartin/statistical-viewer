import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const generateData = (mean, sd, skew) => {
  let data = [];
  for (let i = -3; i <= 3; i += 0.5) {
    let value = Number(mean[0] + i * sd + skew * (Math.random() - 0.5));
    data.push({ x: value.toFixed(1), y: Math.exp(-Math.pow(value, 2)) });
    console.log(mean[0]);
  }
  return data;
};

export default function App() {
  const [mean, setMean] = useState(0);
  const [sd, setSD] = useState(1);
  const [skew, setSkew] = useState(0);
  const [data, setData] = useState(generateData(mean, sd, skew));

  useEffect(() => {
    setData(generateData(mean, sd, skew));
  }, [mean, sd, skew]);

  return (
    <div className="p-6 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">
        Statistical Concepts Visualizer
      </h1>
      <Card className="p-4 w-full max-w-2xl">
        <CardContent>
          <div className="mb-4">
            <label className="block font-semibold">Mean: {mean}</label>
            <Slider
              value={[mean]}
              min={0.5}
              max={5}
              step={0.1}
              onValueChange={setMean}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">
              Standard Deviation: {sd}
            </label>
            <Slider
              value={[sd]}
              min={0.5}
              max={5}
              step={0.1}
              onValueChange={setSD}
            />
          </div>
          <div className="mb-4">
            <label className="block font-semibold">Skew: {skew}</label>
            <Slider
              value={[skew]}
              min={-2}
              max={2}
              step={0.1}
              onValueChange={setSkew}
            />
          </div>
          <BarChart width={600} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="y" fill="#8884d8" />
          </BarChart>
        </CardContent>
      </Card>
    </div>
  );
}
