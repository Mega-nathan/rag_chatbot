from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

from app.services.main import rag_retrive_context_llm, rag_retriver, llm

router = APIRouter()

class QueryRequest(BaseModel):
    query: str
    top_k: int = 3

class SourceDocument(BaseModel):
    id: str
    content: str
    metadata: Dict[str, Any]
    similarity_score: float
    distance: float
    rank: int

class QueryResponse(BaseModel):
    query: str
    response: str
    sources: Optional[List[SourceDocument]] = None

@router.post("/query", response_model=QueryResponse)
def query_rag(request: QueryRequest):
    if not request.query.strip():
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    try:
        # Get the retrieved docs (sources)
        results = rag_retriver.retrieve(request.query, top_k=request.top_k)
        
        # Call the existing RAG answer generation function
        answer = rag_retrive_context_llm(request.query, rag_retriver, llm, top_k=request.top_k)
        
        # sources_list = []
        # for doc in results:
        #     sources_list.append(SourceDocument(
        #         id=doc['id'],
        #         content=doc['content'],
        #         metadata=doc['metadata'],
        #         similarity_score=doc['similarity_score'],
        #         distance=doc['distance'],
        #         rank=doc['rank']
        #     ))
            
        return QueryResponse(
            query=request.query,
            response=answer,
            # sources=sources_list
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
