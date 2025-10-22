// // // // let name: string = "Siz";
// // // // let greeting:string = `Hello, ${name}! `

// // // // console.log(greeting);

// // // // let num:number = 10;
// // // // let numT: number = 5;
// // // // let sum:number = num + numT;

// // // // console.log(sum, "sum");

// // // // console.log('All tasks are synchronous');

// // // function fetchData(): Promise<string> {
// // //     return new Promise((resolve) => {
// // //         setTimeout(() => {
// // //             resolve("Data fetched successfully!");
// // //         }, 2000);
// // //     });
// // // }

// // // async function getData() {
// // //     console.log("Fetching data...");
// // //     const data = await fetchData();
// // //     console.log(data);
// // //     console.log('Data processing complete');

// // // }

// // // getData();

// // // console.log("Program continues while data is being fetched!");

// // async function fetchUserData(
// //   userId: number
// // ): Promise<{ id: number; name: string; email: string }> {
// //   await delay(4000); // Simulate network delay
// //   return {
// //     id: userId,
// //     name: `user${userId}`,
// //     email: `user${userId}@mlab.co.za`,
// //   };
// // }

// // function delay(ms: number): Promise<void> {
// //   return new Promise((resolve) => setTimeout(resolve, ms));
// // }

// // async function main(): Promise<void> {
// //   try {
// //     console.log("Starting to fetch user data...");
// //     const user = await fetchUserData(123);

// //     console.log('User data received:', user);

// //     console.log('Lets do a task');

// //     const [user1, user2, user3] = await Promise.all([
// //       fetchUserData(1),
// //       fetchUserData(2),
// //       fetchUserData(3),
// //     ]);

// //     console.log('Multiple users: ',{user1, user2, user3});

// //   } catch (error) {
// //     console.log('Error fetching user data', error);

// //   }
// // }

// // main();

// // console.log('Doing another task');

// //fetching the user'd ID
// function fetchUserId(callback: (error: Error | null, userId?: string) => void) {
//   console.log("Fetching userId...");
//   setTimeout(() => {
//     const userId = "user123";
//     callback(null, userId);
//   }, 2000);
// }

// //fetching the user details..it pretends to fetch the details from a database
// function fetchUserDetails(
//   userId: string,
//   callback: (
//     error: Error | null,
//     details?: { name: string; email: string }
//   ) => void
// ) {
//   console.log("Fetching user details for", userId);
//   setTimeout(() => {
//     const details = { name: "Snape", email: "snape@mlab.co.za" };
//     callback(null, details);
//   }, 3000);
// }

// function saveUserLog(
//   userName: string,
//   userEmail: string,
//   callback: (error: Error | null, logStatus?: string) => void
// ) {
//   console.log(`Saving user log for ${userName}`);

//   setTimeout(() => {
//     const logStatus = "Log saved successfully";
//     callback(null, logStatus);
//   }, 3000);
// }

// fetchUserId((error, userId) => {
//   if (error) {
//     console.error("Error fetching userId:", error.message);
//     return;
//   }
//   if (userId) {
//     fetchUserDetails(userId, (error, details) => {
//       if (error) {
//         console.error("Error in fetching user details:", error.message);
//         return;
//       }

//       if (details) {
//         saveUserLog(details.name, details.email, (error, logStatus) => {
//           if (error) {
//             console.error("Error saving user details:", error.message);
//             return;
//           }
//           if (logStatus) {
//             console.log("All operations completed successfully");
//             console.log("Final status: ", logStatus);
//           }
//         });
//       }
//     });
//   }
// });

//
function promiseFetchIserId(): Promise<string> {
  console.log("Fetching user iD");
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const userId = "user123";
      resolve(userId);
    }, 1000);
  });
}

function promiseFetchIserDetails(
  userId: string
): Promise<{ name: string; email: string }> {
  console.log(`Fetching details for userId: ${userId}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const details = { name: "Professor Snape", email: "snape@hogwarts.com" };
      resolve(details);
    }, 2000);
  });
}

function promiseSaveUserLog(
  userName: string,
  userEmail: string
): Promise<string> {
  console.log(`saving user log for ${userName}, email ${userEmail}`);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const status = "Log saved successfully";
      resolve(status);
    }, 2000);
  });
}

//resolving with the userId
// promiseFetchIserId()
//   .then((userId) => {
//     return promiseFetchIserDetails(userId);
//   })
//   .then((details) => {
//     return promiseSaveUserLog(details.name, details.email);
//   })
//   .then((logStatus) => {
//     console.log("All operations completed successfully");
//     console.log("Final status: ", logStatus);
//   }).catch((error) =>{
//     console.error("An error occured in the promise chain: ", error.message);

//   })

// =============================
// Something to Ponder
// =============================

// this function will automaticall return a promise
// async function name(params:type) {
//     await         //it's like telling javascript ..wait until the code is done then give me the resuls

// }

async function processUserData(): Promise<void> {
  try {
    console.log("Starting async  process");
    const userId = await promiseFetchIserId();
    const details = await promiseFetchIserDetails(userId);
    const logStatus = await promiseSaveUserLog(details.name, details.email);

    console.log(`All operations completed successfully`);
    console.log(`Final status: `, logStatus);
  } catch (error: any) {
    console.log(`An error occured in this process:`, error.message);
  }
}
processUserData();