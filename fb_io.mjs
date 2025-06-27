//**************************************************************/
// fb_io.mjs
// Generalised firebase routines
// Written by <Your Name Here>, Term 2 202?
//
// All variables & function begin with fb_  all const with FB_
// Diagnostic code lines have a comment appended to them //DIAG
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c fb_io.mjs',
  'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the methods you want to call from the firebase modules


import { initializeApp }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
import { getAuth, GoogleAuthProvider, signInWithPopup }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { onAuthStateChanged }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { signOut }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { ref, set }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { get }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { update }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

import { query, orderByChild, limitToFirst }

  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

/**************************************************************/
// EXPORT FUNCTIONS
// List all the functions called by code or html outside of this module
/**************************************************************/




export {
  fb_initialise,
  fb_authenticate,
  fb_detectloginchange,
  fb_logout,
  fb_WriteRec,
  fb_ReadRec,
  fb_UpdateRec,
  fb_sortedread,
  fb_WriteScore,
  fb_WriteScore1,
  fb_WriteRecPrivate
};
/******************************************************/
// fb_login()
// Called by html LOGIN button
// Login to Firebase via Google authentication
// Input:  n/a
// Return: n/a
/******************************************************/
function fb_initialise() {
  console.log('%c fb_initialise(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const firebaseConfig = {
    apiKey: "AIzaSyCwPibZHntricqhOchcdlX3H7ve_CFQhR0",
    authDomain: "comp-2025-caleb-lowe-31f01.firebaseapp.com",
    databaseURL: "https://comp-2025-caleb-lowe-31f01-default-rtdb.firebaseio.com",
    projectId: "comp-2025-caleb-lowe-31f01",
    storageBucket: "comp-2025-caleb-lowe-31f01.firebasestorage.app",
    messagingSenderId: "440676386005",
    appId: "1:440676386005:web:05b4cb8a914c0ceb0ace5c",
    measurementId: "G-WGYBNEYVY3"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const firebaseGameDB = getDatabase(app);
  console.info(firebaseGameDB);
  
}

var currentUser = null;
var userId = null;
function fb_authenticate() {
  console.log('%c fb_authenticate(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();





  const PROVIDER = new GoogleAuthProvider();

  // The following makes Google ask the user to select the account

  PROVIDER.setCustomParameters({

    prompt: 'select_account'

  });

  signInWithPopup(AUTH, PROVIDER).then((result) => {

    //✅ Code for a successful authentication goes here
    console.log("successful authentication")
    currentUser = result.user;
    userId = currentUser.uid;
    console.log(userId)

  })

    .catch((error) => {

      //❌ Code for an authentication error goes here
      console.log("authentication error: " + error)

    });
 
};

function fb_detectloginchange() {
   console.log('%c fb_detectLoginChange(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const AUTH = getAuth();

    onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            userId = user.uid;
            console.log("✅ Logged in as:", user.email, "Name:", user.displayName, user.photoURL, user.providerData);
        } else {
            console.log("⚠️ Not logged in — redirecting to index.html");
            location.href = "index.html"; 
        }
    }, (error) => {
        console.error("❌ Auth detection error:", error);
    });
};

function fb_logout() {
  console.log('%c fb_logout(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();

  signOut(AUTH).then(() => {

    //✅ Code for a successful logout goes here
    console.log("successful logout")
  })

    .catch((error) => {

      //❌ Code for a logout error goes here
      console.log("logout error")
    });
  
};

function fb_WriteScore1(userScoregamethatworks) {
  const DB = getDatabase();
  const highScoreRefgamethatworks = ref(DB, "Public/" + userId + "/userHighScoregamethatworks");
  const userRefgamethatworks = ref(DB, "Public/" + userId);

  get(highScoreRefgamethatworks).then(snap => { //Code in fb_WriteScore was made with help from Chatgpt.
    const prevHighgamethatworks = snap.exists() ? snap.val() : 0;
    const highScoregamethatworks = userScoregamethatworks > prevHighgamethatworks ? userScoregamethatworks : prevHighgamethatworks;

    update(userRefgamethatworks, {userScoregamethatworks: userScoregamethatworks,
      userHighScoregamethatworks: highScoregamethatworks}).then(() => {
      console.log("written")
    });
  });
}
function fb_WriteScore(userScore) {
  const DB = getDatabase();
  const highScoreRef = ref(DB, "Public/" + userId + "/userHighScoreCaverun");
  const userRef = ref(DB, "Public/" + userId);
console.log("Score written")
  get(highScoreRef).then(snap => { //Code in fb_WriteScore was made with help from Chatgpt.
    const prevHigh = snap.exists() ? snap.val() : 0;
    const highScore = userScore > prevHigh ? userScore : prevHigh;


    update(userRef, {userScoreCaverun: userScore,
      userHighScoreCaverun: highScore}).then(() => {
      console.log("written")
    });
  });

}




function fb_WriteRec() {
  const AUTH = getAuth();
   var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var colour = document.getElementById("colour").value;
  if (!currentUser || name == "" || name == null || !isNaN(name) || age == null || age == "" || isNaN(age) || colour == "" || colour == null || !isNaN(colour)) {alert("You must be logged in and enter a valid name and age.")
location.href = "index.html";
  }
  
 
 
  
  console.log('%c fb_WriteRec(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase()
  
  const dbReference = ref(DB, "Public/" + userId);
  
  update(dbReference, {Name: name}).then(() => {

    //✅ Code for a successful write goes here
    console.log("successful write")
    
    
  }).catch((error) => {

    //❌ Code for a write error goes here
    console.log("Writing error")
  });
  onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            userId = user.uid;
            update(dbReference, {Photo : user.photoURL}).then(() => {
              
    //✅ Code for a successful write goes here
    console.log("successful write")
    
    
  }).catch((error) => {

    //❌ Code for a write error goes here
    console.log("Writing error")
  });
        } else {
            console.log("⚠️ Not logged in — redirecting to index.html");
            location.href = "index.html"; 
        }
    },
    (error) => {
        console.error("❌ Auth detection error:", error);
    });


}

