import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();

app.use(cors());
app.use(express.json());


const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


app.get("/", (req,res)=>{
  res.send("SmartLife AI Server online 🚀");
});


app.post("/chat", async (req,res)=>{

  try {

    const mensagem = req.body.message;


    const resposta = await client.chat.completions.create({

      model:"gpt-4o-mini",

      messages:[
        {
          role:"system",
          content:
          "És o assistente inteligente da SmartLife AI. Ajuda o utilizador a organizar a vida diária."
        },
        {
          role:"user",
          content:mensagem
        }
      ]

    });


    res.json({

      resposta:
      resposta.choices[0].message.content

    });


  } catch(error){

    console.log(error);

    res.status(500).json({

      erro:"Erro ao comunicar com a IA"

    });

  }

});


const PORT = process.env.PORT || 3000;


app.listen(PORT,()=>{

 console.log(
  "SmartLife AI Server ativo na porta "+PORT
 );

});
