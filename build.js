require('esbuild').buildSync({
    entryPoints: ['./src/main.ts'],
    bundle: true,
    outfile: 'build/simplang.js',
    platform: 'node'
})
