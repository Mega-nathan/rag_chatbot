# import sentence_transformers.util import normalize_embeddings
import os 

# pyrefly: ignore [missing-import]
from langchain_community.document_loaders import PyPDFLoader
# pyrefly: ignore [missing-import]
from langchain_text_splitters import RecursiveCharacterTextSplitter
from pathlib import Path

def process_all_Pdfs(pdf_directory):

    all_documents=[]
    pdf_dir = Path(pdf_directory)

    pdf_files = list(pdf_dir.glob("**/*.pdf"))
    print(f"Found {len(pdf_files)}")

    for file in pdf_files:
        print(f"Processing {file.name} ")
        try:
            loader = PyPDFLoader(str(file))
            docs = loader.load()

            for doc in docs: 
                doc.metadata['source_file']=file.name
                doc.metadata['file_type']='pdf'

            all_documents.extend(docs)
            print(f"Loaded {len(docs)} Pages")
        except Exception as e:
            print(e)
    
    # print(f"\nTotal Documents Loaded {len(pdf_files)}")
    print(f"\nTotal Documents Loaded: {len(all_documents)}")
    return all_documents

### Chunking docs to smaller docs

def split_documents(documents,chunk_size=400,chunk_overlap=50):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
        length_function=len,
        # separators=["/n/n","/n"," ",""]
        separators=["\n\n","\n"," ",""]
    )

    split_docs = text_splitter.split_documents(documents)
    print(f"Splited {len(documents)} files into {len(split_docs)} chunks")

    return split_docs