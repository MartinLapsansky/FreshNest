// import path from "path";
//
// module.exports = {
//     process(src, filename) {
//         const transformedCode = `module.exports = ${JSON.stringify(path.basename(filename))};`;
//         return { code: transformedCode };
//     },
// };

import path from 'path';

const fileTransformer = {
    process(src, filename) {
        const transformedCode = `export const transformedFileName = ${JSON.stringify(path.basename(filename))};`;
        return { code: transformedCode };
    },
};

export default fileTransformer;


