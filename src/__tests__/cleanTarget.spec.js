import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { cleanTarget } from '../copy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testPrefix = 'escopy-plugin-test-';

describe('cleanTarget', () => {
    const testDir = path.join(__dirname, `${testPrefix}testDir`);
    const testFile = path.join(__dirname, `${testPrefix}testFile.txt`);

    beforeAll(() => {
        fs.mkdirSync(testDir, { recursive: true });
        fs.writeFileSync(testFile, 'Hello, world!', 'utf8');
    });

    afterAll(() => {
        if (fs.existsSync(testDir)) {
            fs.rmdirSync(testDir, { recursive: true });
        }
        if (fs.existsSync(testFile)) {
            fs.unlinkSync(testFile);
        }
    });

    it('should clean an existing directory', () => {
        expect(fs.existsSync(testDir)).toBe(true);

        cleanTarget(testDir);

        expect(fs.existsSync(testDir)).toBe(false);
    });

    it('should clean an existing file', () => {
        expect(fs.existsSync(testFile)).toBe(true);

        cleanTarget(testFile);

        expect(fs.existsSync(testFile)).toBe(false);
    });

    it('should handle non-existent path gracefully', () => {
        const nonExistentPath = path.join(
            __dirname,
            `${testPrefix}nonExistent`
        );

        expect(fs.existsSync(nonExistentPath)).toBe(false);

        cleanTarget(nonExistentPath);

        expect(fs.existsSync(nonExistentPath)).toBe(false);
    });
});
