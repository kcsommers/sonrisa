# Sonrisa Donuts

## Gmail Api

When someone places an order, they are sent a confirmation email with a receipt using the gmail API. This requires an OAuth2 access token, which is continuously refreshed with a refresh token. The refresh token can go stale for a number of reasons, including if the sonrisa google account password changes. If this occurs, a new refresh token can be created here: https://developers.google.com/oauthplayground. Click the gear icon in the top right, and paste in the sonrisa client id and client secret, found in the google cloud console. Then follow the steps on the left side.
