#Complete Ingestion Pipeline
from preprocessing  import process_all_Pdfs,split_documents
from embeddings import EmbeddingManager
from vectorstore import VectorStore

def ingest_pipeline(pdf_dir: str = None):
    if pdf_dir is None:
        import os
        current_dir = os.path.dirname(os.path.abspath(__file__))
        pdf_dir = os.path.abspath(os.path.join(current_dir, "..", "data", "pdfs"))
    all_pdf_document = process_all_Pdfs(pdf_dir)
    chunks = split_documents(all_pdf_document)

    embedding_manager = EmbeddingManager()
    vectorstore = VectorStore()

    texts = [doc.page_content for doc in chunks]
    embeddings = embedding_manager.generate_embeddings(
        texts,
        batch_size=256
    )

    vectorstore.add_documents(chunks, embeddings)


if __name__ == "__main__":
    ingest_pipeline()
