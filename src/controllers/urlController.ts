import { Request, Response } from 'express';
import { URLService } from '../services/urlService';

export class URLController {
    private urlService: URLService;

    constructor() {
        this.urlService = new URLService();
    }

    async shortenURL(req: Request, res: Response) {
        try {
            const { url } = req.body;

            if (!url) {
                return res.status(400).json({ error: 'URL is required' });
            }

            const shortCode = await this.urlService.shortenURL(url);

            // Construct full short URL
            const shortUrl = `${req.protocol}://${req.get('host')}/${shortCode}`;

            res.status(200).json({
                originalUrl: url,
                shortUrl
            });
        } catch (error) {
            console.error('URL Shortening Error:', error);
            res.status(400).json({
                error: error instanceof Error ? error.message : 'Failed to shorten URL'
            });
        }
    }

    async redirectURL(req: Request, res: Response) {
        try {
            const { shortCode } = req.params;
            const originalUrl = await this.urlService.resolveShortURL(shortCode);

            if (!originalUrl) {
                return res.status(404).json({ error: 'Short URL not found' });
            }

            res.redirect(originalUrl);
        } catch (error) {
            console.error('URL Redirect Error:', error);
            res.status(500).json({ error: 'Failed to redirect' });
        }
    }
}
