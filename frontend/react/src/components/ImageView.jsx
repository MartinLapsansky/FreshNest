// import React, { useState } from "react";
//
// import { ShimmerThumbnail } from "react-shimmer-effects-18";
//
// const ImageView = ({ url, _id, shimmerClass, imageClass}) => {
//   const [isLoading, setIsLoading] = useState(true);
//
//   return (
//     <div id={_id}>
//       <div className={`overflow-hidden ${isLoading ? shimmerClass : ""} `}>
//         <div className={isLoading ? "block" : "hidden"}>
//           <ShimmerThumbnail rounded height={400} />
//         </div>
//       </div>
//
//       <div className="overflow-clip">
//         <img
//             data-testid="image-element"
//             className={
//             `w-[100%] rounded-t-lg object-cover hover:scale-110 transition-all ease-in-out duration-500 ${imageClass} ` +
//             (isLoading ? "hidden" : "block")
//           }
//           src={url}
//           alt=""
//           onLoad={() => {
//             console.log("Image has loaded");
//             setIsLoading(false);
//           }}
//         />
//       </div>
//     </div>
//   );
// };
//
// export default ImageView;
// ImageView.js

import React, { useState } from "react";
import { ShimmerThumbnail } from "react-shimmer-effects-18";

const ImageView = ({ url, _id, shimmerClass, imageClass, onLoad, onError }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        console.log("Image has loaded");
        setIsLoading(false);
        if (onLoad) {
            onLoad();
        }
    };

    const handleError = (errorEvent) => {
        console.error("Error loading image", errorEvent);
        setIsLoading(false);
        if (onError) {
            onError(errorEvent);
        }
    };

    return (
        <div id={_id}>
            <div className={`overflow-hidden ${isLoading ? shimmerClass : ""} `}>
                <div className={isLoading ? "block" : "hidden"}>
                    <ShimmerThumbnail rounded height={400} />
                </div>
            </div>

            <div className="overflow-clip">
                <img
                    data-testid="image-element"
                    className={`w-[100%] rounded-t-lg object-cover hover:scale-110 transition-all ease-in-out duration-500 ${imageClass} ${isLoading ? "hidden" : "block"}`}
                    src={url}
                    alt=""
                    onLoad={handleLoad}
                    onError={handleError}
                />
            </div>
        </div>
    );
};

export default ImageView;
