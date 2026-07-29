import sys
from pathlib import Path

# Add the daimon runtime to path for pypdf
sys.path.insert(0, str(Path(sys.executable).parent.parent.parent))

try:
    from pypdf import PdfReader
except ImportError:
    print("pypdf not available, trying PyPDF2")
    from PyPDF2 import PdfReader

reader = PdfReader(r"D:\Opencode\Portfolio-main\public\resume.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

print(text)
