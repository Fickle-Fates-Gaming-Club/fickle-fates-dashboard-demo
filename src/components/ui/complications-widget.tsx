"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

interface Complication {
  id: number;
  text: string;
  resolved: boolean;
}

export default function ComplicationsWidget() {
  const [complications, setComplications] = useState<Complication[]>([]);
  const [newComplication, setNewComplication] = useState("");

  const addComplication = () => {
    if (newComplication.trim() !== "") {
      setComplications([
        ...complications,
        { id: Date.now(), text: newComplication, resolved: false },
      ]);
      setNewComplication("");
    }
  };

  const toggleComplication = (id: number) => {
    setComplications(
      complications.map((complication) =>
        complication.id === id
          ? { ...complication, resolved: !complication.resolved }
          : complication
      )
    );
  };

  const deleteComplication = (id: number) => {
    setComplications(
      complications.filter((complication) => complication.id !== id)
    );
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="widget-title">Complications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {complications.map((complication) => (
            <div key={complication.id} className="flex items-center space-x-2">
              <Checkbox
                checked={complication.resolved}
                onCheckedChange={() => toggleComplication(complication.id)}
              />
              <span
                className={`flex-grow ${
                  complication.resolved ? "line-through text-gray-500" : ""
                }`}
              >
                {complication.text}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteComplication(complication.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            addComplication();
          }}
          className="flex w-full space-x-2"
        >
          <Input
            value={newComplication}
            onChange={(e) => setNewComplication(e.target.value)}
            placeholder="Add a new complication..."
            className="flex-grow"
          />
          <Button type="submit">Add</Button>
        </form>
      </CardFooter>
    </Card>
  );
}
