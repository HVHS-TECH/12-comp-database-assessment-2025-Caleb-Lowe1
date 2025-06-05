/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by <Your Name Here>, Term 2 202?
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs',
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module
import { fb_initialise }
    from './fb_io.mjs';
window.fb_initialise = fb_initialise;

import { fb_authenticate }
    from './fb_io.mjs';
window.fb_authenticate = fb_authenticate;

import { fb_detectloginchange }
    from './fb_io.mjs';
window.fb_detectloginchange = fb_detectloginchange;

import { fb_logout }
    from './fb_io.mjs';
window.fb_logout = fb_logout;

import { fb_WriteRec }
    from './fb_io.mjs';
window.fb_WriteRec = fb_WriteRec;

import { fb_ReadRec }
    from './fb_io.mjs';
window.fb_ReadRec = fb_ReadRec;

import { fb_ReadAll }
    from './fb_io.mjs';
window.fb_ReadAll = fb_ReadAll;

import { fb_UpdateRec }
    from './fb_io.mjs';
window.fb_UpdateRec = fb_UpdateRec;

import { fb_sortedread }
    from './fb_io.mjs';
window.fb_sortedread = fb_sortedread;
/**************************************************************/
// index.html main code
/**************************************************************/


/**************************************************************/
//   END OF CODE
/**************************************************************/