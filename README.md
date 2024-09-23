# SwoppMVP1

## Documentation

### Backend
#### Security scheme
We choose to use the IdentityCore framework for this project, where we add a jwt token to every request to an API-endpoint.

Have added a token based security scheme. This means that when a user logs in they get issued a JWT token, that
are used to authorize that they have the correct claims to get the resource they are requesting.
So i have added a Transporter Role claim so when user have registered as transporter they get the Transporter claim.
This is so that only the ones with the transporter claim can pick up deliveries.

This can be combined with cookies by saving the JWT token in a cookie and authorize the users that way.

### Objects
### Packet object
    [
    {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "timestamp": "2024-09-23T19:59:47.100Z",
    "message": "string",
    "originAddress": "string",
    "destinationAddress": "string",
    "originGeolocation": "string",
    "destinationGeolocation": "string",
    "originLatitude": 0,
    "originLongitude": 0,
    "destinationLatitude": 0,
    "destinationLongitude": 0,
    "height": 0,
    "width": 0,
    "depth": 0,
    "weight": 0,
    "available": true
    }
]

### Delivery object
    [
    {
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "packets": [
        {
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "timestamp": "2024-09-23T19:59:47.094Z",
        "message": "string",
        "originAddress": "string",
        "destinationAddress": "string",
        "originGeolocation": "string",
        "destinationGeolocation": "string",
        "originLatitude": 0,
        "originLongitude": 0,
        "destinationLatitude": 0,
        "destinationLongitude": 0,
        "height": 0,
        "width": 0,
        "depth": 0,
        "weight": 0,
        "available": true
        }
    ],
    "delivered": true
    }
    ]

### IdentityUser object
    {
    "id": "string",
    "userName": "string",
    "normalizedUserName": "string",
    "email": "string",
    "normalizedEmail": "string",
    "emailConfirmed": true,
    "passwordHash": "string",
    "securityStamp": "string",
    "concurrencyStamp": "string",
    "phoneNumber": "string",
    "phoneNumberConfirmed": true,
    "twoFactorEnabled": true,
    "lockoutEnd": "2024-09-23T20:06:12.103Z",
    "lockoutEnabled": true,
    "accessFailedCount": 0
    }
### Account enpoints

- /api/account/checkTransporterRole

Endpoint for checking if a user has the transporter claim. Variable is the Guid UserId, and will respond with the
claim with either true or false if the user has the transporter claim

- /api/account/checkTransporterRole

Endpoint to give a user a transporter claim

- /api/account/login

Endpoint to log in for the user and gives a JWT token in response that are used to authorize further request.

 - /api/account/register

Endppoint to register a user, now it just have email and password but this can be extended.

### Delivery endpoints
 - /api/Delivery/GetDeliveries

Endpoint to get all the current deliveries with all the packets contained in that delivery.

- /api/Delivery/GetDeliveryByUserId

Get all deliveries by a given userId.

#### Enpoints to add
- create delivery
- add packet to delivery
- delete delivery
- update delivery

### Packet endpoint
- /api/Packet/GetPackets

Get all the packets in the database
- /api/Packet/GetPacketsByUserId

Get only packets from a given user with the userid.
- /api/Packet/AddPacket

Add a new packet.
- /api/Packet/GetAvailablePackets

Get the packets that have true on the variable available, which means that the packet still is available for delivery.
- /api/Packet/SetAvailablePacketWithId

Set the availability of a packet with a given id to either true or false.
- /api/Packet/UpdatePacket

- Update information about a packet.
- /api/Packet/DeletePacket

Delete a packet.

