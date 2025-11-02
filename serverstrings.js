export class ServerStrings {
    static NULL_TOKEN = 'token missing';
    static VALIDATION = 'token validated';
    static VALIDATION_FAILED = 'token validation failed';

    static SIGNUP_REQUEST = 'signup request';
    static LOGIN_REQUEST = 'login request';
    
    static HASHED_CREDS = 'credentials hashed';
    static NO_PASSWORD_TO_HASH = 'no password to hash';

    static USER_ENDPOINT = (dbEnd) => `${dbEnd}/user`;
    static USER_BY_EMAIL_ENDPOINT = (dbEnd, email) => `${dbEnd}/user?email`;
}