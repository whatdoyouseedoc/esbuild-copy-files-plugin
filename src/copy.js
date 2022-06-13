import fs from 'fs';
import path from 'path';

function isPathToFile(str) {
    return !!path.extname(str);
}

function copyFileSync(source, target) {
    if (isPathToFile(target)) {
        const targetDir = path.dirname(target);

        if (!fs.existsSync(targetDir)) {
            fs.mkdirSync(targetDir, { recursive: true });
        }

        fs.copyFileSync(source, target);
    } else {
        if (!fs.existsSync(target)) {
            fs.mkdirSync(target, { recursive: true });
        }

        fs.copyFileSync(source, path.join(target, path.basename(source)));
    }
}

function copyFolderRecursiveSync(source, target, copyWithFolder) {
    if (copyWithFolder) {
        const folder = path.join(target, path.basename(source));

        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder, { recursive: true });
        }

        return copyFolderRecursiveSync(source, folder);
    }

    if (!fs.existsSync(target)) {
        fs.mkdirSync(target, { recursive: true });
    }

    if (fs.lstatSync(source).isDirectory()) {
        const files = fs.readdirSync(source);

        files.forEach((file) => {
            const curSource = path.join(source, file);

            if (fs.lstatSync(curSource).isDirectory()) {
                copyFolderRecursiveSync(curSource, path.join(target, file));
            } else {
                copyFileSync(curSource, target);
            }
        });
    }
}

function copy({ source, target, copyWithFolder }) {
    if (Array.isArray(target)) {
        target.forEach((targetItem) => {
            copy({ source, target: targetItem, copyWithFolder });
        });
    } else if (Array.isArray(source) && !Array.isArray(target)) {
        source.forEach((sourceItem) => {
            copy({ source: sourceItem, target, copyWithFolder });
        });
    } else if (fs.existsSync(source)) {
        if (fs.lstatSync(source).isFile()) {
            copyFileSync(source, target);
        } else if (fs.lstatSync(source).isDirectory()) {
            copyFolderRecursiveSync(source, target, copyWithFolder);
        }
    }
}

export default copy;
