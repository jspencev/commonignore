# CommonIgnore
A common .ignore file.

## Install
```
npm install -g commonignore
```

## Usage
CommonIgnore reads .ignore rules out of a .commonignore file at the root of your project. These rules are then copied into the appropriate .ignore file (.gitignore, .npmignore, etc.) by running ```commonignore```.

### .commonignore
Rules at the top are "everywhere" rules. They'll be copied into each specified .ignore file.

For CommonIgnore to generate a file, you must include a header with the filename. .ignore files are specified using ```#! <filename>``` i.e. ```#! .gitignore```, where filename is relative to the project root path. Underneath each header, you can specify rules unique to each ignore file. If there are no custom rules, only the "everywhere" rules will be compied into the file. Non-header comments are preserved.

Example .commonignore:
```
/node_modules
/.env
/tmp.js
/yarn-error.log

#! .gitignore
/dist

#! .npmignore
/src
/.envrc
/.gitignore
/.nvmrc
/addGlobal.js
/babel.config.js
/commitlint.config.js
/config.poly
/README.md
/yarn.lock
```
Outputs:
.gitignore
```
# This file was created automatically by commonignore.
# Do not modify this file directly, modify .commonignore under the correct heading.
# Refer to https://github.com/jspencev/commonignore for more info.

# These rules apply in all .ignore files:
/node_modules
/.env
/tmp.js
/yarn-error.log

# These rules apply just to .gitignore:
/dist
```
.npmignore
```
# This file was created automatically by commonignore.
# Do not modify this file directly, modify .commonignore under the correct heading.
# Refer to https://github.com/jspencev/commonignore for more info.

# These rules apply in all .ignore files:
/node_modules
/.env
/tmp.js
/yarn-error.log

# These rules apply just to .npmignore:
/src
/.envrc
/.gitignore
/.nvmrc
/addGlobal.js
/babel.config.js
/commitlint.config.js
/config.poly
/README.md
/yarn.lock
```

### Git hooks
To ensure you don't forget to run commonignore before commiting changes, add ```commonignore --add``` as a git pre-commit hook.

## CLI
```
Options:
      --version  Show version number                                   [boolean]
  -a, --add      Run git add [filenames] after the files are created.
      --help     Show help                                             [boolean]
```

## API
```
import commonignore from 'commonignore';

// or

import { commonignore, getRules, writeFiles } from 'commonignore';

// commonignore() is both named and the default export
```
### commonignore()
Reads the .commonignore file in the root of the app and writes .ignore files specified.
  **Parameters:** 
    cwd - String - Current working directory. Defaults to process.cwd()
  **Returns:** 
    {\[filename\]: Array<String>} - Rules written in each .ignore file

### getRules()
Gets rules from .commonignore organized by output filename.
  **Parameters:** 
    commonignorePath - String - Absolute path to .commonignore file.
  **Returns:** 
    {everywhere: Array<String>, files: {\[filename\]: Array<String>}} - An array containing rules that apply in all files and an object with specific rules for each output file.

### writeFiles()
Writes .ignore files as specified by the rules. Rules are written for each filename key in the files argument.
  **Parameters:**
    appRootPath - String - Absolute path to the root of the application.
    everywhere - Array<String> - Rules that apply in all files.
    files - {{\[filename\]: Array<String>}} - Object of {filename: \[rules\]} combinations specifying specific rules applied for each .ignore file. Filenames are relative to appRootPath.
  **Returns:**
    {\[filename\]: Array<String>} - Object of {filename: \[rules\]} combinations with the rules written in each filename.
