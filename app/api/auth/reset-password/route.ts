export async function PATCH(request: Request) {
    const body = await request.json();
    if (!body.oldPassword || !body.newPassword || !body.newPasswordAgain || !body.userId || !body.email) {
        return Response.json({error: 'Missing required fields'}, {status: 400});
    }

    // check if new passwords match
    if (body.newPassword !== body.newPasswordAgain) {
        return Response.json({error: 'New passwords do not match'}, {status: 400});
    }

    // check if new password is at least 8 characters long
    if (body.newPassword.length < 8) {
        return Response.json({error: 'New password must be at least 8 characters long'}, {status: 400});
    }

    // check if new password does not contain at least 1 number
    if (!/\d/.test(body.newPassword)) {
        return Response.json({error: 'New password must contain at least 1 number'}, {status: 400});
    }

    // check if new password does not contain at least 1 uppercase letter
    if (!/[A-Z]/.test(body.newPassword)) {
        return Response.json({error: 'New password must contain at least 1 uppercase letter'}, {status: 400});
    }

    // check if new password does not contain at least 1 lowercase letter
    if (!/[a-z]/.test(body.newPassword)) {
        return Response.json({error: 'New password must contain at least 1 lowercase letter'}, {status: 400});
    }

    // check if new password does not contain at least 1 special character
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(body.newPassword)) {
        return Response.json({error: 'New password must contain at least 1 special character'}, {status: 400});
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



