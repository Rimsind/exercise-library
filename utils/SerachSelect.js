const handleTruckSelect = ({ event, newValue }) => {
  let number;
  if (typeof newValue === "string") {
    number = newValue;
  } else if (newValue && newValue.inputValue) {
    number = newValue.inputValue;
  } else {
    number = newValue;
  }

  if (number) {
    const res = trucks.find((item) => {
      if (item?.attributes?.number == number) {
        return item;
      }
    });
    setSelectTruck(res);
  }
};
const handlePartySelect = ({ event, newValue }) => {
  let name;
  if (typeof newValue === "string") {
    name = newValue;
  } else if (newValue && newValue.inputValue) {
    name = newValue.inputValue;
  } else {
    name = newValue;
  }

  if (name) {
    const res = parties.find((item) => {
      if (item?.attributes?.name == name) {
        return item;
      }
    });
    setSelectParty(res);
  }
};
const handlePumpSelect = ({ event, newValue }) => {
  let name;
  if (typeof newValue === "string") {
    name = newValue;
  } else if (newValue && newValue.inputValue) {
    name = newValue.inputValue;
  } else {
    name = newValue;
  }

  if (name) {
    const res = hsdPumps.find((item) => {
      if (item?.attributes?.name == name) {
        return item;
      }
    });
    setSelectPump(res);
  }
};
const handleDestinationSelect = ({ event, newValue }) => {
  let name;
  if (typeof newValue === "string") {
    name = newValue;
  } else if (newValue && newValue.inputValue) {
    name = newValue.inputValue;
  } else {
    name = newValue;
  }

  if (name) {
    const res = destinations.find((item) => {
      let itemName = `${item?.attributes?.city}-${item?.attributes?.district}-${item?.attributes?.state}`;
      if (itemName == name) {
        return item;
      }
    });
    setSelectDestination(res);
  }
};
