
import environment from 'consts:environment';
import git from 'consts:git';
import version from 'consts:version';
import * as appVersions from '../versions';

const versions = {
    scriptVersion: version,
    ...appVersions
}

export {git, environment, versions};