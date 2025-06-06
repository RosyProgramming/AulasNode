import { NextRequest, NextResponse } from "next/server";
import { openai } from '@ai-sdk/openai';
import { generateText } from "ai";

export async function GET (request: NextRequest){
    const result = await generateText({
        model: openai('gpt-4o'),
        prompt: 'Traduza "Hello word" para português!',
        system: 'Você é uma AI especializada em tradução, sempre retorne da maneira sucinta possível.'
    })

    return NextResponse.json({ message: result.text })
}