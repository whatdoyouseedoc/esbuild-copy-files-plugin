import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['./src/index.js'],
  bundle: true,
  outfile: 'bundle/index.js',
  platform: 'node',
  minify: true,
  sourcemap: true,
  format: 'esm',
  external: ['fs', 'path']
}).catch(() => process.exit(1));
