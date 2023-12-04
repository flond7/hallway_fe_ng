## basics
- ng new my-first-project
- cd my-first-project
- yarn start (to run the live project in dev mode)
- yarn install (when the repository is copied and you need to reinstall everything)

## create new component
- ng g component views/component-name
- add routing 

## constants.ts
Rember they can be imported in .ts files but to use them in a template you need to reassign them to a new variable defined in the view .ts file

## run on a host
To bind the local server on a specific ip address specify it with --host and the ip
- yarn start --host x.x.x.x


# Login with django
- Create an auth service where you have a login function. This function sends the credential and receives a JWT token in return
- Store the token in html cookies (install)

- Create an Interceptor with the purpose of adding the JWT token to any http request sent
  ng g interceptor authentication

- create a function to get the CSRF token (which is a token required for CORS)