import "./App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/js/dist/modal.js";

function App() {

  const titles = ["Name", "Role", "", ""];
  const [UpdatedRole, setUpdatedRole] = useState("");
  const [IsDeleted, setIsDeleted] = useState(0);
  const [option, setOption] = useState("Both");
  const [data, setData] = useState([]);
  const [transData, setTransData] = useState([]);
  const [revData, setRevData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    const getdata = async () => {
      await axios
        .get("http://localhost:3008/getuserdata")
        .then((response) => {
          setData(response.data);
          setTransData(
            response.data.filter((user) =>
              user.role_name.includes("Translator")
            )
          );
          setRevData(
            response.data.filter((user) => 
              user.role_name.includes("Reviewer"))
          );
          if (option === "Both") {
            setFilterData(response.data);
          } else {
            setFilterData(
              response.data.filter((user) => user.role_name.includes(option))
            );
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };
    getdata();
  }, [IsDeleted, option]);

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
      if (option === "Both") {
        setFilterData(data);
      } else if (option === "Translator") {
        setFilterData(transData);
      } else {
        setFilterData(revData);
      }
    } else {
      setSearchInput(e.target.value);
    }
  };

  const handleSearchSubmit = () => {
    console.log(`Searching for: ${searchInput}`);
    if (option === "Both") {
      setFilterData(
        data.filter((user) =>
          user.username.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else if (option === "Translator") {
      setFilterData(
        transData.filter((user) =>
          user.username.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else {
      setFilterData(
        revData.filter((user) =>
          user.username.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  };

  const handleChange = async (res) => {
    try {
      const response = await axios.put(
        `http://localhost:3008/updateuserdata/${res}`,
        { role: UpdatedRole, id: res }
      );
      setIsDeleted(!IsDeleted);
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

  const filterByBoth = () => {
    setOption("Both");
    setFilterData(data);
  };

  const filterByTra = () => {
    setOption("Translator");
    setFilterData(transData);
  };
  const filterByRev = () => {
    setOption("Reviewer");
    setFilterData(revData);
  };

  const handleRoleChange = (event) => {
    setOption(event.target.value);
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
        <button className="home1">
          {" "}
          <span class="material-symbols-outlined">home</span>HOME
        </button>
        <br></br>
        <button className="home2">
          {" "}
          <span class="material-symbols-outlined">add_task</span> ASSIGN TASK
        </button>
        <br></br>
        <div className="Group_button">
          <button className="home3">
            {" "}
            <span class="material-symbols-outlined">group</span>GROUPS
          </button>
          <br></br>
        </div>
        <button className="home4">
          {" "}
          <span class="material-symbols-outlined">help</span>HELP
        </button>
        <br></br>
        <button className="home5">
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
          <form>
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
              handleSearchSubmit();
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
            value="Both"
            onClick={() => {
              filterByBoth(data);
            }}
            checked={option === "Both"}
            onChange={handleRoleChange}
          />
          Both  {" "}
          <input
            type="radio"
            name="usertype"
            value="Translator"
            onClick={() => {
              filterByTra(data);
            }}
            checked={option === "Translator"}
            onChange={handleRoleChange}
          />
          Translator  {" "}
          <input
            type="radio"
            name="usertype"
            value="Reviewer"
            onClick={() => {
              filterByRev(data);
            }}
            checked={option === "Reviewer"}
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
                  <td name={item.id}>{item.username}</td>
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