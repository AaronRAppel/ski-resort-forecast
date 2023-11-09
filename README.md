# Put A Name Here

## Decisions

### Create React App

I decided to use create react app because it takes care of configuration, builds, it provides a good developer experience, and saves time when creating a new single page application.

I used the TypeScript template because I have found that TS makes my code more readable, helps me catch errors more quickly, and overall speeds up development.

### State Management

I decided to use Redux for this app because it's flexible, consistent, easy to test, and it plays well with React.

### UI

Material UI: I decided to use MUI because it is simple yet flexible, and saves me the time of creating custom UI components.

### Additional Dependencies

Recharts: I chose this library because it's simple, quick, and build with D3 (which I would use for charts/graphs that require more customization). It also has some basic accessibility features, for instance, you can tab to the graph in this app and navigate through points with the arrow keys.

Axios: I like using Axios for API calls because it does an automatic data transformation to JSON, it helps with error handling, and it has polyfills for older browsers.

Prettier: I generally use Prettier for auto-formatting. I've found this speeds up development and enforces consistent style, which becomes increasingly important as you add more developers to a project.

Moment: I'm using moment for date comparison/manipulation because it's much simpler to use than JS Date.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Notes

### Responsive Design
 Both the graph and the table are responsive. When the graph gets below a certain size, I update the date labels to only show the day as opposed to showing the date in YYYY-MM-DD format. The table is just side-scrollable, which comes by default with MUI. If I had more time, I would update the table rows to display the data in a more condensed way when on narrower screens.



## README requirements
Provide a README.md file that:
- Explains the decisions you made and why.
- Provides instructions on how to run the application.
- Highlight any additional features, enhancements, or parts of the code you are proud of.


### Things Left Out
- Authentication/User Management
- Routing