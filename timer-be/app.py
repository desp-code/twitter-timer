from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
import requests
from datetime import datetime
from config import DevelopmentConfig

app = Flask(__name__)
app.config.from_object(DevelopmentConfig())


cors = CORS(app, resources={r"/latest-tweet": {"origins": "*"}, r"/twitter-handle": {"origins": "*"}, r"/init-timer": {"origins": "*"},  r"/latest-tweet-content": {"origins": "*"}})
last_timestamp = 0

@app.route('/latest-tweet')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def latest_tweet():
    """
    Returns a json containing the time stamp since the last tweet for the twitter account.
    """
    tweet = request_timeline()
    ts = latest_timestamp(tweet)
    return jsonify(latest_tweet_timestamp=ts)

@app.route('/init-timer')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def init_timer():
    """
    Returns a json containing the time delta since the last tweet for the twitter account.
    """
    tweet = request_timeline()
    ts = latest_timestamp(tweet)
    fmt = '%Y-%m-%d %H:%M:%S'
    tdelta = datetime.strptime(datetime.strftime(datetime.utcnow(), fmt), fmt) - datetime.strptime(ts, fmt)
    return jsonify(timer_set=tdelta.seconds, date_time=ts)

@app.route('/latest-tweet-content')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def latest_tweet_content():
    """
    Returns a json containing the html of the last tweet for the twitter account.
    """
    tweet = request_timeline()
    embed = latest_tweet_embed(tweet)
    html = latest_tweet_html(embed)
    return jsonify(html=tweet['id_str'])

@app.route('/twitter-handle')
@cross_origin(origin='*',headers=['Content-Type','Authorization'])
def twitter_handle():
    """
    Returns a json containing the twitter handle of the twitter account
    """

    return jsonify(handle=app.config['TWITTER_HANDLE'])

def latest_tweet_html(embed_tweet):
    """
    Returns the html of the last tweet for the twitter account.
    """
    html = embed_tweet['html']
    formatted_html = ''.join(html[:len(html)-1].split("\\"))
    return formatted_html

def latest_tweet_embed(tweet):
    """
    Returns a embeded tweet of the last tweet for the twitter account.
    """ 
    tweet_endpoint = f'https://publish.twitter.com/oembed?url=https://twitter.com/{app.config["TWITTER_HANDLE"]}/status/{tweet["id_str"]}'
    headers = {'Authorization': f'{app.config["BEARER_TOKEN"]}'}
    tweet_embed = requests.get(tweet_endpoint, headers=headers).json()
    return tweet_embed

def latest_timestamp(tweet):
    """
    Returns a timestamp of the last tweet for the twitter account.
    """ 
    tweet_timestamp = tweet['created_at']
    ts = datetime.strftime(datetime.strptime(tweet_timestamp,'%a %b %d %H:%M:%S +0000 %Y'), '%Y-%m-%d %H:%M:%S')
    return ts

def request_timeline():
    """
    Returns the timeline for the twitter account. Neccessary to obtain the lastest tweet.
    """    
    tweet_endpoint = f'https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name={app.config["TWITTER_HANDLE"]}'
    headers = {'Authorization': f'{app.config["BEARER_TOKEN"]}'}
    tweet_timeline = requests.get(tweet_endpoint, headers=headers).json()
    latest_tweet_string = tweet_timeline[0]
    return latest_tweet_string

if __name__ == '__main__':
    app.run()
