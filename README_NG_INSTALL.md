# Configure machine
- Install VS code
- Install GIT from VS code
- In VS terminal set the global proxy as 
  git config --global http.proxy http://proxy-bc-el.regione.fvg.it:801          or 
  git config --global http.proxy http://proxy-bc.regione.fvg.it:8002
- In VS terminal set the global user config 
- Install node but check compatibility before here https://angular.io/guide/versions
- Open VS terminal and install angular 
  npm i -g @angular/cli@15.2.2
- In VS terminal install yarn
  npm install --global yarn

# Configure VS
- Open file > Preferences > Settings > User and look for proxy, check the value is right
If you don't see User settings leave the setting open, close VS then reopen it. it should magically appear

# Retrieve git project and make it run
- Open new window in VS go to the git tab and choose clone repository
- Add the repository and check for windows that might open to ask for credentials or popups (either in the bottom-right corner or up center) that ask for some input in VS
- Let VS register with github and let it download
- install everything
  yarn install
- check if it works
  yarn start 
  http://127.0.0.1:8000/admin/

# PROBLEM: L'esecuzione di script è disabilitata nel sistema in uso. Per ulteriori informazioni, vedere about_Execution_Policies all'indirizzo ...
You might not have admin privileges in VS terminal
- Open cmd as local admin
- Cd to the project location and type the command 

node:internal/event_target:1084
  process.nextTick(() => { throw err; });