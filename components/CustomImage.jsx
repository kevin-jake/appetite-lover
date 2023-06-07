import Image from "next/image";
import React, { useState } from "react";

const CustomImage = (props) => {
  const [src, setSrc] = useState(props.src);

  return (
    <Image
      {...props}
      onError={() => setSrc("/placeholder-image.jpg")}
      placeholder="blur"
      blurDataURL="/placeholder-image.jpg"
      src={src}
    />
  );
};

export default CustomImage;
