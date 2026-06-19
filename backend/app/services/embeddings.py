### For Embedding and Vector DB 
import numpy as np
from sentence_transformers import SentenceTransformer
from typing import List, Any


### Embedding Manager Class ( Generate embeddings for plain text )
class EmbeddingManager:

    def __init__(self, model_name:str="BAAI/bge-small-en-v1.5"):

        self.model_name = model_name
        self.model = None 
        self._load_model()

    def _load_model(self):

        try:
            print(f"Loading Embedding Model:{self.model_name}")
            self.model = SentenceTransformer(self.model_name)
            print(f"Model Loaded Successfully. Embedding Dimension: {self.model.get_sentence_embedding_dimension()}")
        except Exception as e:
            print(f"Error Loading Model {self.model_name} : {e}")            
            raise 

    # def generate_embeddings(self, texts,batch_size: int = 256)->np.ndarray:

    #     if not self.model:
    #         raise ValueError("Model Not Loaded")
        
    #     print(f"Generating Embedding for {len(texts)} texts")
    #     embeddings = self.model.encode(texts, show_progress_bar=True,normalize_embeddings=True)
    #     print(f"Generated Embeddings with shape: {embeddings.shape}")
    #     return embeddings
    def generate_embeddings(self,texts: List[str],batch_size: int = 256) -> np.ndarray:

        if not self.model:
            raise ValueError("Model Not Loaded")

        print(f"Generating embeddings for {len(texts)} texts")

        all_embeddings = []

        for start_idx in range(0, len(texts), batch_size):

            batch_texts = texts[start_idx:start_idx + batch_size]

            batch_embeddings = self.model.encode(
                batch_texts,
                normalize_embeddings=True,
                show_progress_bar=False
            )

            all_embeddings.append(batch_embeddings)

            print(
                f"Processed "
                f"{min(start_idx + batch_size, len(texts))}"
                f"/{len(texts)} texts"
            )

        embeddings = np.vstack(all_embeddings)

        print(
            f"Generated embeddings with shape: "
            f"{embeddings.shape}"
        )

        return embeddings