function fb_WriteRecPrivate() {
  const AUTH = getAuth();
  var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
   var colour = document.getElementById("colour").value; 
  if (!currentUser || name == "" || name == null || !isNaN(name) || age == null || age == "" || isNaN(age) || colour == "" || colour == null || !isNaN(colour)) {alert("You must be logged in and enter a valid name and age.")
location.href = "index.html";
  }

  const DB = getDatabase();
   const dbReference = ref(DB, "Private/" + userId);

  onAuthStateChanged(AUTH, (user) => {
        if (user) {
            currentUser = user;
            userId = user.uid;
            console.log("✅ Logged in as:", user.email, "Name:", user.displayName, colour);
            update(dbReference, { Email: user.email, Emaildisplayname: user.displayName, Age: age, Favouritecolour: colour}).then(() => {
              location.href='gameMenu.html'
    //✅ Code for a successful write goes here
    console.log("successful write")
    
    
  }).catch((error) => {

    //❌ Code for a write error goes here
    console.log("Writing error")
  });
        } else {
            console.log("⚠️ Not logged in — redirecting to index.html");
            location.href = "index.html"; 
        }
    },
    (error) => {
        console.error("❌ Auth detection error:", error);
    });
  };

function fb_ReadRec() {
  console.log('%c fb_ReadRec(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase()
  const dbReference = ref(DB, "Test/UID/Score");

  get(dbReference).then((snapshot) => {

    var fb_data = snapshot.val();

    if (fb_data != null) {

      //✅ Code for a successful read goes here
      console.log("successful read")
      console.log(fb_data)
    } else {

      //✅ Code for no record found goes here
      console.log("no record found")
    }

  }).catch((error) => {

    //❌ Code for a read error goes here
    console.log("read error")
    console.log(error)
  });
  document.getElementById("p_fbReadRec").innerHTML = "Record Read"
}


function fb_UpdateRec() {
  console.log('%c fb_UpdateRec(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const DB = getDatabase()
  const dbReference = ref(DB, "Test/UID");

  update(dbReference, { Score: "2", Highscore: "5" }).then(() => {

    //✅ Code for a successful update goes here
    console.log("successful update")
  }).catch((error) => {

    //❌ Code for a update error goes here
    console.log("failed update")
  });
  document.getElementById("p_fbUpdateRec").innerHTML = "Updated record"
}



function fb_sortedread() {
    console.log('%c fb_ReadSorted(): ', 'color: ' + COL_C + '; background-color: ' + COL_B + ';');
    const DB = getDatabase()
    var sortKey = "userHighScoreCaverun";
    leaderboardSign.innerHTML = "You pressed the button!";

    const dbReference= query(ref(DB, "Public/" ), orderByChild(sortKey), limitToFirst(4));

     get(dbReference).then((snapshot) => 
    {
        // Do Stuff
    });

    get(dbReference).then((allScoreDataSnapshot) => {
        allScoreDataSnapshot.forEach(function (userScoreSnapshot) {
            var obj = userScoreSnapshot.val();
            console.log(obj);
            Test.innerHTML = obj.Name;
            Highscorecave.innerHTML = obj.userHighScoreCaverun;
            Highscorecoin.innerHTML = obj.userHighScoregamethatworks
        });
    });

    get(dbReference).then((snapshot) => {

        var fb_data = snapshot.val();

      if (fb_data != null) {

           //✅ Code for a successful sorted read goes here
           console.log("Sorted Successfully");

        } else {

           //✅ Code for no record found goes here
            console.log("Sorted Successfully, but no record");
            

        }

    }).catch((error) => {

        //❌ Code for a sorted read error goes here
        console.log("Sorting failed");
    });

}

/**************************************************************/
// END OF CODE
/**************************************************************/