import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { copy } from '../copy';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const testPrefix = 'escopy-plugin-test-';

describe('copy', () => {
    const srcFile = path.join(__dirname, `${testPrefix}testSrc.txt`);
    const destFile = path.join(__dirname, `${testPrefix}testDest.txt`);
    const srcDir = path.join(__dirname, `${testPrefix}srcDir`);
    const destDir = path.join(__dirname, `${testPrefix}destDir`);

    beforeAll(() => {
        fs.writeFileSync(srcFile, 'Hello, world!', 'utf8');
        fs.mkdirSync(srcDir);
        fs.writeFileSync(path.join(srcDir, 'file.txt'), 'test', 'utf8');
    });

    afterAll(() => {
        if (fs.existsSync(srcFile)) {
            fs.unlinkSync(srcFile);
        }
        if (fs.existsSync(destFile)) {
            fs.unlinkSync(destFile);
        }
        if (fs.existsSync(srcDir)) {
            fs.rmdirSync(srcDir, { recursive: true });
        }
        if (fs.existsSync(destDir)) {
            fs.rmdirSync(destDir, { recursive: true });
        }
    });

    it('should copy a single file', () => {
        copy({ source: srcFile, target: destFile });

        expect(fs.existsSync(destFile)).toBe(true);

        const srcContent = fs.readFileSync(srcFile, 'utf8');
        const destContent = fs.readFileSync(destFile, 'utf8');
        expect(srcContent).toBe(destContent);
    });

    it('should copy a single directory', () => {
        copy({ source: srcDir, target: destDir });

        expect(fs.existsSync(destDir)).toBe(true);
        expect(fs.existsSync(path.join(destDir, 'file.txt'))).toBe(true);

        const srcContent = fs.readFileSync(path.join(srcDir, 'file.txt'), 'utf8');
        const destContent = fs.readFileSync(path.join(destDir, 'file.txt'), 'utf8');
        expect(srcContent).toBe(destContent);
    });

    xit('should copy multiple files', () => {
        const srcFiles = [srcFile, path.join(srcDir, 'file.txt')];
        const destFiles = [
            path.join(__dirname, `${testPrefix}destFile1.txt`),
            path.join(__dirname, `${testPrefix}destFile2.txt`),
        ];

        copy({ source: srcFiles, target: destFiles });

        expect(fs.existsSync(destFiles[0])).toBe(true);
        expect(fs.existsSync(destFiles[1])).toBe(true);

        const srcContent1 = fs.readFileSync(srcFiles[0], 'utf8');
        const destContent1 = fs.readFileSync(destFiles[0], 'utf8');
        expect(srcContent1).toBe(destContent1);

        const srcContent2 = fs.readFileSync(srcFiles[1], 'utf8');
        const destContent2 = fs.readFileSync(destFiles[1], 'utf8');
        expect(srcContent2).toBe(destContent2);
    });

    it('should copy multiple directories', () => {
        const srcDirs = [srcDir, path.join(__dirname, `${testPrefix}srcDir2`)];
        const destDirs = [path.join(__dirname, `${testPrefix}destDir1`), path.join(__dirname, `${testPrefix}destDir2`)];

        fs.mkdirSync(srcDirs[1]);
        fs.writeFileSync(path.join(srcDirs[1], 'file2.txt'), 'test2', 'utf8');

        copy({ source: srcDirs, target: destDirs });

        expect(fs.existsSync(destDirs[0])).toBe(true);
        expect(fs.existsSync(path.join(destDirs[0], 'file.txt'))).toBe(true);
        expect(fs.existsSync(destDirs[1])).toBe(true);
        expect(fs.existsSync(path.join(destDirs[1], 'file2.txt'))).toBe(true);

        const srcContent1 = fs.readFileSync(path.join(srcDirs[0], 'file.txt'), 'utf8');
        const destContent1 = fs.readFileSync(path.join(destDirs[0], 'file.txt'), 'utf8');
        expect(srcContent1).toBe(destContent1);

        const srcContent2 = fs.readFileSync(path.join(srcDirs[1], 'file2.txt'), 'utf8');
        const destContent2 = fs.readFileSync(path.join(destDirs[1], 'file2.txt'), 'utf8');
        expect(srcContent2).toBe(destContent2);

        fs.rmdirSync(srcDirs[1], { recursive: true });
        fs.rmdirSync(destDirs[0], { recursive: true });
        fs.rmdirSync(destDirs[1], { recursive: true });
    });

    it('should copy with copyWithFolder option', () => {
        copy({ source: srcDir, target: destDir, copyWithFolder: true });

        expect(fs.existsSync(path.join(destDir, path.basename(srcDir)))).toBe(true);
        expect(fs.existsSync(path.join(destDir, path.basename(srcDir), 'file.txt'))).toBe(true);

        const srcContent = fs.readFileSync(path.join(srcDir, 'file.txt'), 'utf8');
        const destContent = fs.readFileSync(path.join(destDir, path.basename(srcDir), 'file.txt'), 'utf8');
        expect(srcContent).toBe(destContent);
    });
});
