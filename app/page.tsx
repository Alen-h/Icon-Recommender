"use client";

import { useState, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles, Search, AlertCircle } from "lucide-react";
import * as IconPark from "@icon-park/react";
import { config } from "../config.local.js";

interface IconRecommendation {
  name: string;
  reason: string;
}

interface LLMResponse {
  icons: IconRecommendation[];
}

interface IconParkIconData {
  id: number;
  title: string;
  name: string;
  category: string;
  categoryCN: string;
  author: string;
  tag: string[];
  rtl: boolean;
}

// Icon props interface for IconPark components
interface IconProps {
  size?: number;
  theme?: "outline" | "filled" | "two-tone" | "multi-color";
  strokeWidth?: number;
  className?: string;
}

// Component to dynamically render Iconpark icons
const IconParkIcon = ({ iconName, size = 32 }: { iconName: string; size?: number }) => {
  // Convert kebab-case to PascalCase for IconPark component names
  const toPascalCase = (str: string) => {
    return str
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  };

  const componentName = toPascalCase(iconName);
  
  // Get the icon component safely
  let IconComponent: React.ComponentType<IconProps> | undefined;
  try {
    IconComponent = (IconPark as unknown as Record<string, React.ComponentType<IconProps>>)[componentName];
  } catch (error) {
    console.warn(`Icon ${iconName} (${componentName}) not found in IconPark library:`, error);
  }

  if (!IconComponent) {
    return (
      <div className="flex items-center justify-center w-8 h-8 bg-muted rounded border-2 border-dashed border-muted-foreground/30">
        <AlertCircle className="w-4 h-4 text-muted-foreground" />
      </div>
    );
  }

  return (
    <IconComponent 
      size={size} 
      theme="outline" 
      strokeWidth={2}
      className="text-primary"
    />
  );
};

export default function Home() {
  const [requirement, setRequirement] = useState("");
  const [recommendations, setRecommendations] = useState<IconRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableIcons, setAvailableIcons] = useState<Set<string>>(new Set());

  // Function to load available icons from IconPark
  const loadAvailableIcons = async (): Promise<Set<string>> => {
    try {
      const response = await fetch('/icons/iconpark.json');
      if (!response.ok) {
        console.warn('Could not load iconpark.json, all icons will be shown');
        return new Set();
      }
      const icons: IconParkIconData[] = await response.json();
      return new Set(icons.map(icon => icon.name));
    } catch (err) {
      console.error('Error loading available icons:', err);
      return new Set();
    }
  };

  // Function to load system prompt from file
  const loadSystemPrompt = async (): Promise<string> => {
    try {
      const response = await fetch('/system-prompt.md');
      if (!response.ok) {
        throw new Error('Failed to load system prompt');
      }
      const content = await response.text();
      return content;
    } catch (err) {
      console.error('Error loading system prompt:', err);
      // Fallback to a basic prompt if file can't be loaded
      return "You are an expert UI/UX design assistant specializing in iconography for the Iconpark icon library. Provide icon recommendations in JSON format with 'icons' array containing 'name' and 'reason' fields.";
    }
  };

  // Load available icons on component mount
  useEffect(() => {
    const loadIcons = async () => {
      const icons = await loadAvailableIcons();
      setAvailableIcons(icons);
    };
    loadIcons();
  }, []);

  const handleSubmit = async () => {
    if (!requirement.trim()) {
      setError("Please enter your icon requirement");
      return;
    }

    setIsLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      // Load the system prompt from the markdown file
      const systemPrompt = await loadSystemPrompt();

      const response = await fetch(config.GLM_API_URL, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${config.GLM_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "glm-4.5-flash",
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: requirement
            }
          ],
          thinking: {
            type: "disabled"
          },
          temperature: 0.8,
          max_tokens: 4096,
          response_format: {
            type: "json_object"
          }
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;
      
      console.log(content);
      if (!content) {
        throw new Error("No content received from the API");
      }

      const parsedResponse: LLMResponse = JSON.parse(content);
      setRecommendations(parsedResponse.icons || []);
    } catch (err) {
      console.error("Error calling LLM API:", err);
      setError(err instanceof Error ? err.message : "An error occurred while fetching recommendations");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Icon Recommender
            </h1>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get personalized icon recommendations powered by AI. Describe what you need, and get curated suggestions from the Iconpark library.
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Describe Your Icon Requirements
            </CardTitle>
            <CardDescription>
              Tell us what kind of icon you need. Be specific about the context, style, or function.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="e.g., I need an icon for a delete button in my mobile app, or I'm looking for icons for a user profile section..."
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={4}
              className="resize-none"
            />
            {error && (
              <p className="text-destructive text-sm font-medium">{error}</p>
            )}
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">
                Press <kbd className="bg-muted px-1.5 py-0.5 rounded text-xs">Cmd+Enter</kbd> to submit
              </p>
              <Button 
                onClick={handleSubmit} 
                disabled={isLoading || !requirement.trim()}
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Getting Recommendations...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Get Recommendations
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {recommendations.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Recommended Icons</h2>
              {(() => {
                const filteredRecommendations = recommendations.filter(icon => 
                  availableIcons.size === 0 || availableIcons.has(icon.name)
                );
                const filteredCount = recommendations.length - filteredRecommendations.length;
                return filteredCount > 0 && (
                  <p className="text-sm text-muted-foreground">
                    {filteredCount} icon{filteredCount > 1 ? 's' : ''} filtered out (not available in library)
                  </p>
                );
              })()}
            </div>
            <div className="grid gap-4 md:gap-6">
              {recommendations
                .filter(icon => {
                  // Only show icons that exist in the IconPark library
                  // If availableIcons is empty (failed to load), show all icons
                  return availableIcons.size === 0 || availableIcons.has(icon.name);
                })
                .map((icon, index) => (
                  <Card key={index} className="transition-colors hover:bg-accent/50">
                    <CardContent className="pt-6">
                      <div className="grid md:grid-cols-[auto_200px_1fr] gap-4 items-start">
                        <div className="flex items-center justify-center w-16 h-16 bg-background border rounded-lg shadow-sm">
                          <IconParkIcon iconName={icon.name} size={32} />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-primary">
                            {icon.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Iconpark Library
                          </p>
                          <div className="mt-2 text-xs text-muted-foreground bg-muted px-2 py-1 rounded font-mono">
                            {icon.name}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm leading-relaxed">
                            {icon.reason}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </div>
        )}

        {/* Empty state when no results */}
        {!isLoading && recommendations.length === 0 && requirement && !error && (
          <Card>
            <CardContent className="pt-6 text-center">
              <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No recommendations found. Try describing your requirements differently.
              </p>
            </CardContent>
          </Card>
        )}
        </div>
    </div>
  );
}
