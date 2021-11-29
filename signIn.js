// Standard Node js library providing support for various cryptographic functions
import crypto from 'crypto';
// Import our database and pepper value
import { DB, PEPPER } from './signUp.js';


// Given a username and password, returns true if login is successful, false otherwise
function signIn(username, pw) {
    
    // Throw an error if the user does not exist in the database
    if (! DB.some((user) => user.username === username)) {
        console.log("Username does not exist");
        return false;
    }

    // Retrieve the username's information from the database
    const user = DB.find((user) => user.username === username);

    // Combine the provided password with the salt from the database and the pepper
    const to_hash = PEPPER + user.salt + pw;

    // Hash the combined pepper, salt, and password using the SHA-256 algorithm
    // Returns a hex string sequence
    const new_hash = crypto.createHash('sha256').update(to_hash).digest('hex');

    // Check to make sure that the newly hashed value matches the hashed password already in the database
    if (new_hash === user.pw) {
        console.log("Success");
        return true;
    } else {
        console.log("Incorrect password");
        return false;
    }
}






