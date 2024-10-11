exports.getAuthHeader = (header) => {
    try {
        if (!header) return null;
        else {
            const _ssF = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            const _ssE = Math.floor(Date.now() / 1000);
            const _ssD = header?.oauth_token;
            return `OAuth oauth_consumer_key="c3RhZ2luZy1hcHA",oauth_nonce="${_ssF}",oauth_signature="${encodeURIComponent(_ssD)}",oauth_signature_method="HMAC-SHA1",oauth_timestamp="${_ssE}",oauth_token="${header?.oauth_token}",oauth_version="1.0"`;
        }
    } catch (error) {
        return null;
    }
}