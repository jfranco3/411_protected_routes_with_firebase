## Day 4 - Class 11 Queries

#### Combine it all together

When a user clicks a heart to like we need to update the `userLikedCars` collection document and add the `likedCarsId` cars array.
`{ userId: userId, likedCarsId: []}` Then display a full heart if the car is liked or a heart outline if the car is not liked. In addition, we will have a list of liked cars on the dashboard page.

14. In the `<App/>` component we are just `console.log(doc.id, " => ", doc.data());` the returned data. Instead follow the data model from the `likedExample` as a guide in the context `LikedCarsProvider` component and save it to `setLikedCars` state instead of just logging it.

15. Now we can access the `likedCars` state anywhere in the app. Now instead of just logging the `car.id` implement `useContext` to pass `likedCars` document to be updated to the database when the car is clicked. Be sure to Update both the `likedCars` state and the document fromm `userLikedCars` collection. Now check the database and `likedCars` state they should match when you click on heart.

16. Implement a condition render for the two heart icons. If the id exists in `likedCarsId` array then render the solid heart if it does not exist render the outlined heart. `.includes(car.id)` would be a useful method to check if a value exists in an array.

17. We now want to render the favorite cars in a list on the dashboard page. We will need the `likedCars` and use the id to find the car in `carsData` and display the model and link to the details when they click the more details link. In `FavoritesList.js` Fill in the missing `.map((ele,indx) => `, `primary={carsData.find().model}`, `/car/${}` code and export it to display a list of favorite cars in the dashboard.

18. Implement delete in the `toggleFavorite` favorites function. You will need to check if the id exists in the like array already and if it does not call `handleAdd` else call `handledelete`.

## Queries

