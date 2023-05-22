# esbuild-copy-files-plugin
https://www.npmjs.com/package/esbuild-copy-files-plugin

An esbuild plugin that allows to easily copy files and folders across the application

Install:
```
npm i esbuild-copy-files-plugin
```

Simple plugin for copy files and folders from one place to another.
Need to copy your index.html and images in build folder? This is what you need!

`source` can be `string` or `string[]`

`target` can be `string` (copy in one place) or `string[]` (copy in multiple places) 

Example 1 (copy with folder):
```
esbuild.build({  
  /*
   *  common build stuff
   */
   
   plugins: [
    copy({
      source: ['./src/index.html', './src/images'],
      target: './public',
      copyWithFolder: true  // will copy "images" folder with all files inside
    })
   ]
});
```

Result:
```
project/
├── public/
│   ├── images/
|   |   ├── inner-folder/
|   |   |   └── inner-image.jpeg
|   |   ├── image1.jpeg
|   |   └── image2.jpeg
│   └── index.html
|
├── src/
│   ├── images/
|   |   ├── inner-folder/
|   |   |   └── inner-image.jpeg
|   |   ├── image1.jpeg
|   |   └── image2.jpeg
│   └── index.html
```

Example 2 (unboxing the folder):
```
esbuild.build({  
  /*
   *  common build stuff
   */
   
   plugins: [
    copy({
      source: ['./src/index.html', './src/images'],
      target: './public',
      copyWithFolder: false  // will copy everything from images/ directly in src/
    })
   ]
});
```

Result:
```
project/
├── public/
|   ├── inner-folder/
|   |   └── inner-image.jpeg
|   ├── image1.jpeg
|   └── image2.jpeg
│   └── index.html
|
├── src/
│   ├── images/
|   |   ├── inner-folder/
|   |   |   └── inner-image.jpeg
|   |   ├── image1.jpeg
|   |   └── image2.jpeg
│   └── index.html
```
