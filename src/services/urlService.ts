import { PrismaClient } from '@prisma/client';
import { URLValidator } from '../utils/urlValidator';
import { ShortURLGenerator } from '../utils/shortUrlGenerator';

export class URLService {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async shortenURL(originalUrl: string): Promise<string> {
        // Validate URL
        if (!URLValidator.isValidURL(originalUrl)) {
            throw new Error('Invalid URL format');
        }

        // Sanitize URL
        const sanitizedUrl = URLValidator.sanitizeURL(originalUrl);

        // Check URL length
        if (!URLValidator.validateUrlLength(sanitizedUrl)) {
            throw new Error('URL is too long');
        }

        // Check if URL already exists
        const existingUrl = await this.prisma.shortUrl.findFirst({
            where: { originalUrl: sanitizedUrl }
        });

        if (existingUrl) {
            return existingUrl.shortCode;
        }

        // Generate unique short code
        const shortCode = await ShortURLGenerator.isUnique(
            ShortURLGenerator.generateShortCode(),
            async (code) => {
                const exists = await this.prisma.shortUrl.findUnique({
                    where: { shortCode: code }
                });
                return !!exists;
            }
        );

        // Save to database
        await this.prisma.shortUrl.create({
            data: {
                originalUrl: sanitizedUrl,
                shortCode
            }
        });

        return shortCode;
    }

    async resolveShortURL(shortCode: string): Promise<string | null> {
        const urlEntry = await this.prisma.shortUrl.findUnique({
            where: { shortCode }
        });

        return urlEntry ? urlEntry.originalUrl : null;
    }

    async close() {
        await this.prisma.$disconnect();
    }
}
