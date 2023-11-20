// services/FirebaseDatabase.js
// Function to save user details
function saveUserDetails(userId, userDetails) {
  firebase.database().ref('users/' + userId).set(userDetails);
}

export { saveUserDetails };