'use client';

import Heart from '@/components/icons/Heart';
import { CldImage } from 'next-cloudinary';
import React, { useTransition } from 'react';

import { setAsFavoriteAction } from './actions';
import { SearchResult } from './page';
import FullHeart from '@/components/icons/FullHurt';

const CloudinaryImage = (props: any & SearchResult) => {
  const [transition, startTransition] = useTransition();

  const isFavorited = props.tags.includes('favorite');
  return (
    <div className="relative">
      <CldImage
        key={props.publicId}
        {...props}
        src={props.publicId}
        sizes="100vw"
        alt="Description of my image"
      />
      {isFavorited ? (
        <FullHeart
          onClick={() =>
            startTransition(() =>
              setAsFavoriteAction(props.publicId, isFavorited)
            )
          }
          className="absolute h-6 w-6 top-5 right-5 text-red-500 hover:text-white cursor-pointer"
        />
      ) : (
        <Heart
          onClick={() =>
            startTransition(() =>
              setAsFavoriteAction(props.publicId, isFavorited)
            )
          }
          className="absolute h-6 w-6 top-5 right-5 hover:text-red-500 cursor-pointer"
        />
      )}
    </div>
  );
};

export default CloudinaryImage;
