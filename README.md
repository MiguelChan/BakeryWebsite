[![Website CI](https://github.com/MiguelChan/BakeryWebsite/actions/workflows/workflow.yml/badge.svg?branch=mainline)](https://github.com/MiguelChan/BakeryWebsite/actions/workflows/workflow.yml)

### Overview

Bakery Website Project

### Project Structure

Since we're going to be building a `ReactJS Application` with `NodeJS` and its TypeScript definitions, the project is split into the following source architecture:

* `RootFolder`
  * `packages/web-api` - Here lies all the ServerSide (NodeJS) code.
  * `packages/web-app` - Here lies all the FrontEnd (UI/React) code.
  * `Dockerfile` - For generating the Docker Images 

#### API Folder

* `RootFolder` (web-api)
  * `src`: Underlying NodeJS code lives under here.
    * `app.ts` - The main entry point for the Application. 
    * `controllers` - The controllers folder. Each Controller should lie in here. 
    Controllers are nothing more and nothing else than just data-transferrer objects. 
    Should an exception occur then this layer should capture the exception and return the correct output to the ClientSide. 
    The `index.ts` file is a barrel file for exporting all the controllers for easier access.
    * `dtos`: DataTransferObjects meant to be used as part of request/response layers. 
    These DTO's only hold the information required to the UI. Not to be confused with the `models` folder.
    A Single DTO can include a whole Model.
    * `middlewares`: Things such as data validation, data failures and signing-in should live in here. 
    According to the `express.js` documentation a middleware just validates the data.
    A good example can be: Whenever a new object is created, validate that the required fields are in the DTO, should they not be in there, then the middle
    should **not** pass the request to the controller.
    * `models`: Domain Models.
    * `routes`: Routing configuration goes into this package. All routes **should** extend from the `CommonRoutesConfig.ts` file and within these files
    we're going to add al l the required configuration e.g. Suppliers Routes have their own `SuppliersRoutes.ts` file and it redirects the data to the `SuppliersController.ts` 
    Controller.
    * `services`: The Services layer is what connect us to the actual Backend Service - not to the confused with the Thin-Backend-layer service. The actual service that stores the data
    should be called from the `****Service` File e.g. `SuppliersService` should call the `Suppliers` MicroService.
    * `utils`: Utilities called accross the Application.
  * `tst`: Unit-Testing for the NodeJS code packages lives in here. The `tst` folder should follow the same structure as the `src` one in order to keep consistency
  accross the packages.
  
### FrontEnd-App
* `RootFolder` (web-app)
  * `src`: Where all the components should live.
    * `Clients`: API Clients to make different calls to different services. It would be nice to have a Client per Module i.e. `SuppliersClient.ts` and `AccountsClient.ts`.
    * `Components`: Main UI Components Folder. Each `Component` should live in its very own folder, and each folder should contain all the related source and test code.
      * `Blocks`: Main building blocks. Like `TableHeaders`, `ListItems` and so on. They will be later used on by another Component.
      * `Composites`: Composites are Components that are made up of `Blocks`. They don't have any logic within them, they just group Components from `Blocks` and display them.
      * `Constructed`: Constructed Components are Components that are made up by `Composite` components. They start to have some logic such as validation, ideally they should pass data
      to the `Composite` component so they can be rendered. They can also have logic, like fetching data from the Server and passing them down to somewhere else.
      * `Pages`: Actual Website Pages. A page can be `SuppliersPage.ts` in where the Suppliers Page only takes care of displaying a `Constructed` component into the UI.
      * `Models`: UI Models, they should be exported by a barrel file (`index.ts`).
      * `Utils`: UI Utils, they should be exported by a barrel file (`index.ts`).
      
### Building the Dockerfile

Whenever your want to test the whole WebApp suite, you need to build the Docker image-file. In order to do so, follow these easy steps to generate a Docker Image and use it in your Docker-Desktop App.

* `docker build -t website-app:<PutAVersionInHere> .`: This will generate a Docker image that can be mounted and ready to be used.
* Now you can mount the image and start testing it. 