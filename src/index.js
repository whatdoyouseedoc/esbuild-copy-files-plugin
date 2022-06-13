import copy from './copy.js';

export default ({ source, target, copyWithFolder }) => {
    return {
        name: 'copy',
        setup(build) {
            build.onEnd(() => copy({ source, target, copyWithFolder }));
        },
    };
};
