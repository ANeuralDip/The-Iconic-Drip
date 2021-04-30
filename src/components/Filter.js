import React, {useState} from 'react';
import {Dropdown, ToggleButtonGroup, ToggleButton, Form, ButtonGroup} from 'react-bootstrap';
import { Slider} from '@material-ui/core';
import DropdownToggle from 'react-bootstrap/esm/DropdownToggle';
import DropdownMenu from 'react-bootstrap/esm/DropdownMenu';
import {
    ProSidebar,
    Menu,
    MenuItem,
    SidebarHeader,
    SidebarFooter,
    SidebarContent,
  } from "react-pro-sidebar";
import "./Filter.css";
import { FaList, FaRegHeart } from "react-icons/fa";
import { FiHome, FiLogOut, FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import { RiPencilLine } from "react-icons/ri";
import { BiCog } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";

function Filter(){
        //create initial menuCollapse state using useState hook
        const [menuCollapse, setMenuCollapse] = useState(true)

        //create a custom function that will change menucollapse state from false to true and true to false
      const menuIconClick = () => {
        //condition checking to change state from true to false and vice versa
        menuCollapse ? setMenuCollapse(false) : setMenuCollapse(true);
      };

    function valuetext(value) {
		return `${value}°C`;
	  }
	const [value, setValue] = React.useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

        return(
        <div>
            {/* <Dropdown as={ButtonGroup} drop="right" title="Filter"> */}
                {/* <DropdownToggle>Filter:</DropdownToggle>
                <DropdownMenu className="filter-menu">
                <h3>Brands:</h3>
                <ToggleButtonGroup type="checkbox"  className="mb-2">
                        <ToggleButton value={1}>Nike</ToggleButton>
                        <ToggleButton value={2}>Adidas</ToggleButton>
                        <ToggleButton value={3}>The Iconic Drip</ToggleButton>
                    </ToggleButtonGroup>
                <h3>Sizes:</h3>
                    <ToggleButtonGroup type="checkbox"  className="mb-2">
                        <ToggleButton value={1}>XS</ToggleButton>
                        <ToggleButton value={2}>S</ToggleButton>
                        <ToggleButton value={3}>M</ToggleButton>
                        <ToggleButton value={4}>X</ToggleButton>
                        <ToggleButton value={5}>XL</ToggleButton>
                        <ToggleButton value={6}>XXL</ToggleButton>
                    </ToggleButtonGroup>
                <h3>Price range:</h3>
                    <Slider
                        value={value}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        getAriaValueText={valuetext}
                        min={0}
                        max={100}
                        step={10}
                        marks
                    />
                </DropdownMenu>
            </Dropdown> */}
            <ProSidebar collapsed={menuCollapse}>
          <SidebarHeader>
          <div className="logotext">
              {/* small and big change using menucollapse state */}
              <p>{menuCollapse ? "Logo" : "Big Logo"}</p>
            </div>
            <div className="closemenu" onClick={menuIconClick}>
                {/* changing menu collapse icon on click */}
              {menuCollapse ? (
                <FiArrowRightCircle/>
              ) : (
                <FiArrowLeftCircle/>
              )}
            </div>
          </SidebarHeader>
          <SidebarContent>{menuCollapse ? (<h2>extend</h2>)
            : (
            <Menu iconShape="square">
            
              
              <MenuItem active={true} icon={<FiHome />}>
                Home
              </MenuItem>
              <MenuItem icon={<FaList />}>Category</MenuItem>
              <MenuItem icon={<FaRegHeart />}>Favourite</MenuItem>
              <MenuItem icon={<RiPencilLine />}>Author</MenuItem>
              <MenuItem icon={<BiCog />}>Settings</MenuItem>
              
            </Menu>)}
          </SidebarContent>
        </ProSidebar>
        </div>
    )
}

export default Filter;
