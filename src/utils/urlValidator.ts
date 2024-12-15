export class URLValidator {
    static isValidURL(url: string): boolean {
        try {
            // Validate URL using built-in URL constructor
            new URL(url);

            // Additional checks
            return (
                url.startsWith('http://') ||
                url.startsWith('https://') ||
                url.startsWith('ftp://')
            );
        } catch {
            return false;
        }
    }

    static sanitizeURL(url: string): string {
        // Remove any trailing slashes and trim whitespace
        return url.trim().replace(/\/+$/, '');
    }

    static validateUrlLength(url: string, maxLength: number = 2048): boolean {
        return url.length <= maxLength;
    }
}
