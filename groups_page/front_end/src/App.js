import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/modal.js";

function App() {
  const titles = ["Name", "Role", "", ""];
  const [data, setData] = useState([]);
  const [UpdatedRole, setUpdatedRole] = useState("");
  const [IsDeleted, setIsDeleted] = useState(0);
  const [isFilter, setIsFiltered] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [, setFilteredData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectedValue, setSelectedValue] = useState("option1");

  useEffect(() => {
    getdata();
  }, [IsDeleted]);

  const getdata = async () => {
    await axios
      .get("http://localhost:3008/getuserdata")
      .then((response) => {
        setData(response.data);
        setIsFiltered(response.data);
        setFilteredData(response.data);
        setFilterData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRole = async (event) => {
    try {
      let role = event.target.value;
      setUpdatedRole(role);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearchChange = (e) => {
    console.log(e.target.value);
    if (e.target.value === "") {
      setSearchInput("");
      setIsFiltered(data);
      setFilterData(data);
    } else {
      setSearchInput(e.target.value);
    }
  };

  const handleSearchSubmit = (List) => {
    console.log(`Searching for: ${searchInput}`);
    let filtered = List.filter((user) =>
      user.username.toLowerCase().includes(searchInput.toLowerCase())
    );
    setIsFiltered(data);
    setFilterData(filtered);
  };

  const handleChange = async (res) => {
    try {
      const response = await axios.put(
        `http://localhost:3008/updateuserdata/${res}`,
        { role: UpdatedRole, id: res }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (res) => {
    const data = { id: res };
    if (window.confirm("Are you sure?")) {
      try {
        await axios.delete(`http://localhost:3008/deleteuserdata`, { data });
        console.log("Data deleted");
      } catch (error) {
        console.log(error);
      }
      setIsDeleted(!IsDeleted);
      console.log("Admin clicked ok");
    } else {
      console.log("Admin clicked cancel");
    }
  };

  const filterByBoth = (List) => {
    let filtered = List;
    setIsFiltered(filtered);
    setFilterData(filtered);
  };

  const filterByTra = (List) => {
    let filtered = List.filter((user) => user.role_name.includes("Translator"));
    setIsFiltered(filtered);
    setFilterData(filtered);
  };

  const filterByRev = (List) => {
    let filtered = List.filter((user) => user.role_name.includes("Reviewer"));
    setIsFiltered(filtered);
    setFilterData(filtered);
  };

  const handleRoleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="App">
      <div className="topbar">
        <img src="/image.png" className="logo" alt="Lyric_Tranxify_Logo" />
        <div className="top_search">
          <button className="find">
            <span class="material-symbols-outlined icon">search</span>
          </button>
          <input
            className="search"
            type="text"
            id="text"
            placeholder="Search.."
          ></input>
        </div>
        <div className="profile">
          <button className="notification">
            <span class="material-symbols-outlined">notifications</span>
          </button>
          <button className="account">
            <span class="material-symbols-outlined">account_circle</span>
          </button>
        </div>
      </div>
      <div className="navibar">
        <button className="home">
          {" "}
          <span class="material-symbols-outlined">home</span>HOME
        </button>
        <br></br>
        <button className="home">
          {" "}
          <span class="material-symbols-outlined">add_task</span> ASSIGN TASK
        </button>
        <br></br>
        <div className="Group_button">
          <button className="home">
            {" "}
            <span class="material-symbols-outlined">group</span>GROUPS
          </button>
          <br></br>
        </div>
        <button className="home">
          {" "}
          <span class="material-symbols-outlined">help</span>HELP
        </button>
        <br></br>
        <button className="home">
          {" "}
          <span class="material-symbols-outlined">logout</span>LOGOUT
        </button>
      </div>
      <div className="blue">
        <div className="backarrow">
          <button>
            <span class="material-symbols-outlined">arrow_back</span>
          </button>
          <p className="group">Groups</p>
        </div>
        <div className="searchelement">
          <form onSubmit={handleSearchSubmit}>
            <input
              className="web"
              type="text"
              placeholder="filter with name"
              value={searchInput}
              onChange={handleSearchChange}
            />
          </form>
          <button
            className="buttonsearch"
            onClick={() => {
              handleSearchSubmit(isFilter);
            }}
            type="sumbit"
          >
            <span className="material-symbols-outlined">manage_search</span>
          </button>
        </div>
        <div className="radio_button">
          <input
            type="radio"
            name="usertype"
            value="option1"
            onClick={() => {
              filterByBoth(data);
            }}
            checked={selectedValue === "option1"}
            onChange={handleRoleChange}
          />
          Both  {" "}
          <input
            type="radio"
            name="usertype"
            value="option2"
            onClick={() => {
              filterByTra(data);
            }}
            checked={selectedValue === "option2"}
            onChange={handleRoleChange}
          />
          Translator  {" "}
          <input
            type="radio"
            name="usertype"
            value="option3"
            onClick={() => {
              filterByRev(data);
            }}
            checked={selectedValue === "option3"}
            onChange={handleRoleChange}
          />
          Reviewer
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              {titles.map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filterData
              .slice()
              .sort((a, b) => {
                return a.username.localeCompare(b.username);
              })
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.username}</td>
                  <td>
                    <select
                      defaultValue={item.role_name}
                      name="role"
                      id="role"
                      onChange={handleRole}
                    >
                      <option value="Translator">Translator</option>
                      <option value="Reviewer">Reviewer</option>
                    </select>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="assign"
                      onClick={() => {
                        handleChange(item.id);
                      }}
                    >
                      Assign
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="delete"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
