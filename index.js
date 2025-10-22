// // // // let name: string = "Siz";
// // // // let greeting:string = `Hello, ${name}! `
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
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
function promiseFetchIserId() {
    console.log("Fetching user iD");
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var userId = "user123";
            resolve(userId);
        }, 1000);
    });
}
function promiseFetchIserDetails(userId) {
    console.log("Fetching details for userId: ".concat(userId));
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var details = { name: "Professor Snape", email: "snape@hogwarts.com" };
            resolve(details);
        }, 2000);
    });
}
function promiseSaveUserLog(userName, userEmail) {
    console.log("saving user log for ".concat(userName, ", email ").concat(userEmail));
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            var status = "Log saved successfully";
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
function processUserData() {
    return __awaiter(this, void 0, void 0, function () {
        var userId, details, logStatus, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    console.log("Starting async  process");
                    return [4 /*yield*/, promiseFetchIserId()];
                case 1:
                    userId = _a.sent();
                    return [4 /*yield*/, promiseFetchIserDetails(userId)];
                case 2:
                    details = _a.sent();
                    return [4 /*yield*/, promiseSaveUserLog(details.name, details.email)];
                case 3:
                    logStatus = _a.sent();
                    console.log("All operations completed successfully");
                    console.log("Final status: ", logStatus);
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _a.sent();
                    console.log("An error occured in this process:", error_1.message);
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    });
}
processUserData();
