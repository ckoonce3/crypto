// Standard Node js library providing support for various cryptographic functions
import crypto from 'crypto';

// Create an array "database" to store our usernames, hashed passwords, and salt values
// Users are stored as dictionaries according to the following syntax:
/*  {
        'username': username,
        'pw': hashed_pw,
        'salt': salt
    }
*/

let DB = [];
// A "pepper" value: systemwide value not stored in our database
const PEPPER = 'COMP523';

// Given a username and password, securely stores that username and pw in the database
// Returns true if operation is successful, false otherwise
function signUp(username, pw) {
    // Ensure that username doesn't already exist
    if (DB.some((user) => user.username === username)) {
        console.log("Username is already taken");
        return false;
    }

    // Generates 16 random bytes and converts into a hex string sequence
    const salt = crypto.randomBytes(16).toString('hex');
    // Combines the pepper, salt, and password into a single string
    const to_hash = PEPPER + salt + pw;
    // Hashes the combined pepper, salt, and password using the SHA-256 algorithm
    // Returns a hex string sequence
    const hash = crypto.createHash('sha256').update(to_hash).digest('hex');

    // Create a dictionary representing a user - stores the username, password, and salt values
    const user = {
        'username': username,
        'pw': hash,
        'salt': salt
    };

    console.log(user);

    // Append the new user to the database
    DB.push(user);

    return true;
}

storeUser('jschmoe','puppylover123');





