import os
import shutil
import sys

import pytest

from config import BASE_DIR


def main():
    argv = []

    argv.extend(sys.argv[1:])

    pytest.main(argv)

    try:
        os.remove(os.path.join(BASE_DIR, '.coverage'))

    except OSError:
        pass

    try:
        shutil.rmtree(os.path.join(BASE_DIR, '.cache'))

    except OSError:
        pass

    try:
        shutil.rmtree(os.path.join(BASE_DIR, 'tests/.cache'))
    except OSError:
        pass


if __name__ == '__main__':
    main()