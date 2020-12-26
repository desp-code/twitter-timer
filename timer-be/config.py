class Config(object):
    DEBUG = False
    TESTING = False
    TWITTER_HANDLE = ''
    BEARER_TOKEN = ''

class DevelopmentConfig(Config):
    DEBUG = True
