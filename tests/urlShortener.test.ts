import { URLValidator } from '../src/utils/urlValidator';
import { ShortURLGenerator } from '../src/utils/shortUrlGenerator';
import { URLService } from '../src/services/urlService';

describe('URL Shortener Service', () => {
    // URL Validator Tests
    describe('URLValidator', () => {
        test('should validate correct URLs', () => {
            expect(URLValidator.isValidURL('https://www.example.com')).toBe(true);
            expect(URLValidator.isValidURL('http://subdomain.example.co.uk/path')).toBe(true);
        });

        test('should reject invalid URLs', () => {
            expect(URLValidator.isValidURL('not a url')).toBe(false);
            expect(URLValidator.isValidURL('')).toBe(false);
        });

        test('should sanitize URLs', () => {
            expect(URLValidator.sanitizeURL('https://example.com/')).toBe('https://example.com');
            expect(URLValidator.sanitizeURL('  https://example.com  ')).toBe('https://example.com');
        });
    });

    // Short URL Generator Tests
    describe('ShortURLGenerator', () => {
        test('should generate short codes of correct length', () => {
            const shortCode = ShortURLGenerator.generateShortCode();
            expect(shortCode.length).toBe(6);
        });

        test('should generate unique codes', () => {
            const code1 = ShortURLGenerator.generateShortCode();
            const code2 = ShortURLGenerator.generateShortCode();
            expect(code1).not.toBe(code2);
        });
    });

    // URL Service Mock Tests
    describe('URLService', () => {
        let urlService: URLService;

        beforeEach(() => {
            urlService = new URLService();
        });

        test('should throw error for invalid URL', async () => {
            await expect(urlService.shortenURL('invalid url'))
                .rejects.toThrow('Invalid URL format');
        });

        test('should shorten valid URL', async () => {
            const validUrl = 'https://www.example.com';
            const shortCode = await urlService.shortenURL(validUrl);

            expect(shortCode).toBeTruthy();
            expect(shortCode.length).toBe(6);

            // Resolve the short URL
            const resolvedUrl = await urlService.resolveShortURL(shortCode);
            expect(resolvedUrl).toBe(validUrl);
        });
    });
});
