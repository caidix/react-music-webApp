
const { override, fixBabelImports } = require('customize-cra');
// module.exports = function override(config, env) {
//     // do stuff with the webpack config...
//     return config;
// };




module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd-mobile',
        libraryDirectory: 'es',
        style: 'css',
    }),
);


//  "scripts": {
//     "start": "react-scripts start",
//     "build": "react-scripts build",
//     "test": "react-scripts test",
//     "eject": "react-scripts eject"
//   },