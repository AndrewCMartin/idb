import os

BASE_DIR = os.path.abspath(os.path.dirname(__file__))
REACT_DIR = os.path.join(BASE_DIR, 'build')

class ProdConfig(object):
    """Config for deployment to GCP App Engine"""
    SECRET_KEY = "Z721XDLD9PGD9XQ"
    DEBUG = True
    SQL_CONN = os.environ['CLOUDSQL_CONNECTION_NAME']
    SQL_USER = os.environ['CLOUDSQL_USER']
    SQL_PASS = os.environ['CLOUDSQL_PASSWORD']
    SQLALCHEMY_DATABASE_URI = 'mysql+mysqldb://' + SQL_USER + ':' + SQL_PASS + \
                              '@localhost/marvelusdb?unix_socket=' + os.path.join('/cloudsql', SQL_CONN)
    SQLALCHEMY_TRACK_MODIFICATIONS = True


class LocalDevConfig(object):
    """Config for local development connected to production database,
        must first connect to db through proxy"""
    SECRET_KEY = "SO_SECURE"
    DEBUG = True
    SQL_CONN = os.environ['CLOUDSQL_CONNECTION_NAME']
    SQL_USER = os.environ['CLOUDSQL_USER']
    SQL_PASS = os.environ['CLOUDSQL_PASSWORD']
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://' + SQL_USER + ':' + SQL_PASS + '@' + 'localhost:3306/marvelusdb'
    SQLALCHEMY_TRACK_MODIFICATIONS = False


class TestingConfig(object):
    """Configuration for unit tests, database is initially empty and in memory"""
    TESTING = True
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///:memory:'
    DEBUG_TB_ENABLED = True
    PRESERVE_CONTEXT_ON_EXCEPTION = False
