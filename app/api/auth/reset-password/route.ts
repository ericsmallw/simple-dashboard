export async function PATCH(request: Request) {
    const body = await request.json();
    if (!body.oldPassword || !body.newPassword || !body.newPasswordAgain || !body.userId || !body.email) {
        return Response.json({error: 'Missing required fields'}, {status: 400});
    }

    // get check old password in auth0 by trying to request a token
    const passResponse = await fetch(`${process.env.AUTH0_DOMAIN}oauth/token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            grant_type: 'password',
            username: body.email,
            password: body.oldPassword,
            audience: process.env.AUTH0_AUDIENCE,
            scope: 'openid profile email',
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET
        })
    });

    const passResBody = await passResponse.json();

    if (passResBody.error) {
        return Response.json(passResBody, {status: passResBody.statusCode});
    }

    const response = await fetch(`${process.env.AUTH0_AUDIENCE}users/${body.userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${process.env.AUTH0_TOKEN}`,
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            password: body.newPassword,
            connection: 'Simple-Dashboard-Connection'
        })
    });

    const res = await response.json();

    return Response.json(res, {status: res.statusCode});
}



