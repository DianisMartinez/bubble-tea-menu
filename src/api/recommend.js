import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {

  const drinks = [
    "Brown Sugar Boba",
    "Taro Milk Tea",
    "Matcha Milk Tea",
    "Maracuyá Tea con Popping"
  ];

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Recomienda una bebida de esta lista y escribe un mensaje corto y divertido: ${drinks}`
      }
    ]
  });

  res.json({
    message: completion.choices[0].message.content
  });

}