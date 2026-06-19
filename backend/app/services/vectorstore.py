import os
import numpy as np
# pyrefly: ignore [missing-import]
import chromadb
# pyrefly: ignore [missing-import]
from chromadb.config import Settings
import uuid 
from typing import List , Dict , Any , Tuple

### Vector Store initializing and adding documents
class VectorStore:

    def __init__(self, collection_name: str = "pdf_documents", persist_directory: str = None):

        self.collection_name = collection_name
        if persist_directory is None:
            # Resolve relative to the location of this file
            current_dir = os.path.dirname(os.path.abspath(__file__))
            self.persist_directory = os.path.abspath(os.path.join(current_dir, "..", "db", "vector_store"))
        else:
            self.persist_directory = persist_directory
        self.client = None 
        self.collection = None 
        self._initialize_store()

    def _initialize_store(self):

        try:
            os.makedirs(self.persist_directory, exist_ok=True)
            self.client = chromadb.PersistentClient(path=self.persist_directory)

            # self.collection = self.client.get_or_create_collection(
            #     name=self.collection_name,
            #     metadata={"description":"PDF Document embeddings for RAG"}
            # )

            self.collection = self.client.get_or_create_collection(
                name=self.collection_name,
                metadata={"hnsw:space": "cosine"}
            )

            print(f"Vector store initialized. Collection: {self.collection_name}")
            print(f"Existing Document in Collection : {self.collection.count}")

        except Exception as e:
            print(f"Error initializing Vector Store : {e}");
            raise

    def add_documents(self, documents: List[Any] , embeddings : np.ndarray):

        if len(documents) != len(embeddings):
            raise ValueError("Number of documents must match number of embeddings")
        print(f"Adding {len(documents)} documents to vector store... ")

        ids=[]
        metadatas = []
        documents_text = []
        embeddings_list = []

        for i,(doc,embedding) in enumerate(zip(documents,embeddings)):

            doc_id = f"doc_{uuid.uuid4().hex[:8]}_{i}"
            ids.append(doc_id)

            metadata = dict(doc.metadata)
            metadata['doc_index']=i
            metadata['context_length']=len(doc.page_content)
            metadatas.append(metadata)

            documents_text.append(doc.page_content)
            embeddings_list.append(embedding.tolist())

        try:
            self.collection.add(
                ids=ids,
                embeddings=embeddings_list,
                metadatas=metadatas,
                documents=documents_text
            )
            print(f"successfull added {len(documents)} documents to vector store")
            print(f"Total Documents in collection {self.collection.count()}")

        except Exception as e:
            print(f"Error adding value to vector store : {e}")
            raise