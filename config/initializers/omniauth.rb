Rails.application.config.middleware.use OmniAuth::Builder do
    # provider :github,        ENV['GITHUB_KEY'],   ENV['GITHUB_SECRET'],   scope: 'email,profile'
    # provider :facebook,      ENV['FACEBOOK_KEY'], ENV['FACEBOOK_SECRET']
    provider :google_oauth2, "884708634562-3hn1ng7oocmf6qd4iq0ml1k1amms5rm1.apps.googleusercontent.com",   "XPvGDjTbmqyBK7CrBaj_Ssq9"
    # provider :apple,         ENV['APPLE_CLIENT_ID'], '', { scope: 'email name', team_id: ENV['APPLE_TEAM_ID'], key_id: ENV['APPLE_KEY'], pem: ENV['APPLE_PEM'] }
  end