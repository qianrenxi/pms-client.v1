"use strict";
/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class MissingFileReplacementException extends core_1.BaseException {
    constructor(path) {
        super(`The ${path} path in file replacements does not exist.`);
    }
}
exports.MissingFileReplacementException = MissingFileReplacementException;
function normalizeFileReplacements(fileReplacements, host, root) {
    if (fileReplacements.length === 0) {
        return rxjs_1.of([]);
    }
    // Ensure all the replacements exist.
    const errorOnFalse = (path) => operators_1.tap((exists) => {
        if (!exists) {
            throw new MissingFileReplacementException(core_1.getSystemPath(path));
        }
    });
    return rxjs_1.from(fileReplacements).pipe(operators_1.map(replacement => normalizeFileReplacement(replacement, root)), operators_1.concatMap(normalized => {
        return rxjs_1.from([normalized.replace, normalized.with]).pipe(operators_1.mergeMap(path => host.exists(path).pipe(errorOnFalse(path))), operators_1.ignoreElements(), operators_1.concat(rxjs_1.of(normalized)));
    }), operators_1.toArray());
}
exports.normalizeFileReplacements = normalizeFileReplacements;
function normalizeFileReplacement(fileReplacement, root) {
    const currentFormat = fileReplacement;
    const maybeOldFormat = fileReplacement;
    let replacePath;
    let withPath;
    if (maybeOldFormat.src && maybeOldFormat.replaceWith) {
        replacePath = core_1.normalize(maybeOldFormat.src);
        withPath = core_1.normalize(maybeOldFormat.replaceWith);
    }
    else {
        replacePath = core_1.normalize(currentFormat.replace);
        withPath = core_1.normalize(currentFormat.with);
    }
    // TODO: For 7.x should this only happen if not absolute?
    if (root) {
        replacePath = core_1.join(root, replacePath);
    }
    if (root) {
        withPath = core_1.join(root, withPath);
    }
    return { replace: replacePath, with: withPath };
}
//# sourceMappingURL=normalize-file-replacements.js.map