import { afterEach, describe, expect, it, vi } from 'vitest';
import { customizeLicense, fetchLicense } from '../src/index';

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('customizeLicense', () => {
  const answers = {
    licenseList: 'mit',
    license_year: '2026',
    author_name: 'Cezar Augusto',
    project_description: 'A test project.',
  };

  it('fills MIT placeholders', () => {
    const out = customizeLicense('Copyright (c) [year] [fullname]', answers);
    expect(out).toBe('Copyright (c) 2026 Cezar Augusto');
  });

  it('fills Apache placeholders', () => {
    const out = customizeLicense(
      'Copyright {yyyy} {name of copyright owner}',
      answers,
    );
    expect(out).toBe('Copyright 2026 Cezar Augusto');
  });

  it('fills GPL/AGPL angle-bracket placeholders', () => {
    const out = customizeLicense(
      "<one line to give the program's name and a brief idea of what it does.>\nCopyright (C) <year>  <name of author>",
      answers,
    );
    expect(out).toBe('A test project.\nCopyright (C) 2026  Cezar Augusto');
  });

  it('leaves bodies without placeholders untouched', () => {
    const body = 'This is free and unencumbered software.';
    expect(customizeLicense(body, answers)).toBe(body);
  });
});

describe('fetchLicense', () => {
  it('returns the license body from the GitHub API', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ body: 'LICENSE BODY' }),
      }),
    );
    await expect(fetchLicense('mit')).resolves.toBe('LICENSE BODY');
    expect(fetch).toHaveBeenCalledWith(
      'https://api.github.com/licenses/mit',
      expect.objectContaining({
        headers: expect.objectContaining({ 'User-Agent': 'mklicense-cli' }),
      }),
    );
  });

  it('throws on a non-OK response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({ ok: false, status: 404 }),
    );
    await expect(fetchLicense('nope')).rejects.toThrow('HTTP 404');
  });
});
