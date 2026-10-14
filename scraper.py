import urllib.request
import re
from html.parser import HTMLParser
import os

class TextExtractor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.text = []
        self.in_script = False
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag in ('script', 'style'):
            self.in_script = True
        if tag in ('h1', 'h2', 'h3', 'h4', 'p', 'li', 'div', 'section', 'article'):
            self.text.append('\n')
        if tag == 'a':
            attrs_dict = dict(attrs)
            if 'href' in attrs_dict:
                self.links.append((attrs_dict['href'], ''))

    def handle_endtag(self, tag):
        if tag in ('script', 'style'):
            self.in_script = False
        if tag in ('h1', 'h2', 'h3', 'h4', 'p', 'li', 'div', 'section'):
            self.text.append('\n')

    def handle_data(self, data):
        if not self.in_script:
            clean = data.strip()
            if clean:
                self.text.append(clean + ' ')

pages = ['/', '/about', '/services', '/portfolio', '/pricing', '/faq', '/contact']
base = 'https://impexstudios.com'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}

os.makedirs('scraped_pages', exist_ok=True)

for p in pages:
    url = base + ('' if p == '/' else p)
    fname = 'home' if p == '/' else p.replace('/', '')
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as resp:
            content = resp.read().decode('utf-8', errors='ignore')
            # Save raw html
            with open(f'scraped_pages/{fname}.html', 'w', encoding='utf-8') as f:
                f.write(content)
            
            parser = TextExtractor()
            parser.feed(content)
            raw = ''.join(parser.text)
            lines = [l.strip() for l in raw.split('\n') if l.strip()]
            with open(f'scraped_pages/{fname}.txt', 'w', encoding='utf-8') as f:
                f.write('\n'.join(lines))
            print(f"Fetched {p} successfully ({len(lines)} lines)")
    except Exception as e:
        print(f"Error fetching {p}: {e}")
