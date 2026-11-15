/*
Naming rules ported from mholt/json-to-go (https://github.com/mholt/json-to-go)

The MIT License (MIT)

Copyright (c) 2014 Matt Holt

Permission is hereby granted, free of charge, to any person obtaining a copy of
this software and associated documentation files (the "Software"), to deal in
the Software without restriction, including without limitation the rights to
use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

export const NAMING_FAILED = 'NAMING_FAILED';

const COMMON_INITIALISMS = new Set([
  'ACL', 'API', 'ASCII', 'CPU', 'CSS', 'DNS', 'EOF', 'GUID', 'HTML', 'HTTP',
  'HTTPS', 'ID', 'IP', 'JSON', 'LHS', 'QPS', 'RAM', 'RHS', 'RPC', 'SLA',
  'SMTP', 'SQL', 'SSH', 'TCP', 'TLS', 'TTL', 'UDP', 'UI', 'UID', 'UUID',
  'URI', 'URL', 'UTF8', 'VM', 'XML', 'XMPP', 'XSRF', 'XSS',
]);

const DIGITS = ['Zero_', 'One_', 'Two_', 'Three_', 'Four_', 'Five_', 'Six_', 'Seven_', 'Eight_', 'Nine_'];

// Turns any JSON key into an exported Go identifier
export function format(str: string): string {
  const sanitized = toProperCase(formatNumber(str)).replace(/[^a-z0-9]/gi, '');
  if (!sanitized) return NAMING_FAILED;
  return formatNumber(sanitized);
}

function formatNumber(str: string): string {
  if (!str) return '';
  if (/^\d+$/.test(str)) return 'Num' + str;
  if (/\d/.test(str.charAt(0))) return DIGITS[Number(str.charAt(0))] + str.slice(1);
  return str;
}

function toProperCase(str: string): string {
  // SCREAMING_SNAKE_CASE is lowered first so it gets title-cased like the rest
  if (/^[_A-Z0-9]+$/.test(str)) str = str.toLowerCase();

  return str
    .replace(/(^|[^a-zA-Z])([a-z]+)/g, (_match, sep: string, frag: string) =>
      COMMON_INITIALISMS.has(frag.toUpperCase())
        ? sep + frag.toUpperCase()
        : sep + frag[0].toUpperCase() + frag.slice(1).toLowerCase(),
    )
    .replace(/([A-Z])([a-z]+)/g, (_match, sep: string, frag: string) =>
      COMMON_INITIALISMS.has(sep + frag.toUpperCase()) ? (sep + frag).toUpperCase() : sep + frag,
    );
}

export function uniqueName(name: string, used: Set<string>): string {
  if (!used.has(name)) return name;
  for (let i = 2; ; i++) {
    if (!used.has(name + i)) return name + i;
  }
}

// Best-effort English singular, used to name slice and map element types
export function singular(name: string): string {
  let result = name;
  if (/[^aeiou]ies$/.test(name)) result = name.slice(0, -3) + 'y';
  else if (/(ss|sh|ch|x|z|us)es$/.test(name)) result = name.slice(0, -2);
  else if (/[^sui]s$/.test(name)) result = name.slice(0, -1);
  return result === name || !result ? name + 'Item' : result;
}
