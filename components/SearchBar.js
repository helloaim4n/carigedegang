import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const SearchBar = ({ onLocationChange }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=pk.eyJ1IjoiYWltNG4iLCJhIjoiY2xuYnBmcWx0MGFwdDJrcGJpemJ6cWl6NSJ9.5Q7jzIIdxxYEUbQsHMN24w`
      );
      const { features } = response.data;
      if (features && features.length > 0) {
        const [longitude, latitude] = features[0].center;
        onLocationChange([longitude, latitude]);
      } else {
        console.log("No locations found");
      }
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  return (
    <View style={{ marginBottom: 4 }}>
      <TextInput
        value={query}
        onChangeText={(text) => setQuery(text)}
        placeholder="Enter location..."
        style={{ fontSize: 16, padding: 8, borderRadius: 8, shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5, marginRight: 2 }}
      />
      <Button
        title="Search"
        onPress={handleSearch}
        color="#007BFF"
      />
    </View>
  );
};

SearchBar.propTypes = {
  onLocationChange: PropTypes.func.isRequired,
};

export default SearchBar;