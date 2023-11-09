# Ski Conditions

## Scripts

### Running the app

First, run `yarn install` to install node modules.

Then, run `yarn start` to run the app locally.

### Testing the app

Run `yarn test` to run all tests.

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Building the app

Run `yarn build`

This builds the app for production to the `build` folder.

## Decisions

### Create React App

I decided to use create react app because it takes care of configuration, builds, provides a good developer experience, and saves time when creating a new single page application.

I used the TypeScript template because I have found that TS makes my code more readable, helps me catch errors faster, and overall speeds up development.

### State Management

I chose Redux because it's flexible, consistent, easy to test, and it plays well with React.

### UI

I'm using Material UI for a component library because it is simple yet flexible, and saves me the time of creating custom UI components.

I chose styled-components because it make it simple to use types, it's composable, and makes the JSX cleaner.

### Additional Dependencies

Recharts: I chose this library because it's simple, quick, and build with D3 (which I would use for charts/graphs that require more customization). It also has some basic accessibility features. For instance, you can tab to the graph in this app and navigate through points with the arrow keys.

Axios: I like using Axios for API calls because it does an automatic data transformation to JSON, it helps with error handling, and it has polyfills for older browsers.

Prettier: I generally use Prettier for auto-formatting. I've found this speeds up development and enforces consistent style, which becomes increasingly important as you add more developers to a project.

Moment: I'm using moment for date comparison/manipulation because it's much simpler to use than JS Date.

## Notes

### Data fetching

We only fetch data once for each resort. It would be simple to add a update data button by applying the retry logic, but I chose not to do that for now.

The app is wrapped `<React.StrictMode>`, so in development we render components twice which causes us to hit the API twice on the initial call. This will not happen in production, and if you would like to change it here, remove `<React.StrictMode>` in `src/index.tsx`.

### Responsive Design
 Both the graph and the table are responsive. When the graph gets below a certain size, I update the date labels to only show the day as opposed to showing the date in YYYY-MM-DD format. The table is just side-scrollable, which comes by default with MUI. If I had more time, I would update the table rows to display the data in a more condensed way when on narrower screens.

### Error handling

There is an error boundary wrapping the app, and I added basic error handling and retry functionality so that when a fetch fails, the user is notified and they have the option to retry the call. There is a fake resort with invalid coordinates at the bottom of the dropdown which you can use to test this functionality. (The endpoints also fail with 500s sporadically)



### Testing
I added component tests for the `<ConditionsTable />` and function tests for `getSortedData()`. I generally find that I get more value out of integration tests using Cypress or Selenium with MSW, but decided to keep it simple here. 

### Things Left Out
- Authentication/User Management
- Routing
- Theme