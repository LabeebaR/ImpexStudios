import urllib.request
import re
import os

with open('scraped_pages/faq.html', encoding='utf-8') as f:
    c = f.read()

scripts = re.findall(r'/assets/[a-zA-Z0-9_\-\.]+\.js', c)
print('Found scripts:', len(scripts), set(scripts))

base = 'https://impexstudios.com'
headers = {'User-Agent': 'Mozilla/5.0'}

os.makedirs('scraped_assets', exist_ok=True)
for s in set(scripts):
    fname = os.path.basename(s)
    target = os.path.join('scraped_assets', fname)
    try:
        req = urllib.request.Request(base + s, headers=headers)
        with urllib.request.urlopen(req) as resp:
            data = resp.read()
            with open(target, 'wb') as out:
                out.write(data)
            text = data.decode('utf-8', errors='ignore')
            if 'What does Impex Studios actually do' in text:
                print('===> FAQ content found in:', fname)
            if 'Alex Tran' in text:
                print('===> About content found in:', fname)
    except Exception as e:
        print('Error:', s, e)
