"""
Simple script to create HTML versions of markdown files for easy PDF printing
"""
import markdown
from pathlib import Path

# Files to convert
files_to_convert = [
    'USER_GUIDE.md',
    'QUICK_REFERENCE.md',
    'SOFTWARE_PURCHASE_AGREEMENT.md'
]

# HTML template
html_template = """<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{title}</title>
    <style>
        @media print {{
            body {{ margin: 0.5in; }}
        }}
        body {{
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            max-width: 900px;
            margin: 40px auto;
            padding: 20px;
            color: #333;
        }}
        h1 {{
            color: #2563eb;
            border-bottom: 3px solid #2563eb;
            padding-bottom: 10px;
            page-break-after: avoid;
        }}
        h2 {{
            color: #1e40af;
            margin-top: 30px;
            border-bottom: 1px solid #e5e7eb;
            padding-bottom: 5px;
            page-break-after: avoid;
        }}
        h3 {{
            color: #1e3a8a;
            page-break-after: avoid;
        }}
        table {{
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
            page-break-inside: avoid;
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
            font-size: 0.9em;
        }}
        pre {{
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            page-break-inside: avoid;
        }}
        pre code {{
            background: none;
            padding: 0;
        }}
        blockquote {{
            border-left: 4px solid #2563eb;
            padding-left: 20px;
            margin-left: 0;
            color: #6b7280;
            font-style: italic;
        }}
        hr {{
            border: none;
            border-top: 2px solid #e5e7eb;
            margin: 30px 0;
        }}
        .print-button {{
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            background: #2563eb;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }}
        .print-button:hover {{
            background: #1e40af;
        }}
        @media print {{
            .print-button {{ display: none; }}
        }}
    </style>
</head>
<body>
    <button class="print-button" onclick="window.print()">🖨️ Print to PDF</button>
    {content}
</body>
</html>
"""

def convert_md_to_html(md_file):
    """Convert a markdown file to HTML"""
    md_path = Path(md_file)
    if not md_path.exists():
        print(f"❌ File not found: {md_file}")
        return False
    
    # Read markdown content
    with open(md_path, 'r', encoding='utf-8') as f:
        md_content = f.read()
    
    # Convert markdown to HTML
    html_content = markdown.markdown(
        md_content, 
        extensions=['tables', 'fenced_code', 'nl2br']
    )
    
    # Wrap in HTML template
    title = md_path.stem.replace('_', ' ').title()
    full_html = html_template.format(title=title, content=html_content)
    
    # Output HTML filename
    html_file = md_path.stem + '.html'
    
    try:
        # Write HTML file
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(full_html)
        print(f"✅ Created: {html_file}")
        return True
    except Exception as e:
        print(f"❌ Error converting {md_file}: {e}")
        return False

if __name__ == '__main__':
    print("🔄 Converting Markdown files to HTML...\n")
    
    success_count = 0
    html_files = []
    
    for file in files_to_convert:
        if convert_md_to_html(file):
            success_count += 1
            html_files.append(Path(file).stem + '.html')
    
    print(f"\n✅ Successfully converted {success_count}/{len(files_to_convert)} files to HTML")
    print(f"\n📄 To create PDFs:")
    print(f"   1. Open each HTML file in your browser")
    print(f"   2. Click the 'Print to PDF' button (or press Ctrl+P)")
    print(f"   3. Choose 'Save as PDF' as the printer")
    print(f"   4. Save the PDF file")
    print(f"\nHTML files created:")
    for html_file in html_files:
        print(f"   - {html_file}")
