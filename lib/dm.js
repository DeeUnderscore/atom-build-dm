'use babel';

import glob from 'glob';
import path from 'path';

export const config = {
  dmExePath: {
    title: 'DM compiler path',
    description: 'This is `dm.exe` on Windows and `DreamMaker` on Linux',
    type: 'string',
    default: 'dm.exe',
    order: 1
  }
};

export function provideBuilder() {
  return class DMBuildProvider {

    constructor(cwd) {
      this.cwd = cwd;
    }

    getNiceName() {
      return 'BYOND DM';
    }

    isEligible() {
      return (glob.sync('*.dme', {cwd: this.cwd}).length >= 1);
    }

    settings() {
      const dmExePath = atom.config.get('build-dm.dmExePath');
      const dmes = glob.sync('*.dme', {cwd: this.cwd});

      return dmes.map(filename => {
        return {
          name: filename,
          exec: dmExePath + ' ' + path.join(this.cwd, filename),
          errorMatch: '(?<file>.+):(?<line>\\d+):(?<type>.+?): (?<message>.+)'
        };
      });
    }
  };
}
