"""Dependency-free structure and local-reference checks. This is not browser QA."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlsplit, unquote
import json
import sys

ROOT = Path(__file__).resolve().parents[1]
VOID = set('area base br col embed hr img input link meta param source track wbr'.split())
class Document(HTMLParser):
    def __init__(self, path):
        super().__init__(convert_charrefs=True)
        self.path = path
        self.ids = set()
        self.references = []
        self.labels = []
        self.inputs = []
        self.errors = []
        self.stack = []
        self.counts = {}
        self.inline_scripts = []
    def handle_starttag(self, tag, attrs):
        data = dict(attrs)
        self.counts[tag] = self.counts.get(tag, 0) + 1
        if tag not in VOID: self.stack.append(tag)
        if 'id' in data:
            if data['id'] in self.ids: self.errors.append('duplicate ID: ' + data['id'])
            self.ids.add(data['id'])
        if tag == 'html' and data.get('lang') != 'id': self.errors.append('missing Indonesian lang')
        if tag == 'img' and 'alt' not in data: self.errors.append('image missing alt')
        if tag == 'input': self.inputs.append(data)
        if tag == 'label' and 'for' in data: self.labels.append(data['for'])
        for attribute in ['href', 'src', 'data-dialog', 'data-password', 'data-quantity', 'data-variant-source']:
            if attribute in data:
                value = data[attribute]
                if attribute.startswith('data-'): value = '#' + value
                self.references.append(value)
    def handle_endtag(self, tag):
        if tag in VOID: return
        if not self.stack or self.stack[-1] != tag:
            self.errors.append('mismatched closing tag: ' + tag + ', open stack: ' + '/'.join(self.stack[-4:]))
            if tag in self.stack:
                while self.stack and self.stack[-1] != tag: self.stack.pop()
                self.stack.pop()
        else: self.stack.pop()
    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID: self.handle_endtag(tag)
    def validate(self):
        if self.stack: self.errors.append('unclosed tags: ' + ', '.join(self.stack))
        for required in ['title', 'main', 'h1']:
            if self.counts.get(required) != 1: self.errors.append('expected one ' + required)
        for label in self.labels:
            if label not in self.ids: self.errors.append('label target missing: ' + label)
        for reference in self.references:
            parts = urlsplit(reference)
            if parts.scheme or parts.netloc: continue
            target = (self.path.parent / unquote(parts.path)).resolve() if parts.path else self.path
            if parts.path and not target.exists(): self.errors.append('file missing: ' + reference)
            if parts.fragment and target == self.path and parts.fragment not in self.ids: self.errors.append('anchor missing: ' + reference)

files = [ROOT / 'index.html', *sorted(ROOT.glob('templates/*/*.html')), *sorted(ROOT.glob('frameworks/*/index.html'))]
failures = []
for path in files:
    parser = Document(path)
    parser.feed(path.read_text())
    parser.validate()
    failures.extend((str(path.relative_to(ROOT)), error) for error in parser.errors)
for path, error in failures: print(path + ': ' + error)
print(f'HTML checks: {len(files)} pages, {len(failures)} errors. IDs, references, nesting, landmarks, headings, image alt, and label targets checked.')
sys.exit(bool(failures))
