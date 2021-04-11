import React, { useEffect, useState } from 'react';
import { BASE_URL, sendRequestWithBody } from './utils';

export const InventoryTrackerPage = () => {
  const [items, setItems] = useState([]);
  const [targetSearchID, setTargetSearchID] = useState();
  const [targetDeleteID, setTargetDeleteID] = useState();
  useEffect(() => {
    getAllItems();
  }, []);
  const getAllItems = () => {
    let path = '/allItems';
    let url = BASE_URL + path;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  };
  const getItemById = (order) => {
    let itemId = getItemIDByOrder(order - 1)[0];
    let path = '/itemsid';
    let url = BASE_URL + path + '?id=' + itemId;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setItems([...data]);
      });
  };
  const getItemIDByOrder = (order) => {
    return items
      .map((item, index) => {
        if (index == order) {
          return item.id;
        }
      })
      .filter((el) => {
        return el != undefined;
      });
  };
  const updateInputedItem = (inputedItem) => {
    let item = items.filter((item) => {
      return item.id == inputedItem.id;
    })[0];
    if (item) {
      if (!compareItem(item, inputedItem)) {
        for (let index = 0; index < Object.keys.length; index++) {
          if (items[index].id == inputedItem.id) {
            if (items[index].quantity !== inputedItem.quantity) {
              updateItemStock(inputedItem);
            }
            if (items[index].name !== inputedItem.name) {
              updateItemName(inputedItem);
            }
            items[index] = inputedItem;
            setItems([...items]);
          }
        }
      }
    } else {
      setItems([...items, inputedItem]);
      addItem(inputedItem);
    }
  };
  const updateItemStock = (item) => {
    let path = '/updateItemStock';
    let url = BASE_URL + path;
    let method = 'PUT';
    let body = { id: item.id, quantity: item.quantity };
    url += '?' + 'id=' + item.id + '&' + 'quantity=' + item.quantity;
    fetch(url, {
      method: method,
      mode: 'cors',
    });
    console.log('suc');
  };
  const updateItemName = (item) => {
    let path = '/updateItemName';
    let url = BASE_URL + path;
    let method = 'PUT';
    url += '?' + 'id=' + item.id + '&' + 'name=' + item.name;
    fetch(url, {
      method: method,
      mode: 'cors',
    }).then(() => {
      console.log('suc');
    });
  };
  function compareItem(item1, item2) {
    return (
      item1.id == item2.id &&
      item1.name == item2.name &&
      item1.quantity == item2.quantity &&
      item1.description == item2.description
    );
  }
  const deleteItemById = (order) => {
    let itemId = getItemIDByOrder(order - 1)[0];
    let path = '/deleteItemId/' + itemId;
    let url = BASE_URL + path;
    fetch(url, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
    })
      .then((res) => res.text())
      .then((data) => {
        let itemList = items.filter((item) => {
          return item.id !== itemId;
        });
        setItems(itemList);
      });
  };
  //add item
  const addItem = (e) => {
    let item = {
      name: 'item' + items.length + Math.floor(Math.random() * 10000), // returns a random integer from 1 to 100
      quantity: 0,
      description: 'lalala',
    };
    setItems([...items, item]);
    updateItem(item);
  };
  function updateItem(item) {
    let body = item;
    let path = '/addNewItem';
    let url = BASE_URL + path;
    let method = 'POST';
    sendRequestWithBody(url, body, method);
  }
  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="search by item id"
          onChange={(e) => {
            setTargetSearchID(e.target.value);
          }}
        />
        <button
          onClick={() => {
            getItemById(targetSearchID);
          }}
        >
          Search
        </button>
        <br />

        <input
          type="text"
          placeholder="delete by item id"
          onChange={(e) => {
            setTargetDeleteID(e.target.value);
          }}
        />
        <button onClick={() => deleteItemById(targetDeleteID)}>
          Delete item by ID
        </button>
        <br />
        <button onClick={getAllItems}>Search All</button>
      </div>
      {items.map((item, index) => {
        return (
          <Item
            item={item}
            index={index}
            key={index}
            updateInputedItem={updateInputedItem}
          />
        );
      })}
      <div className="buttom">
        <button onClick={(e) => addItem(e)}>add item</button>
      </div>
    </div>
  );
};

const Item = ({ item, index, updateInputedItem }) => {
  const updateItem = (e) => {
    e.preventDefault();
    let keys = Object.keys(e.target);
    let itemId = 0;
    let values = keys
      .filter((key) => {
        return !isNaN(key);
      })
      .map((key) => {
        if (key == 0) {
          itemId = e.target[key].id;
        }
        return e.target[key].value;
      })
      .slice(0, -1);

    if (itemId !== 0) {
      let item = {
        id: parseInt(itemId),
        name: values[0],
        quantity: parseInt(values[1]),
        description: values[2],
      };
      updateInputedItem(item);
    }
  };
  return (
    <div>
      <form onSubmit={(e) => updateItem(e)}>
        <h3>{index + 1}</h3>
        <label htmlFor={item.name}>
          Name:
          <input
            type="text"
            name="item"
            id={item.id}
            defaultValue={item.name}
          />
        </label>
        <br />
        <label htmlFor={item.name}>
          Quantity:
          <input
            type="number"
            name="item"
            id={item.id}
            defaultValue={item.quantity}
          />
        </label>
        <br />
        <label htmlFor={item.name}>
          Description:
          <textarea defaultValue={item.description} />
        </label>
        <br />
        <input type="submit" value="Update" />
      </form>
    </div>
  );
};
