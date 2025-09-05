import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Function to load system prompt
const loadSystemPrompt = async (): Promise<string> => {
  const filePath = path.join(process.cwd(), 'public', 'system-prompt.md');
  const content = fs.readFileSync(filePath, 'utf-8');
  return content;
};

export async function POST(request: NextRequest) {
  try {
    const { requirement } = await request.json();

    if (!requirement) {
      return NextResponse.json(
        { error: 'Requirement is required' },
        { status: 400 }
      );
    }

    // Load the system prompt from the markdown file
    const systemPrompt = await loadSystemPrompt();

    const response = await fetch("https://open.bigmodel.cn/api/paas/v4/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GLM_API_TOKEN}`,
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
      const errorText = await response.text();
      console.error('GLM API Error:', response.status, errorText);
      return NextResponse.json(
        { error: `GLM API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      return NextResponse.json(
        { error: "No content received from the API" },
        { status: 500 }
      );
    }

    // Parse the JSON response from GLM
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(content);
    } catch (parseError) {
      console.error('Failed to parse GLM response:', parseError);
      console.error('Raw GLM response content:', content);
      return NextResponse.json(
        { error: "Invalid response format from GLM API", details: content.substring(0, 200) },
        { status: 500 }
      );
    }

    return NextResponse.json(parsedResponse);

  } catch (error) {
    console.error("Error in recommend API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
