"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class MissingAssetSourceRootException extends core_1.BaseException {
    constructor(path) {
        super(`The ${path} asset path must start with the project source root.`);
    }
}
exports.MissingAssetSourceRootException = MissingAssetSourceRootException;
function normalizeAssetPatterns(assetPatterns, host, root, projectRoot, maybeSourceRoot) {
    // When sourceRoot is not available, we default to ${projectRoot}/src.
    const sourceRoot = maybeSourceRoot || core_1.join(projectRoot, 'src');
    const resolvedSourceRoot = core_1.resolve(root, sourceRoot);
    if (assetPatterns.length === 0) {
        // If there are no asset patterns, return an empty array.
        // It's important to do this because forkJoin with an empty array will immediately complete
        // the observable.
        return rxjs_1.of([]);
    }
    const assetPatternObjectObservables = assetPatterns
        .map(assetPattern => {
        // Normalize string asset patterns to objects.
        if (typeof assetPattern === 'string') {
            const assetPath = core_1.normalize(assetPattern);
            const resolvedAssetPath = core_1.resolve(root, assetPath);
            // Check if the string asset is within sourceRoot.
            if (!resolvedAssetPath.startsWith(resolvedSourceRoot)) {
                throw new MissingAssetSourceRootException(assetPattern);
            }
            return host.isDirectory(resolvedAssetPath).pipe(
            // If the path doesn't exist at all, pretend it is a directory.
            operators_1.catchError(() => rxjs_1.of(true)), operators_1.map(isDirectory => {
                let glob, input, output;
                if (isDirectory) {
                    // Folders get a recursive star glob.
                    glob = '**/*';
                    // Input directory is their original path.
                    input = assetPath;
                }
                else {
                    // Files are their own glob.
                    glob = core_1.basename(assetPath);
                    // Input directory is their original dirname.
                    input = core_1.dirname(assetPath);
                }
                // Output directory for both is the relative path from source root to input.
                output = core_1.relative(resolvedSourceRoot, core_1.resolve(root, input));
                // Return the asset pattern in object format.
                return { glob, input, output };
            }));
        }
        else {
            // It's already an AssetPatternObject, no need to convert.
            return rxjs_1.of(assetPattern);
        }
    });
    // Wait for all the asset patterns and return them as an array.
    return rxjs_1.forkJoin(assetPatternObjectObservables);
}
exports.normalizeAssetPatterns = normalizeAssetPatterns;
//# sourceMappingURL=normalize-asset-patterns.js.map