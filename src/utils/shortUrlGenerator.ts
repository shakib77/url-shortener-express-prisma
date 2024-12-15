import crypto from 'crypto';

export class ShortURLGenerator {
    private static readonly BASE62_CHARS =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    static generateShortCode(length: number = 6): string {
        const randomBytes = crypto.randomBytes(length);
        let shortCode = '';

        for (let i = 0; i < length; i++) {
            const index = randomBytes[i] % this.BASE62_CHARS.length;
            shortCode += this.BASE62_CHARS[index];
        }

        return shortCode;
    }

    static async isUnique(
        shortCode: string,
        checkExistingCode: (code: string) => Promise<boolean>
    ): Promise<string> {
        let uniqueCode = shortCode;
        let attempt = 0;
        const maxAttempts = 10;

        while (await checkExistingCode(uniqueCode)) {
            if (attempt >= maxAttempts) {
                throw new Error('Unable to generate a unique short code');
            }

            // Regenerate if not unique
            uniqueCode = this.generateShortCode();
            attempt++;
        }

        return uniqueCode;
    }
}
