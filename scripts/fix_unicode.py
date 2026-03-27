#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Replace literal \\uXXXX escape sequences (including emoji surrogate pairs) with real UTF-8."""

path = "/Users/solalgendrin/CascadeProjects/solutionstransitionsux/src/app/fiches/page.tsx"

with open(path, "r", encoding="utf-8") as f:
    src = f.read()


def replace_escapes(s):
    result = []
    i = 0
    while i < len(s):
        # Check for literal \u followed by 4 hex digits
        if (
            s[i] == "\\" and
            i + 1 < len(s) and s[i + 1] == "u" and
            i + 6 <= len(s) and
            all(c in "0123456789abcdefABCDEF" for c in s[i + 2:i + 6])
        ):
            code = int(s[i + 2:i + 6], 16)
            # High surrogate — look ahead for low surrogate
            if 0xD800 <= code <= 0xDBFF:
                j = i + 6
                if (
                    j < len(s) and s[j] == "\\" and
                    j + 1 < len(s) and s[j + 1] == "u" and
                    j + 6 <= len(s) and
                    all(c in "0123456789abcdefABCDEF" for c in s[j + 2:j + 6])
                ):
                    low = int(s[j + 2:j + 6], 16)
                    if 0xDC00 <= low <= 0xDFFF:
                        codepoint = 0x10000 + ((code - 0xD800) << 10) + (low - 0xDC00)
                        result.append(chr(codepoint))
                        i = j + 6
                        continue
            # Regular BMP character (skip lone surrogates)
            if not (0xD800 <= code <= 0xDFFF):
                result.append(chr(code))
                i += 6
                continue
        result.append(s[i])
        i += 1
    return "".join(result)


fixed = replace_escapes(src)

n_before = src.count("\\u")
n_after = fixed.count("\\u")

with open(path, "w", encoding="utf-8") as f:
    f.write(fixed)

print(f"Fixed {n_before - n_after} escape sequences ({n_after} remaining — these are intentional TypeScript \\uXXXX in strings)")
