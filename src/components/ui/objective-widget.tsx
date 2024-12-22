"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Edit2 } from "lucide-react";

interface Objective {
  id: number;
  description: string;
  completed: boolean;
}

export default function ObjectiveWidget() {
  const [title, setTitle] = useState("Mission Objective");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [objective, setObjective] = useState<Objective | null>(null);
  const [newObjectiveText, setNewObjectiveText] = useState("");

  const handleTitleEdit = () => {
    setIsEditingTitle(true);
  };

  const handleTitleSave = () => {
    setIsEditingTitle(false);
  };

  const addObjective = () => {
    if (newObjectiveText.trim() !== "") {
      setObjective({
        id: Date.now(),
        description: newObjectiveText,
        completed: false,
      });
      setNewObjectiveText("");
    }
  };

  const toggleObjective = () => {
    if (objective) {
      setObjective({ ...objective, completed: !objective.completed });
    }
  };

  const deleteObjective = () => {
    setObjective(null);
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader>
        {isEditingTitle ? (
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleSave}
            onKeyPress={(e) => e.key === "Enter" && handleTitleSave()}
            className="text-2xl font-bold"
            autoFocus
          />
        ) : (
          <CardTitle className="widget-title flex justify-between items-center">
            {title}
            {/* <Button variant="ghost" size="sm" onClick={handleTitleEdit}>
              <Edit2 className="h-4 w-4" />
            </Button> */}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {objective && (
            <div className="max-w-[65%] flex items-center space-x-2">
              <Checkbox
                className="h-6 w-6 mt-1"
                checked={objective.completed}
                onCheckedChange={toggleObjective}
              />
              <span
                className={`flex-grow text-4xl ff-display font-400 ${
                  objective.completed ? "line-through text-gray-500" : ""
                }`}
              >
                {objective.description}
              </span>
              <Button variant="ghost" size="icon" onClick={deleteObjective}>
                <X className="h-6 w-6" />
              </Button>
            </div>
          )}
          {!objective && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addObjective();
              }}
              className="max-w-[65%] flex w-full space-x-2"
            >
              <Input
                value={newObjectiveText}
                onChange={(e) => setNewObjectiveText(e.target.value)}
                placeholder="Define Mission Objective..."
                className="flex-grow"
              />
              <Button type="submit">Set</Button>
            </form>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