Use the [Documentation](https://firebase.google.com/docs/firestore/query-data/queries) and your FireBase Learning app to understand queries first. Then continue with this assignment. Also, here is a [video example](https://www.youtube.com/watch?v=gEaY2GZMino) to follow that is close to a setup we already have from CRUD Pre-class.

### Add Feature: User Can Like Cars

This will be a major feature that will utilize much that you have learned so far. From reading/writing to a database, to creating collections and querying data.

The expected behavior is for a user to be able to click a heart icon and save that car to the database so when the user comes back they will be able to see their saved cars on the home page and a list of them in the dashboard. In general, when it comes to adding a new feature you always want to start with the data. This is called data driven design.

1. When a user Signs up a new collection will be created called `userLikedCars`. This collection will hold the `userId` and an array of `likedCarsIds` for each user who signs up. Create a function that saves this `{ userId: userId, likedCarsIds: []}` to the `userLikedCars` collection in your database on initial signing up. After that you should Sign up a new user and check the FireStore database to see if it worked.

#### Clickable Icon for each Car On the Home page

2. Next we need some icons to click on that will change based on if they have favorited a car on the home page. We should have it already [package](https://www.npmjs.com/package/@mui/icons-material)(you will see it in package.json dependencies) then read the [Documentation](https://mui.com/material-ui/material-icons/) for material-icons. Find the heart icons--one that is solid and one the is just an outline--and import them. For now add both icons to each car so they appear after the list of car attributes. You should see the two hearts next to each other on every car card on the home page.

3. Now we need some `onClick` functionality so that we can capture the id of the chosen car. Remember when passing in a value to an `onClick` function you need to use an anonymous function that returns another function so the value can be passed in; it will look something like this:

```javascript code below
onClick={()=> toggleFavorite(car.id)}
```

This is an anonymous arrow function that returns the named function you will create. Without this extra, outer function, `toggleFavorite` would execute right away instead of when clicked. Test with a `console.log()` of the carId when it is clicked.

4. Our goal is to update the database in the `userLikedCars` collection when the car with the corresponding id is clicked on. Up to this point, we have only written to the database. Now we need to read it and get the `userLikedCars` document by Querying with the userId because we saved it in our database like this:

```javascript
{ userId: "<the user's id>", likedCarsIds: []}
```

Go look at your FireBase `userLikedCars` collection, at each document in the collection. You will see two properties and values (key/value pairs): `userId`, and an empty `likedCarsIds` array.

#### `App.js` and the userId(uid)

5. Go to `App.js` for the firebase user object that contains the userId (user.uid). And use that to query the `userLikedCars` collection for the matching document. We then want to update our `userLikedCars` state with the results of this query. Copy and paste the code below to get you started. Go to the [Documentation](https://firebase.google.com/docs/firestore/query-data/queries) if unsure on how to query and read the database. Note: the following is a little tricky so I have included the necessary imports to guide you toward the right way to do this, as well as the line where it updates the state. Read the Docs!

```javascript
// App.js
import { collection, getDocs, query, where } from "firebase/firestore";
//class 11:  Query `userLikedCars` collection for the matching document based on the user Id (uid).
useEffect(() => {
  const getUsersLikedCars = async () => {
    // Write the rest of the code here
    // const userLikedCarsRef = <this will be a reference to the userLikedCars collection>
    // const q = query(<some code goes here>)
    // const queryResults = <more code here>
    queryResults.forEach((doc) => setUserLikedCars(doc.data().likedCarsIds)); // you will have to loop over the result even though it's an object. Weird! This is why we RTFM!
  };
  if (user?.uid != null) {
    getUsersLikedCars();
  }
}, [user]);
```

Hint: You will need to create a query (using the `query` and `where` methods from Firebase), then execute that query with the `getDocs()` method from Firebase, and then you will loop over the result and use the `.data()` method on each result. I actually included this last part in the code up above because it's a strange way to return the data, but that's how Firestore works so we will adapt.

RTFM!

6. We need to save the results of querying the `userLikedCars` collection in state (which we just did) and pass it down via props to update `likedCarsIds` when a car is clicked. We have been prop drilling. Passing props to every level. Instead we are going to use `createContext` To set the state and automatically pass props all the way down without having to do it ourselves. There will be some slightly different code but, underneath it is working exactly the same as before.

#### Context

7. Go to `Context/FakeCarsProvider.js` file. You will see a component that is setup to wrap around children components and pass its state and props down to them.

8. Since we want our state/props to be available to our entire app we want to setup the context component above our app component in the `index.js` file.

Add: `import { FakeCarsProvider } from './Context/likesContext`

Change: `root.render(<FakeCarsProvider><App /></FakeCarsProvider>);`

```javascript
// index.js
import React from "react";
import * as serviceWorker from "./serviceWorker";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

import { FakeCarsProvider } from "./Context/likesContext";

const root = createRoot(document.getElementById("root"));
// <App /> Is Now  Child of <FakeCarsProvider>
root.render(
  <FakeCarsProvider>
    <App />
  </FakeCarsProvider>
);

serviceWorker.unregister();
```

9. We will move all the state in App.js to `Context/FakeCarsProvider.js`. Notice the FakeCarsContext.Provider component:

```javascript
<FakeCarsContext.Provider value={value}>{children}</FakeCarsContext.Provider>
```

It was declared and created at the top of our file:

```javascript
const FakeCarsContext = createContext();
```

and now we will use it to pass props down. We will keep track of all the values we pass down with a values object:

```javascript
import React, { createContext, useState } from "react";
const FakeCarsContext = createContext();

// A "provider" is used to denote a component that passes its props all the way down the component tree.
//  {children} exists on every Component's "props" object and refers to whatever is in the "return" of this component when it is rendered (inside our root's index.js)
function FakeCarsProvider({ children }) {
  const [user, setUser] = useState({});
  const [carsData, setCarsData] = useState([]);
  const [userLikedCars, setUserLikedCars] = useState([]);

  const value = {
    carsData,
    setCarsData,
    user,
    userLikedCars,
    setUserLikedCars,
    setUser,
  };

  return (
    <FakeCarsContext.Provider value={value}>
      {children}
    </FakeCarsContext.Provider>
  );
}

export { FakeCarsProvider, FakeCarsContext };
```

Basically, we want any state which might require prop drilling, to originate here. This will provide us a sort of system of "global state management." Now we can focus on our UI instead of remembering where our props are rendered, passed, and received. No matter how deeply nested our components get, we can import the required state and setState values where we need them, instead of keeping up with a complicated pipeline. If we use a setState() method in a nested component, it will update the state in FakeCarsProvider.js and cascade down through our app anywhere that state is being used, updating all of its instances. Just like how it was working when it originated in App.js, without the need for prop drilling.

10. This will work in any component but for this example we will use `Home.js`. Import our context:

```javascript
import { FakeCarsContext } from "./../Context/FakeCarsProvider";
```

To read our username data we need to import a new hook:

```javascript
import React, { useContext } from "react";
```

11. At the top of the `<Home/>` component, [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) the value(s) we need from our FakeCarsContext:

```javascript
const { userLikedCars } = useContext(FakeCarsContext);
```

then `console.log("userLikedCars",userLikedCars)` it and start the app and check for the value. After that, experiment with the commented code and change the state of userLikedCars inside of FakeCarsProvider (with the setUserLikedCars setter we passed down).

```javascript
// Home.js
import React, { useContext } from 'react'
import { FakeCarsContext } from './../Context/FakeCarsProvider'
//   // WE CAN CHANGE THE STATE with SetLikedCarsContext fromm FakeCarsProvider.js
//   // `import {FakeCarsContext, SetLikedCarsContext,} from './../Context/FakeCarsProvider'`

const Home = () => {
    const { carsData, userLikedCars } = useContext(FakeCarsContext);
    console.log("userLikedCars", userLikedCars)
    //      const { setUserLikedCars } = useContext(FakeCarsContext);
    //      setUserLikedCars("Change values here");
    //      console.log("userLikedCars", userLikedCars) // updated values


```

12. After testing and understanding Context, proceed to update all the props drilling we had done prior with the values from our Context Provider. (We can also delete all those prop={prop} properties on our Components which require them).
