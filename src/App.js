import { useState } from "react";
const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
    showBillCalculator: false,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
    showBillCalculator: false,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
    showBillCalculator: false,
  },
];

export default function App() {
  const [addFriend, setAddFriend] = useState(false);
  const [friendList, setFriendList] = useState(initialFriends);
  const [showBill, setShowBill] = useState(false);
  function handleValues(value) {
    const updatedFriendList = friendList.map((friend) => {
      if (friend.showBillCalculator === true) {
        return {
          ...friend,
          showBillCalculator: false,
          balance: value,
        };
      }

      return friend;
    });
    console.log(updatedFriendList);
    setShowBill(!showBill);
    setFriendList(updatedFriendList);
  }
  function HandleShowBill(id) {
    setShowBill((showBill) => !showBill);
    const updatedFriendList = friendList.map((friend) => {
      if (friend.id === id) {
        return {
          ...friend,
          showBillCalculator: !friend.showBillCalculator,
        };
      }
      return friend;
    });
    setFriendList(updatedFriendList);
  }
  function addFriendToFriendList(friendData) {
    setFriendList((existingList) => [...existingList, friendData]);
    setAddFriend((currState) => !currState);
  }
  function handleAddFriend() {
    setAddFriend((currState) => !currState);
  }
  return (
    <div className="app">
      <FriendList showBill={HandleShowBill} friendList={friendList} />
      <AddNewFriend
        addFriendToFriendList={addFriendToFriendList}
        addFriend={addFriend}
      />
      {!addFriend && (
        <Button className="add-friend" OnHandleButton={handleAddFriend}>
          Add New Friend
        </Button>
      )}
      {showBill && <BillCalculator handleValues={handleValues} />}{" "}
    </div>
  );
}
function FriendList({ friendList, showBill }) {
  return (
    <div className="friend-list">
      {friendList.map((friend) => {
        return (
          <Friend showBill={showBill} key={friend.id} friendData={friend} />
        );
      })}
    </div>
  );
}

function Friend({ friendData, showBill }) {
  const { name, image, balance } = friendData;
  return (
    <div className="friend">
      <div className="friend-divider">
        <main className="friend-main">
          <img src={image} alt={name} />
          <h3>{name}</h3>
          <p
            className={`${balance > 0 ? "green" : "red"} ${
              balance === 0 ? "even" : ""
            }`}
          >
            {balance < 0 && `You owe ${name} $${Math.abs(balance)}`}
            {balance > 0 && ` ${name} owe you $${Math.abs(balance)}`}
            {balance === 0 && `You and ${name} are even`}
          </p>
        </main>
        <Button
          OnHandleButton={() => {
            showBill(friendData.id);
          }}
        >
          Details
        </Button>
      </div>
    </div>
  );
}

function AddNewFriend({ addFriend, addFriendToFriendList }) {
  const [friendName, setFriendName] = useState("");
  const [pictureURL, setPictureUrl] = useState("");

  function handleForm(e) {
    e.preventDefault();
    const newFriendData = {
      name: friendName,
      image: pictureURL,
      balance: 0,
      id: Date.now(),
    };
    addFriendToFriendList(newFriendData);
    setFriendName("");
    setPictureUrl("");
  }
  return (
    <>
      {addFriend && (
        <form onSubmit={handleForm} className="add-new-friend">
          <label>
            Friend Name
            <input
              value={friendName}
              onChange={(e) => {
                setFriendName(e.target.value);
              }}
              type="text"
            />
          </label>
          <label>
            Image:
            <input
              type="text"
              value={pictureURL}
              onChange={(e) => setPictureUrl(e.target.value)}
            />
          </label>
          {addFriend && <Button type={"submit"}>Add Friend</Button>}
        </form>
      )}
    </>
  );
}

// BillCalculator component
function BillCalculator({ handleValues }) {
  const [totalBill, setTotalBill] = useState(0);
  const [yourExpense, setYourExpense] = useState(0);
  const [yourFriendExpense, setYourFriendExpense] = useState(0);
  const [whoPaid, setWhoPaid] = useState("");

  function handleSplitCalculation(e) {
    e.preventDefault();
    let calculatedBalance;
    if (whoPaid === "You") {
      calculatedBalance = Number(totalBill - yourExpense);
    } else if (whoPaid === "Your Friend") {
      calculatedBalance = Number(yourFriendExpense - totalBill);
    }
    handleValues(calculatedBalance);
  }

  return (
    <form className="bill-calculator" onSubmit={handleSplitCalculation}>
      <label>
        Total Bill:
        <input
          type="number"
          value={totalBill}
          onChange={(e) => setTotalBill(e.target.value)}
        />
      </label>
      <label>
        Your Expense:
        <input
          type="number"
          value={yourExpense}
          onChange={(e) => setYourExpense(e.target.value)}
          placeholder="Your Expense"
        />
      </label>
      <label>
        Your Friend's Expense:
        <input
          type="number"
          placeholder="Your Friend Expense"
          value={yourFriendExpense}
          onChange={(e) => setYourFriendExpense(e.target.value)}
        />
      </label>
      <label>
        Who Paid:
        <select value={whoPaid} onChange={(e) => setWhoPaid(e.target.value)}>
          <option value="">Select</option>
          <option value="You">You</option>
          <option value="Your Friend">Your Friend</option>
        </select>
      </label>

      <Button type="submit" className="calculate">
        Calculate
      </Button>
    </form>
  );
}

function Button({ children, className, OnHandleButton, type }) {
  return (
    <button
      type={type}
      onClick={OnHandleButton}
      className={`button ${className}`}
    >
      {children}
    </button>
  );
}
