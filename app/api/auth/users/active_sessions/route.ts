import moment from 'moment/moment';
// eslint-disable-next-line valid-jsdoc
/**
 * @swagger
 * /api/auth/users/active_sessions:
 *   get:
 *     description: Gets count of active sessions for a given date range
 *     parameters:
 *     - in: query
 *       name: from
 *       schema:
 *         type: string
 *         format: date
 *         example: 2023-10-01
 *       required: true
 *       description: Start date for the date range
 *     - in: query
 *       name: to
 *       schema:
 *         type: string
 *         format: date
 *         example: 2023-10-31
 *       required: true
 *       description: End date for the date range
 *     responses:
 *       200:
 *         description: OK!
 */
export async function GET(request: Request) {
  const PARSED_URL = new URL(request.url);
  const FROM = PARSED_URL.searchParams.get('from');
  const TO = PARSED_URL.searchParams.get('to');

  const URI = process.env.AUTH0_AUDIENCE +
      'users?q=last_login:[' + moment.utc(FROM).format() +
      ' TO ' + moment.utc(TO).format() +
      '] AND identities.connection:"' + process.env.AUTH0_CONNECTION +
      '"&search_engine=v3&include_totals=true';
  console.log('*****' + URI);

  const RESPONSE = await fetch(URI, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
      'Accept': 'application/json',
    },
  });

  const RESPONSE_JSON = await RESPONSE.json();
  return Response.json(RESPONSE_JSON.total, {status: RESPONSE_JSON.statusCode});
}
