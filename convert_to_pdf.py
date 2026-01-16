"""
Convert Markdown documentation files to PDF
"""
import markdown
import pdfkit
from pathlib import Path

# Files to convert
files_to_convert = [
    'USER_GUIDE.md',
    'QUICK_REFERENCE.md',
    'SOFTWARE_PURCHASE_AGREEMENT.md'
]

# HTML template for better PDF formatting
html_template = """
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            max-width: 800px;
            margin: 40px auto;
            padding: 20px;
            color: #333;
        }}
        h1 {{
            color: #2563eb;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 10px;
        }}
        h2 {{
            color: #1e40af;
            margin-top: 30px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
        }}
        h3 {{
            color: #1e3a8a;
        }}
        table {{
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }}
        th, td {{
            border: 1px solid #d1d5db;
            padding: 12px;
            text-align: left;
        }}
        th {{
            background-color: #f3f4f6;
            font-weight: bold;
        }}
        code {{
            background-color: #f3f4f6;
            padding: 2px 6px;
            border-radius: 3px;
            font-family: 'Courier New', monospace;
        }}
        pre {{
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
        }}
        blockquote {{
            border-left: 4px solid #2563eb;
            padding-left: 20px;
            margin-left: 0;
            color: #6b7280;
        }}
        hr {{
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 30px 0;
        }}
    </style>
</head>
<body>
{content}
</body>
</html>
"""

def convert_md_to_pdf(md_file):
    """Convert a markdown file to PDF"""
    md_path = Path(md_file)
    if not md_path.exists():
        print(f"❌ File not found: {md_file}")
        return False
    
    # Read markdown content
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])
    
    # Wrap in HTML template
    full_html = html_template.format(content=html_content)
    
    # Output PDF filename
    pdf_file = md_path.stem + '.pdf'
    
    try:
        # Convert HTML to PDF
        pdfkit.from_string(full_html, pdf_file)
        print(f"✅ Created: {pdf_file}")
        return True
    except Exception as e:
        print(f"❌ Error converting {md_file}: {e}")
        return False

if __name__ == '__main__':
    print("🔄 Converting Markdown files to PDF...\n")
    
    success_count = 0
    for file in files_to_convert:
        if convert_md_to_pdf(file):
            success_count += 1
    
    print(f"\n✅ Successfully converted {success_count}/{len(files_to_convert)} files to PDF")
