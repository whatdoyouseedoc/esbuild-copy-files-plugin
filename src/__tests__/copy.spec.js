import {
    isPathToFile,
    ensureDirectoryExists,
    copyFileSync,
    copyFolderRecursiveSync,
} from '../copy';
import fs from 'fs';

const testPrefix = 'escopy-plugin-test-';

describe('isPathToFile', () => {
    it('should return true if the path is a file', () => {
        expect(isPathToFile('test-file.txt')).toBe(true);
    });

    it('should return false if the path is a folder', () => {
        expect(isPathToFile('test-folder')).toBe(false);
    });
});

describe('ensureDirectoryExists', () => {
    it('should create the directory if it does not exist', () => {
        const dir = `./${testPrefix}folder`;

        fs.mkdirSync(dir);

        ensureDirectoryExists(dir);

        expect(fs.existsSync(dir)).toBe(true);

        fs.rmdirSync(dir, { recursive: true });
    });

    it('should not create the directory if it already exists', () => {
        const dir = `./${testPrefix}folder`;

        fs.mkdirSync(dir);

        ensureDirectoryExists(dir);

        expect(fs.existsSync(dir)).toBe(true);

        fs.rmdirSync(dir, { recursive: true });
    });
});

describe('copyFileSync', () => {
    it('should copy a file to a directory', () => {
        const source = `${testPrefix}file.txt`;
        const target = `${testPrefix}dir`;

        fs.writeFileSync(source, 'test');

        ensureDirectoryExists(target);

        copyFileSync(source, target);

        expect(fs.existsSync(target)).toBe(true);

        fs.unlinkSync(source);
        fs.rmdirSync(target, { recursive: true });
    });
});

describe('copyFolderRecursiveSync', () => {
    it('should copy a folder recursively', () => {
        const source = `./${testPrefix}source`;
        const target = `./${testPrefix}target`;

        fs.mkdirSync(source);
        fs.writeFileSync(`${source}/file.txt`, 'test');

        copyFolderRecursiveSync(source, target, false);

        expect(fs.existsSync(`${target}/file.txt`)).toBe(true);

        fs.unlinkSync(`${target}/file.txt`);
        fs.rmdirSync(source, { recursive: true });
        fs.rmdirSync(target, { recursive: true });
    });

    it('should copy a folder recursively with the folder', () => {
        const source = `./${testPrefix}source`;
        const target = `./${testPrefix}target`;

        fs.mkdirSync(source);
        fs.writeFileSync(`${source}/test-file.txt`, 'test');

        copyFolderRecursiveSync(source, target, true);

        expect(
            fs.existsSync(`${target}/${testPrefix}source/test-file.txt`)
        ).toBe(true);

        fs.unlinkSync(`${target}/${testPrefix}source/test-file.txt`);
        fs.rmdirSync(source, { recursive: true });
        fs.rmdirSync(target, { recursive: true });
    });
});
