# SwoppMVP1

## Documentation

### Backend
#### Security scheme
We choose to use the IdentityCore framework for this project, where we add a jwt token to every request to an API-endpoint.
This is so that it can easily be configured to use an OAUTH2.0 security scheme if the application are deployed and used.

Added a login endpoint that will issue jwt-key to the user if the login are succesfull.
Added also a swagger page so that every endpoint in the backend can be seen there with what they require, and the response they give.

TODO - Create user endpoint