/*
 * Copyright (c) 2017, salesforce.com, inc.
 * All rights reserved.
 * Licensed under the BSD 3-Clause license.
 * For full license text, see LICENSE.txt file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {
  Predicate,
  PredicateResponse
} from '@salesforce/salesforcedx-utils-vscode/out/src/predicates/predicate';
import * as fs from 'fs';
import * as path from 'path';
import { workspace } from 'vscode';
import { SFDX_PROJECT_FILE } from '../constants';
import { nls } from '../messages';
import { getRootWorkspacePath, hasRootWorkspace } from '../util';

export class IsSfdxProjectOpened implements Predicate<typeof workspace> {
  public apply(item: typeof workspace): PredicateResponse {
    if (hasRootWorkspace(item)) {
      const uri = path.join(
        item.workspaceFolders![0].uri.path,
        SFDX_PROJECT_FILE
      );
      const exists = fs.existsSync(uri);
      if (!exists) {
        return PredicateResponse.of(
          false,
          nls.localize('predicates_no_sfdx_project_found_text')
        );
      } else {
        return PredicateResponse.true();
      }
    } else {
      return PredicateResponse.of(
        false,
        nls.localize('predicates_no_sfdx_project_found_text')
      );
    }
  }
}
