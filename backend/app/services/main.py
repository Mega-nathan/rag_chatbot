## LLM 

from vectorstore import VectorStore
from embeddings import EmbeddingManager
from retriver import RAGRetriver

# pyrefly: ignore [missing-import]
from langchain_groq import ChatGroq
import os 
from dotenv import load_dotenv
load_dotenv()

groq_api_key = os.getenv("GROQ_API_KEY")

if not groq_api_key:
    raise ValueError("GROQ_API_KEY not found in .env file.")

embedding_manager = EmbeddingManager()
vectorstore = VectorStore()
rag_retriver = RAGRetriver(vectorstore,embedding_manager)

# print(rag_retriver.retrieve(query))

llm=ChatGroq(groq_api_key=groq_api_key,model_name="llama-3.1-8b-instant",temperature=0.1,max_tokens=1024)

def rag_retrive_context_llm(query,retriver,llm,top_k=3):

    results = retriver.retrieve(query,top_k=top_k)
    context = "\n\n".join([doc['content'] for doc in results]) if results else ""
    if not context:
        print("No Relevants Context Found to Answer the Question")
    
    prompt=f"""" Use the following context to the answer the query concisely 
    Context:{context}
    Query:{query}
    From this context , i want you to structure & tweak a respone in way based on the query. Don't add unnecessary information.
    """

    response = llm.invoke([prompt.format(context=context,query=query)])
    return response.content
    

if __name__ == "__main__":
    query=input("Enter Query : ")
    answer = rag_retrive_context_llm(query,rag_retriver,llm)
    print(answer)