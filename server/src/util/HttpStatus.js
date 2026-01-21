const HttpStatus = {
    OK: { code: 200, status: 'OK'},
    CREATED: { code: 201, status: 'Created'},
    ACCEPTED: { code: 202, status: 'Accepted'},
    NO_CONTENT: { code: 204, status: 'No content'},
    BAD_REQUEST: { code: 400, status: 'Bad request'},
    NOT_FOUND: { code: 404, status: 'Not Found' },
    INTERNAL_SERVER_ERROR: { code: 500, status: 'Internal server error'},
};

export default HttpStatus;