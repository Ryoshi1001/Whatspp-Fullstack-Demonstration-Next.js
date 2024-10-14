
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
   domains: ["localhost"],
  }
 };
 
 export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'http', // or 'https' depending on your image source
//         hostname: 'localhost', // replace with your actual hostname if needed
//         port: '', // specify port if necessary
//         pathname: '/**', // this allows all paths; adjust as necessary for security
//       },
//     ],
//   },
// };

// export default nextConfig;

//console suggest "domains" not used deprecated
// images: {
//   domains: ["localhost"],
//  }

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//    domains: ["localhost"],
//   }
//  };
 
//  export default nextConfig;

//if hosting online add domain of server in domains for images once deploying.

//console suggest "domains" not used deprecated
// images: {
//   domains: ["localhost"],
//  }