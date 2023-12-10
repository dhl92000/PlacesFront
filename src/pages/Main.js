import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react';

import Builders from './Builders';
import Listing from './Listing';
import Listings from "./Listings"
import NewProject from "./NewProject"
import NewListing from './NewListing'
import Project from './Project';
import Projects from './Projects';

// api URL outside component so that it does not redeclared w each re-render
const URL = "https://placesappbackend-12a451d9f048.herokuapp.com/"

const Main = () => {
  // State for data 
  const [builders, setBuilders] = useState([])
  const [projects, setProjects] = useState([])
  const [listings, setListings] = useState([])

  // Functions 
  const getBuilders = async ()=> {
    const response = await fetch(URL + "places/builders")
    const data = await response.json()
    setBuilders(data)
  }
  const getProjects = async ()=> {
    const response = await fetch(URL + "places/projects")
    const data = await response.json()
    setProjects(data)
  }
  const getListings = async ()=> {
    const response = await fetch(URL + "places/listings")
    const data = await response.json()
    setListings(data)
  }

// function to create new project
const createProject = async (project) => {
  await fetch(URL + "places/projects", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
  });
  // updates project list
  getProjects();
};

// function to create new listing
const createListing = async (listing) => {
  await fetch(URL + "places/listings", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(listing),
  });
  // updates project list
  getListings();
};

// useEffect
  useEffect(()=>{
    getBuilders()
    getProjects()
    getListings()
  },[]) 
   
    return(
        <div>
      <Routes>
        <Route path="/" element={<Projects projects={projects}/>} />
        <Route path="/places/project/:id" element={<Project projects={projects} listings={listings}  />} />
        <Route path="/places/listings" element={<Listings listings={listings}/>} />
        <Route path="/places/listings/:id" element={<Listing listings={listings} builders={builders}/>} />
        <Route path="/places/builders" element={<Builders builders={builders}/>} />

        <Route path="/places/newproject" element={<NewProject projects={projects} builders={builders} createProject={createProject}/>} />

        <Route path="/places/newlisting" element={<NewListing listings={listings} createListing={createListing}/>} />
      </Routes>
        </div>
    )
}

export default Main