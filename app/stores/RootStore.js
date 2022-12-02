import { types } from "mobx-state-tree";
import { sortBy } from "lodash";
import React from "react";
import uuid from 'react-native-uuid';
import { nowAsString, sqlDateToJsDate } from './utils';

const uuidv4 = uuid.v4;

const ThingToDo = types.model('ThingToDo', {
  id: types.identifier,
  name: types.string,
  rank: types.number,
  isHidden: types.optional(types.boolean, false),
});

const ThingsDone = types.model('ThingsDone', {
  id: types.identifier,
  thingId: types.string, // "that" thing if it's the bad thing
  date: types.string,
}).views(self => ({
  get jsDate() {
    return sqlDateToJsDate(self.date);
  }
}));

// create a RootStore that keeps all the state for the app
const RootStore = types
  .model("RootStore", {
    thingsToDo: types.optional(types.array(ThingToDo),[]),
    thingsDone: types.optional(types.array(ThingsDone),[]),
  })
  .views((self) => ({
    get thingsToDoSorted() {
      return sortBy(self.thingsToDo, (c) => c.rank);
    },
    get thingsDoneSorted() {
      return sortBy(self.thingsDone, (c) => c.date);
    },
  }))
  .actions((self) => {

    const addThingToDo = function(name) {
      self.thingsToDo.push({
        id: uuidv4(),
        name,
        rank: self.thingsToDo.length
      });
    }
    return {
      addThingToDo
    };
  });

// Create a Provider that creates a singleton for the RootStore, wrap it in a Provider component, and create a custom hook to make it easy to use

const StoreContext = React.createContext(null);

export const StoreProvider = ({ children }) => {
  const store = RootStore.create({});
  // demo data:
  store.addThingToDo('Do the dishes');
  store.addThingToDo('Do the laundry');
  store.addThingToDo('Do the vacuuming');
  store.addThingToDo('Watch a movie');
  store.addThingToDo('Play a video game');
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// We'll use this this to use the store in screen components
export const useStore = () => {
  const store = React.useContext(StoreContext);
  if (!store) {
    // not likely, but sure
    throw new Error("useStore must be used within a StoreProvider.");
  }
  return store;
};
